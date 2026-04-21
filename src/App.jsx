import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { MapSection } from './components/Map/MapSection';
import './index.css';
import { WeatherScreen } from './components/WeatherScreen';
import { IncidentModal } from './components/IncidentModal';
import { AlertsScreen } from './components/AlertsScreen';

function App() {
  const [data, setData] = useState({ parks: [], attractions: [], mapPoints: [], events: [] });
  const [loading, setLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isIncidentOpen, setIsIncidentOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <nav className={`navbar-floating fade-in ${currentScreen !== 'home' ? 'nav-light' : ''}`}>
        <div className="brand" onClick={() => { setCurrentScreen('home'); setIsMobileMenuOpen(false); }}>
          TERÊ<span>VERDE</span>
        </div>

        <div className="nav-links">
          <a href="#parques" onClick={() => setCurrentScreen('home')}>Parques</a>
          <a href="#atrativos" onClick={() => setCurrentScreen('home')}>Atrativos</a>
          <a href="#eventos" onClick={() => setCurrentScreen('home')}>Eventos</a>
          <a href="#clima" onClick={(e) => { e.preventDefault(); setCurrentScreen('weather'); }}>Clima</a>
          <a href="#avisos" onClick={(e) => { e.preventDefault(); setCurrentScreen('alerts'); }}>Avisos</a>
        </div>

        <div className="nav-actions">
          <button className="btn-report-chic desktop-only" onClick={() => setIsIncidentOpen(true)}>
            Reportar
          </button>
          <button className="btn-admin-icon" onClick={() => setIsLoginOpen(true)} title="Acesso Restrito">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </button>
          
          <button 
            className="mobile-menu-btn" 
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            style={{ position: 'relative', zIndex: 1101 }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12"/> 
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18"/>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="ultra-menu-mobile">
          <span className="close-x" onClick={() => setIsMobileMenuOpen(false)}>×</span>
          <a href="#parques" onClick={() => { setCurrentScreen('home'); setIsMobileMenuOpen(false); }}>Parques</a>
          <a href="#atrativos" onClick={() => { setCurrentScreen('home'); setIsMobileMenuOpen(false); }}>Atrativos</a>
          <a href="#clima" onClick={() => { setCurrentScreen('weather'); setIsMobileMenuOpen(false); }}>Clima Local</a>
          <a href="#avisos" onClick={() => { setCurrentScreen('alerts'); setIsMobileMenuOpen(false); }}>Alertas</a>
          
          <button 
            className="btn btn-primary" 
            onClick={() => { setIsIncidentOpen(true); setIsMobileMenuOpen(false); }}
            style={{ marginTop: '20px' }}
          >
            Reportar Incidente 🚨
          </button>
        </div>
      )}
      
      {currentScreen === 'weather' && <WeatherScreen />}
      {currentScreen === 'alerts' && <AlertsScreen />}
      {currentScreen === 'home' && (
        <>
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
        </>
      )}

      <footer className="footer">
        <div className="container footer-content">
          <div className="brand">TERÊ<span>VERDE</span></div>
          <p>MVP FRONTEND - UNIFESO • {new Date().getFullYear()}</p>
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
      
      {isIncidentOpen && (
        <IncidentModal onClose={() => setIsIncidentOpen(false)} />
      )}
    </div>
  );
}

export default App;