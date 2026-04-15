const { useEffect, useState } = React;
const html = htm.bind(React.createElement);

const {
  Header,
  ParksSection,
  MapSection,
  AttractionsSection,
  EventsSection,
  ConditionsSection,
  AdminSection,
  LoginModal,
  Toast
} = window.TereVerdeComponents;

const STORAGE_KEY = "tereverde_data_v3";
const AUTH_KEY = "tereverde_admin_auth_v1";
const DEMO_USER = "admin";
const DEMO_PASS = "tereverde2026";
const defaultData = window.TEREVERDE_DEFAULT_DATA;

function deepCopy(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeWithDefaults(existing = {}) {
  return {
    ...deepCopy(defaultData),
    ...existing,
    parks: existing.parks || deepCopy(defaultData.parks),
    mapPoints: existing.mapPoints || deepCopy(defaultData.mapPoints),
    attractions: existing.attractions || deepCopy(defaultData.attractions),
    events: existing.events || deepCopy(defaultData.events),
    news: existing.news || deepCopy(defaultData.news)
  };
}

function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return deepCopy(defaultData);
  }

  try {
    const parsed = JSON.parse(raw);
    const merged = mergeWithDefaults(parsed);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch (error) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return deepCopy(defaultData);
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function App() {
  const [data, setData] = useState(loadData);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem(AUTH_KEY) === "1");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!feedback) {
      return undefined;
    }

    const timer = setTimeout(() => setFeedback(""), 2500);
    return () => clearTimeout(timer);
  }, [feedback]);

  function updateData(updater) {
    setData((currentData) => {
      const nextData = typeof updater === "function" ? updater(currentData) : updater;
      saveData(nextData);
      return nextData;
    });
  }

  function handleLogin(user, password) {
    if (user !== DEMO_USER || password !== DEMO_PASS) {
      alert("Credenciais invalidas no modo demo.");
      return;
    }

    localStorage.setItem(AUTH_KEY, "1");
    setIsAuthenticated(true);
    setIsLoginOpen(false);
    setFeedback("Login efetuado com sucesso");
    location.hash = "#admin";
  }

  function handleLogout() {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  }

  function handleUpdateAvailability({ targetId, status, hours }) {
    updateData((currentData) => {
      const nextData = deepCopy(currentData);
      const target = nextData.attractions.find((item) => item.id === targetId)
        || nextData.events.find((item) => item.id === targetId);

      if (!target) {
        alert("Item nao encontrado.");
        return currentData;
      }

      target.status = status;
      target.hours = hours.trim();
      return nextData;
    });

    setFeedback("Disponibilidade atualizada");
  }

  function handlePublishNews(text) {
    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    updateData((currentData) => ({
      ...currentData,
      news: [
        ...currentData.news,
        {
          text: trimmedText,
          createdAt: new Date().toISOString().slice(0, 10)
        }
      ]
    }));

    setFeedback("Novidade publicada");
  }

  return html`
    <div>
      <${Header} onOpenLogin=${() => setIsLoginOpen(true)} />

      <main className="container">
        <${ParksSection} parks=${data.parks} />
        <${MapSection} mapPoints=${data.mapPoints} />
        <${AttractionsSection} attractions=${data.attractions} />
        <${EventsSection} events=${data.events} />
        <${ConditionsSection} attractions=${data.attractions} events=${data.events} news=${data.news} />
        <${AdminSection}
          data=${data}
          isAuthenticated=${isAuthenticated}
          onLogout=${handleLogout}
          onOpenLogin=${() => setIsLoginOpen(true)}
          onUpdateAvailability=${handleUpdateAvailability}
          onPublishNews=${handlePublishNews}
        />
      </main>

      <footer className="footer">
        <div className="container">Terê Verde Online • MVP Front-End para Educação Ambiental</div>
      </footer>

      <${Toast} message=${feedback} />
      <${LoginModal}
        isOpen=${isLoginOpen}
        onClose=${() => setIsLoginOpen(false)}
        onLogin=${handleLogin}
      />
    </div>
  `;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App} />`);
