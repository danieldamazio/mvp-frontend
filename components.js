(() => {
  const { useEffect, useMemo, useState } = React;
  const html = htm.bind(React.createElement);

  function formatDate(dateIso) {
    const date = new Date(`${dateIso}T00:00:00`);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  }

  function displayText(value) {
    const labels = {
      Avancada: "Avançada",
      "Em manutencao": "Em manutenção"
    };

    return labels[value] || value;
  }

  function safeStatusClass(status) {
    return `status-${status.replaceAll(" ", "_").normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`;
  }

  function getCategoryStyle(category) {
    if (category === "acesso") {
      return { color: "#8a5a2b", radius: 8, layer: "Acessos principais" };
    }

    if (category === "parque") {
      return { color: "#1e8f4b", radius: 8, layer: "Parques" };
    }

    if (category === "pico_parnaso") {
      return { color: "#226aa0", radius: 7, layer: "Picos do PARNASO" };
    }

    return { color: "#7a2f8f", radius: 7, layer: "Montanhas e mirantes locais" };
  }

  function Header({ onOpenLogin }) {
    return html`
      <header className="hero">
        <div className="admin-strip">
          <div className="container admin-strip-inner">
            <p><strong>Login para ADM:</strong> acesso de atualização de disponibilidade e horários.</p>
            <div className="admin-strip-actions">
              <button className="btn btn-secondary" type="button" onClick=${onOpenLogin}>Login Administrador</button>
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
    `;
  }

  function ParksSection({ parks }) {
    return html`
      <section id="parques" className="section">
        <h2>Parques citados no desafio</h2>
        <div className="grid three">
          ${parks.map((park) => html`
            <article className="card" key=${park.id}>
              <h3>${park.name}</h3>
              <p><strong>Altitude/Area:</strong> ${park.altitude}</p>
              <p><strong>Destaque:</strong> ${park.focus}</p>
            </article>
          `)}
        </div>
      </section>
    `;
  }

  function MapSection({ mapPoints }) {
    useEffect(() => {
      if (!window.L) {
        return undefined;
      }

      const map = L.map("map").setView([-22.445, -43.0], 11);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "&copy; OpenStreetMap contributors"
      }).addTo(map);

      const layers = {
        "Acessos principais": L.layerGroup().addTo(map),
        Parques: L.layerGroup().addTo(map),
        "Picos do PARNASO": L.layerGroup().addTo(map),
        "Montanhas e mirantes locais": L.layerGroup().addTo(map)
      };

      mapPoints.forEach((point) => {
        const style = getCategoryStyle(point.category);
        L.circleMarker([point.lat, point.lng], {
          radius: style.radius,
          color: style.color,
          fillColor: style.color,
          fillOpacity: 0.85,
          weight: 1
        })
          .bindPopup(
            `<strong>${point.name}</strong><br><strong>Endereço/Acesso:</strong> ${point.address}<br><strong>Proximidade:</strong> ${point.proximity}`
          )
          .addTo(layers[style.layer]);
      });

      L.control.layers(null, layers, { collapsed: false }).addTo(map);
      setTimeout(() => map.invalidateSize(), 0);

      return () => map.remove();
    }, [mapPoints]);

    return html`
      <section id="mapa" className="section">
        <h2>Mapa interativo da região</h2>
        <p className="muted">Pontos com endereço de acesso, proximidades e formações citadas para o Circuito Terê Verde.</p>
        <div className="map-wrap card">
          <div id="map"></div>
        </div>
        <p className="map-note">Observação: alguns picos não possuem endereço de rua. O popup mostra o ponto de acesso ou a proximidade oficial.</p>
        <div className="legend">
          <span><i className="dot dot-access"></i> Acessos principais</span>
          <span><i className="dot dot-park"></i> Parques</span>
          <span><i className="dot dot-parnaso"></i> Picos do PARNASO</span>
          <span><i className="dot dot-mountain"></i> Montanhas e mirantes locais</span>
        </div>
      </section>
    `;
  }

  function AttractionsSection({ attractions }) {
    const [typeFilter, setTypeFilter] = useState("all");
    const [difficultyFilter, setDifficultyFilter] = useState("all");

    const filteredAttractions = useMemo(() => attractions.filter((item) => {
      const okType = typeFilter === "all" || item.type === typeFilter;
      const okDifficulty = difficultyFilter === "all" || item.difficulty === difficultyFilter;
      return okType && okDifficulty;
    }), [attractions, typeFilter, difficultyFilter]);

    return html`
      <section id="atrativos" className="section">
        <div className="section-head">
          <h2>Atrativos</h2>
          <div className="filters">
            <label htmlFor="filterType">Tipo</label>
            <select id="filterType" value=${typeFilter} onChange=${(event) => setTypeFilter(event.target.value)}>
              <option value="all">Todos</option>
              <option value="Trilha">Trilha</option>
              <option value="Cachoeira">Cachoeira</option>
              <option value="Biodiversidade">Biodiversidade</option>
            </select>

            <label htmlFor="filterDifficulty">Dificuldade</label>
            <select id="filterDifficulty" value=${difficultyFilter} onChange=${(event) => setDifficultyFilter(event.target.value)}>
              <option value="all">Todas</option>
              <option value="Leve">Leve</option>
              <option value="Moderada">Moderada</option>
              <option value="Avancada">Avançada</option>
            </select>
          </div>
        </div>

        <div className="grid three">
          ${filteredAttractions.map((item) => html`
            <article className="card" key=${item.id}>
              <span className=${`badge ${safeStatusClass(item.status)}`}>${displayText(item.status)}</span>
              <h3>${item.name}</h3>
              <p><strong>Tipo:</strong> ${item.type}</p>
              <p><strong>Parque:</strong> ${item.park}</p>
              <p><strong>Dificuldade:</strong> ${displayText(item.difficulty)}</p>
              <p><strong>Horario:</strong> ${item.hours}</p>
            </article>
          `)}
        </div>
      </section>
    `;
  }

  function EventsSection({ events }) {
    return html`
      <section id="eventos" className="section">
        <h2>Eventos e Temporadas</h2>
        <div className="grid two">
          ${events.map((event) => html`
            <article className="card" key=${event.id}>
              <span className=${`badge ${safeStatusClass(event.status)}`}>${displayText(event.status)}</span>
              <h3>${event.name}</h3>
              <p><strong>Data:</strong> ${formatDate(event.date)}</p>
              <p><strong>Local:</strong> ${event.place}</p>
              <p><strong>Horario:</strong> ${event.hours}</p>
            </article>
          `)}
        </div>
      </section>
    `;
  }

  function ConditionsSection({ attractions, events, news }) {
    const counters = useMemo(() => {
      const statusCount = {
        Aberto: 0,
        Parcial: 0,
        Fechado: 0,
        "Em manutencao": 0
      };

      [...attractions, ...events].forEach((item) => {
        statusCount[item.status] = (statusCount[item.status] || 0) + 1;
      });

      return statusCount;
    }, [attractions, events]);

    return html`
      <section id="condicoes" className="section">
        <h2>Condições em destaque</h2>
        <div className="status-row">
          ${Object.entries(counters).map(([status, count]) => html`
            <div className="status-tile" key=${status}>
              <div className="count">${count}</div>
              <div>${displayText(status)}</div>
            </div>
          `)}
        </div>

        <div className="card highlight">
          <h3>Novidades</h3>
          <ul>
            ${news.slice().reverse().map((item) => html`
              <li key=${`${item.createdAt}-${item.text}`}>
                <strong>${formatDate(item.createdAt)}:</strong> ${item.text}
              </li>
            `)}
          </ul>
        </div>
      </section>
    `;
  }

  function AdminSection({ data, isAuthenticated, onLogout, onOpenLogin, onUpdateAvailability, onPublishNews }) {
    return html`
      <section id="admin" className="section">
        <div className="section-head">
          <h2>Painel do Administrador</h2>
          ${isAuthenticated && html`
            <button className="btn btn-secondary" type="button" onClick=${onLogout}>Sair</button>
          `}
        </div>

        ${!isAuthenticated ? html`
          <div className="card">
            <p>Faça login no topo da página para acessar a área de edição.</p>
            <button className="btn btn-primary" type="button" onClick=${onOpenLogin}>Abrir login de administrador</button>
          </div>
        ` : html`
          <div className="grid two">
            <${AvailabilityForm}
              attractions=${data.attractions}
              events=${data.events}
              onSubmit=${onUpdateAvailability}
            />
            <${NewsForm} onSubmit=${onPublishNews} />
          </div>
        `}
      </section>
    `;
  }

  function AvailabilityForm({ attractions, events, onSubmit }) {
    const targets = [
      ...attractions.map((item) => ({ id: item.id, label: `[Atrativo] ${item.name}` })),
      ...events.map((item) => ({ id: item.id, label: `[Evento] ${item.name}` }))
    ];

    const [targetId, setTargetId] = useState(targets[0]?.id || "");
    const [status, setStatus] = useState("Aberto");
    const [hours, setHours] = useState("");

    useEffect(() => {
      if (!targets.some((target) => target.id === targetId)) {
        setTargetId(targets[0]?.id || "");
      }
    }, [targets, targetId]);

    function handleSubmit(event) {
      event.preventDefault();
      onSubmit({ targetId, status, hours });
      setStatus("Aberto");
      setHours("");
    }

    return html`
      <article className="card">
        <h3>Atualizar disponibilidade</h3>
        <form className="stack-form" onSubmit=${handleSubmit}>
          <label htmlFor="targetSelect">Atrativo / Evento</label>
          <select id="targetSelect" required value=${targetId} onChange=${(event) => setTargetId(event.target.value)}>
            ${targets.map((target) => html`
              <option value=${target.id} key=${target.id}>${target.label}</option>
            `)}
          </select>

          <label htmlFor="statusSelect">Status</label>
          <select id="statusSelect" required value=${status} onChange=${(event) => setStatus(event.target.value)}>
            <option value="Aberto">Aberto</option>
            <option value="Parcial">Parcial</option>
            <option value="Fechado">Fechado</option>
            <option value="Em manutencao">Em manutenção</option>
          </select>

          <label htmlFor="hoursInput">Horário</label>
          <input
            id="hoursInput"
            type="text"
            placeholder="Ex.: 08:00 às 17:00"
            required
            value=${hours}
            onChange=${(event) => setHours(event.target.value)}
          />

          <button className="btn btn-primary" type="submit">Salvar atualização</button>
        </form>
      </article>
    `;
  }

  function NewsForm({ onSubmit }) {
    const [text, setText] = useState("");

    function handleSubmit(event) {
      event.preventDefault();
      onSubmit(text);
      setText("");
    }

    return html`
      <article className="card">
        <h3>Publicar novidade</h3>
        <form className="stack-form" onSubmit=${handleSubmit}>
          <label htmlFor="newsInput">Texto da novidade</label>
          <textarea
            id="newsInput"
            rows="4"
            placeholder="Ex.: Trilha X com visitação parcial por causa de chuva."
            required
            value=${text}
            onChange=${(event) => setText(event.target.value)}
          ></textarea>
          <button className="btn btn-primary" type="submit">Publicar</button>
        </form>
      </article>
    `;
  }

  function LoginModal({ isOpen, onClose, onLogin }) {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
      if (!isOpen) {
        return undefined;
      }

      function handleKeydown(event) {
        if (event.key === "Escape") {
          onClose();
        }
      }

      document.addEventListener("keydown", handleKeydown);
      return () => document.removeEventListener("keydown", handleKeydown);
    }, [isOpen, onClose]);

    if (!isOpen) {
      return null;
    }

    function handleSubmit(event) {
      event.preventDefault();
      onLogin(user.trim(), password.trim());
      setUser("");
      setPassword("");
    }

    return html`
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div className="modal-backdrop" onClick=${onClose}></div>
        <div className="modal-card card">
          <button className="modal-close" type="button" aria-label="Fechar login" onClick=${onClose}>×</button>
          <h3 id="modalTitle">Login para administrador</h3>
          <p className="muted">Acesso restrito para atualização das informações do site.</p>
          <form className="stack-form" onSubmit=${handleSubmit}>
            <label htmlFor="adminUser">Usuário</label>
            <input id="adminUser" type="text" placeholder="admin" required value=${user} onChange=${(event) => setUser(event.target.value)} />
            <label htmlFor="adminPass">Senha</label>
            <input id="adminPass" type="password" placeholder="******" required value=${password} onChange=${(event) => setPassword(event.target.value)} />
            <button className="btn btn-primary" type="submit">Entrar</button>
          </form>
          <p className="hint">Demo MVP: usuário <strong>admin</strong> e senha <strong>tereverde2026</strong></p>
        </div>
      </div>
    `;
  }

  function Toast({ message }) {
    if (!message) {
      return null;
    }

    return html`
      <div className="toast" role="status" aria-live="polite">
        ${message}
      </div>
    `;
  }

  window.TereVerdeComponents = {
    Header,
    ParksSection,
    MapSection,
    AttractionsSection,
    EventsSection,
    ConditionsSection,
    AdminSection,
    LoginModal,
    Toast
  };
})();
