import React from 'react';

export function Header({ onOpenLogin }) {
  return (
    <header className="hero">
      <div className="admin-strip">
        <div className="container admin-strip-inner">
          <p><strong>Login para ADM:</strong> acesso de atualização de disponibilidade e horários.</p>
          <div className="admin-strip-actions">
            <button className="btn btn-secondary" type="button" onClick={onOpenLogin}>Login Administrador</button>
            <a className="btn btn-secondary" href="#admin">Ir para painel</a>
          </div>
        </div>
      </div>

      <nav className="topbar container">
        <div className="brand">Terê Verde Online</div>
        <div className="menu">
          <a href="#parques">Parques</a>
          <a href="#mapa">Mapa</a>
          <a href="#atrativos">Atrativos</a>
          <a href="#eventos">Eventos</a>
          <a href="#condicoes">Condições</a>
        </div>
      </nav>

      <div className="hero-content container">
        <div className="hero-copy">
          <p className="eyebrow">Circuito Terê Verde</p>
          <h1>Explore Teresópolis com informação clara, humana e atualizada</h1>
          <p className="lead">Acompanhe trilhas, cachoeiras, biodiversidade, eventos e condições dos parques para visitar a região com mais segurança e consciência ambiental.</p>
          <div className="cta-row">
            <a className="btn btn-primary" href="#atrativos">Ver atrativos</a>
            <a className="btn btn-secondary" href="#mapa">Abrir mapa interativo</a>
          </div>
        </div>
      </div>
    </header>
  );
}