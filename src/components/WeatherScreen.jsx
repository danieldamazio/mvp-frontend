import React, { useState, useEffect } from 'react';

export function WeatherScreen() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-22.4122&longitude=-42.9656&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m&timezone=America%2FSao_Paulo');
        const data = await response.json();
        setWeather(data.current);
      } catch (error) {
        console.error("Erro ao buscar clima:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, []);

if (loading) {
    return (
      <section className="section container fade-in" style={{ paddingTop: '150px', minHeight: '80vh' }}>
        <div className="section-header align-left">
          <div className="skeleton-glass skeleton-text" style={{ width: '120px', height: '28px', borderRadius: '50px' }}></div>
          <div className="skeleton-glass skeleton-title" style={{ width: '350px', height: '60px' }}></div>
          <div className="skeleton-glass skeleton-text" style={{ width: '400px' }}></div>
        </div>
        <div className="grid grid-3">
          {[1, 2, 3].map(card => (
            <div key={card} className="card-glass" style={{ minHeight: '230px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="skeleton-glass skeleton-text" style={{ width: '50%' }}></div>
              <div className="skeleton-glass skeleton-block" style={{ height: '70px', width: '80%', margin: '15px 0' }}></div>
              <div className="skeleton-glass skeleton-text" style={{ width: '70%', marginTop: 'auto', marginBottom: '0' }}></div>
            </div>
          ))}
        </div>

      </section>
    );
  }
  return (
    <section className="section container fade-in" style={{ paddingTop: '150px', minHeight: '80vh' }}>
      <div className="section-header align-left">
        <span className="eyebrow" style={{ position: 'relative', top: '0', marginBottom: '1rem', background: 'rgba(31, 143, 76, 0.1)', color: 'var(--brand-primary)', borderColor: 'var(--brand-primary)' }}>Condições Atuais</span>
        <h2 style={{ fontSize: '3.5rem', letterSpacing: '-1px' }}>
          Clima na Serra
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
          Monitoramento em tempo real do microclima de Teresópolis.
        </p>
      </div>
      <div className="grid grid-3">
        <div className="card-glass" style={{ borderLeft: '6px solid var(--brand-primary)' }}>
          <h3 style={{ color: 'var(--brand-primary)', fontSize: '1.2rem' }}>Temperatura</h3>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', margin: '1.5rem 0' }}>
            <span style={{ fontSize: '4.5rem', fontWeight: '900', color: 'var(--text-dark)', lineHeight: '1' }}>
              {weather?.temperature_2m}
            </span>
            <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>°C</span>
          </div>
          <p style={{ color: 'var(--text-muted)', margin: 0, fontWeight: '600' }}>
            Sensação Térmica: {weather?.apparent_temperature}°C
          </p>
        </div>
        <div className="card-glass">
          <h3 style={{ fontSize: '1.2rem' }}>Umidade Relativa</h3>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', margin: '1.5rem 0' }}>
            <span style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--brand-primary)', lineHeight: '1' }}>
              {weather?.relative_humidity_2m}
            </span>
            <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>%</span>
          </div>
          <p className="detail" style={{ margin: 0 }}>Risco de neblina em picos altos.</p>
        </div>
        <div className="card-glass">
          <h3 style={{ fontSize: '1.2rem' }}>Vento e Precipitação</h3>
          <div className="stack" style={{ marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '10px' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 'bold' }}>💨 Vento</span>
              <span style={{ fontWeight: '800', color: 'var(--text-dark)' }}>{weather?.wind_speed_10m} km/h</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 'bold' }}>🌧️ Chuva (1h)</span>
              <span style={{ fontWeight: '800', color: 'var(--text-dark)' }}>{weather?.precipitation} mm</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}