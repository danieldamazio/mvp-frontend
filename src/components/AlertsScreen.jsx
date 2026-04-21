import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export function AlertsScreen() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const { data, error } = await supabase
          .from('incidents')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setAlerts(data || []);
      } catch (error) {
        console.error("Erro ao buscar alertas:", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAlerts();
  }, []);

  return (
    <section className="section container fade-in" style={{ paddingTop: '120px', minHeight: '80vh' }}>
      <div className="section-header align-left">
        <span className="eyebrow" style={{ background: 'rgba(220, 38, 38, 0.1)', color: '#ef4444', border: '1px solid #ef4444' }}>
          Mural de Alertas
        </span>
        <h2 style={{ color: 'var(--text-dark)', fontSize: '3.5rem', letterSpacing: '-1px' }}>
          Avisos da Comunidade
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px' }}>
          Fique atento às condições relatadas por outros trilheiros e pela equipe do parque antes de iniciar sua aventura.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h3 style={{ color: 'var(--text-dark)' }}>Carregando alertas da serra...</h3>
        </div>
      ) : alerts.length === 0 ? (
        <div className="card-glass" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌿</div>
          <h3 style={{ color: 'var(--text-dark)' }}>Tudo tranquilo por aqui!</h3>
          <p style={{ color: 'var(--text-muted)' }}>Nenhum incidente ativo relatado nas trilhas no momento.</p>
        </div>
      ) : (
        <div className="grid grid-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="card-glass"
              style={{ borderTop: `6px solid ${alert.severity === 'Crítica' ? '#dc2626' : alert.severity === 'Moderada' ? '#eab308' : '#3b82f6'}` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="badge" style={{
                  margin: 0,
                  background: alert.severity === 'Crítica' ? 'rgba(220, 38, 38, 0.1)' : alert.severity === 'Moderada' ? 'rgba(234, 179, 8, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                  color: alert.severity === 'Crítica' ? '#ef4444' : alert.severity === 'Moderada' ? '#d97706' : '#2563eb',
                  border: `1px solid ${alert.severity === 'Crítica' ? '#ef4444' : alert.severity === 'Moderada' ? '#eab308' : '#3b82f6'}`
                }}>
                  {alert.category}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>
                  {new Date(alert.created_at).toLocaleDateString('pt-BR')}
                </span>
              </div>

              <h3 style={{ color: 'var(--text-dark)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>{alert.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                {alert.description}
              </p>

              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.08)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Nível de Risco: <strong style={{ color: alert.severity === 'Crítica' ? '#ef4444' : alert.severity === 'Moderada' ? '#d97706' : '#2563eb' }}>{alert.severity}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}