import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { MapSection } from './components/Map/MapSection';
import './index.css';

function App() {
  const [data, setData] = useState({ parks: [], attractions: [], mapPoints: [], events: [] });
  const [loading, setLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    async function loadPortalData() {
      try {
        const [p, a, m, e] = await Promise.all([
          supabase.from('parks').select('*'),
          supabase.from('attractions').select('*'),
          supabase.from('map_points').select('*'),
          supabase.from('events').select('*')
        ]);
        setData({
          parks: p.data || [],
          attractions: a.data || [],
          mapPoints: m.data || [],
          events: e.data || []
        });
      } catch (error) {
        console.error("Erro na sincronização:", error.message);
      } finally {
        setLoading(false);
      }
    }
    loadPortalData();
  }, []);

  return (
    <div className="app-container">

      <nav className="navbar-floating fade-in">
        <div className="brand">TERÊ<span>VERDE</span></div>
        <div className="nav-links">
          <a href="#parques">Parques</a>
          <a href="#atrativos">Atrativos</a>
          <a href="#eventos">Eventos</a>
        </div>
        <button className="btn btn-outline-light btn-small" onClick={() => setIsLoginOpen(true)}>
          Admin
        </button>
      </nav>
      <section className="hero">
        <div className="hero-content fade-in">
          <span className="eyebrow">Monitoramento Ambiental</span>
          <h1>O Coração Verde <br /> de <span className="text-gradient">Teresópolis</span></h1>
          <p className="lead">Mergulhe em dados em tempo real das unidades de conservação, trilhas e biodiversidade da Serra dos Órgãos.</p>
          <div className="cta-group">
            <a href="#mapa" className="btn btn-primary">Explorar Mapa</a>
            <a href="#parques" className="btn btn-glass">Conhecer Parques</a>
          </div>
        </div>
      </section>

      <main className="main-content">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Sincronizando dados da API...</p>
          </div>
        ) : (
          <>

            <section id="parques" className="section container">
              <div className="section-header">
                <h2>Unidades de Conservação</h2>
                <p>Nossos santuários ecológicos monitorados em tempo real.</p>
              </div>
              <div className="grid grid-3">
                {data.parks.map(park => (
                  <article className="card-glass" key={park.id}>
                    <div className="card-header">
                      <span className={`badge status-${park.status?.replace(' ', '_') || 'Aberto'}`}>
                        {park.status || 'Aberto'}
                      </span>
                    </div>
                    <h3>{park.name}</h3>
                    <div className="card-body">
                      <p className="detail"><span>🏔️ Altitude max:</span> {park.altitude}</p>
                      <p className="focus">{park.focus}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
            <section id="atrativos" className="section container grid grid-2-asymmetric">
              <div className="attractions-col">
                <div className="section-header align-left">
                  <h2>Trilhas e Atrativos</h2>
                </div>
                <div className="stack">
                  {data.attractions.slice(0, 4).map(att => (
                    <div className="card-glass list-item" key={att.id}>
                      <div className="list-info">
                        <h3>{att.name}</h3>
                        <p>📍 {att.park_name} • {att.type}</p>
                      </div>
                      <span className="badge">{att.difficulty || 'Moderada'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div id="eventos" className="events-col">
                <div className="card-glass highlight-panel">
                  <h3>Próximos Eventos</h3>
                  <div className="stack-small">
                    {data.events.map(ev => (
                      <div className="event-row" key={ev.id}>
                        <div className="event-date">
                          <strong>{new Date(ev.date).getDate()}</strong>
                          <span>{new Date(ev.date).toLocaleString('pt-BR', { month: 'short' })}</span>
                        </div>
                        <div className="event-text">
                          <h4>{ev.title}</h4>
                          <p>{ev.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>


            <section id="mapa" className="section container">
              <div className="section-header">
                <h2>Exploração Geográfica</h2>
              </div>
              <div className="map-container">
                <MapSection mapPoints={data.mapPoints} />
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div className="brand">TERÊ<span>VERDE</span></div>
          <p>Projeto Fullstack • {new Date().getFullYear()}</p>
        </div>
      </footer>

      {isLoginOpen && (
        <div className="modal">
          <div className="modal-overlay" onClick={() => setIsLoginOpen(false)}></div>
          <div className="modal-content">
            <button className="btn-close" onClick={() => setIsLoginOpen(false)}>×</button>
            <h3>Acesso Restrito</h3>
            <p>Painel de gestão de unidades de conservação.</p>
            <div className="form-group">
              <input type="email" placeholder="E-mail" className="input-field" />
              <input type="password" placeholder="Senha" className="input-field" />
              <button className="btn btn-primary btn-full">Autenticar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;