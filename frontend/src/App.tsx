import { useState, useEffect, useRef, type FormEvent } from "react";
import { Eye, EyeOff, Folder, Menu, X, TrendingUp, Receipt, FilePlus, Bell } from "lucide-react";

type Stage = "login" | "transition" | "dashboard";
type Section = "clientes" | "formulas";

function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label="Notificaciones"
        onClick={() => setOpen((o) => !o)}
        className="h-9 w-9 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "#F0F5FC", border: "0.5px solid #C5D4EA" }}
      >
        <Bell className="h-4 w-4" style={{ color: "#0F2D5A" }} strokeWidth={1.75} />
      </button>
      {open && (
        <div
          className="absolute right-0 mt-2 w-64 bg-white"
          style={{
            border: "0.5px solid #C5D4EA",
            borderRadius: "8px",
            boxShadow: "0 4px 16px rgba(15, 45, 90, 0.08)",
            padding: "1rem",
            color: "#9CA3AF",
            fontSize: "13px",
            fontFamily: "Outfit, sans-serif",
            textAlign: "center",
          }}
        >
          No hay notificaciones nuevas
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [stage, setStage] = useState<Stage>("login");
  const [fadeIn, setFadeIn] = useState(false);

  const handleSuccess = () => {
    setStage("transition");
    setTimeout(() => {
      setStage("dashboard");
      requestAnimationFrame(() => setFadeIn(true));
    }, 2400);
  };

  const handleLogout = () => {
    setFadeIn(false);
    setStage("login");
  };

  if (stage === "login") return <LoginPage onSuccess={handleSuccess} />;
  if (stage === "transition") return <TransitionScreen />;
  return (
    <div className={`transition-opacity duration-500 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
      <Dashboard onLogout={handleLogout} />
    </div>
  );
}

function LoginPage({ onSuccess }: { onSuccess: () => void }) {
  const [user, setUser] = useState("contador1");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (user === "contador1" && password === "Demo1234") {
        onSuccess();
      } else {
        setError("Credenciales inválidas. Probá con la cuenta de prueba.");
      }
    }, 400);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-background">
      <div className="w-full max-w-md">
        <section aria-labelledby="login-title" className="bg-card rounded-xl border border-border px-8 py-10">
          <header className="text-center">
            <h1 id="login-title" className="text-3xl font-semibold text-primary tracking-tight">GitAudit</h1>
            <p className="mt-2 text-sm text-muted-foreground">Gestión contable segura y colaborativa</p>
          </header>

          <hr className="my-6 border-t border-border" />

          <form onSubmit={onSubmit} className="space-y-5" noValidate>
            <div className="space-y-2">
              <label htmlFor="user" className="block text-sm font-medium text-foreground">Usuario</label>
              <input
                id="user"
                type="text"
                autoComplete="username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full h-11 px-3 rounded-md border border-input bg-[var(--input-bg)] text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary focus:ring-[3px] focus:ring-primary/10"
                placeholder="contador1"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-foreground">Contraseña</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-3 pr-11 rounded-md border border-input bg-[var(--input-bg)] text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary focus:ring-[3px] focus:ring-primary/10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  aria-label={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground transition"
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-foreground select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-input text-primary focus:ring-primary/20"
              />
              Recordarme
            </label>

            {error && (
              <div role="alert" className="rounded-md border border-destructive/30 bg-destructive/5 text-destructive text-sm px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-md bg-primary text-primary-foreground font-medium tracking-tight transition hover:bg-[var(--primary-container)] active:opacity-95 disabled:opacity-60"
            >
              {loading ? "Ingresando..." : "Iniciar sesión"}
            </button>
          </form>

          <div className="mt-6 rounded-md bg-accent/60 border border-accent text-accent-foreground text-sm text-center px-4 py-3">
            Usuario de prueba: <span className="font-medium">contador1</span> — Contraseña: <span className="font-medium">Demo1234</span>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground leading-relaxed">
            Las cuentas son creadas por el administrador del sistema.
            <br />
            Para solicitar acceso, contactá a tu contador.
          </p>
        </section>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} GitAudit · Auditoría contable
        </p>
      </div>
    </main>
  );
}

function TransitionScreen() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 animate-in fade-in duration-300"
      style={{ backgroundColor: "#F4F8FE" }}
      role="status"
      aria-live="polite"
    >
      <p style={{ color: "#16A34A", fontSize: "20px", fontWeight: 500, fontFamily: "Outfit, sans-serif" }}>
        Credenciales validadas
      </p>
      <p className="mt-2 text-muted-foreground" style={{ fontSize: "14px" }}>
        Accediendo...
      </p>
      <div className="mt-6 flex gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-[#1B4F9E] animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="h-2 w-2 rounded-full bg-[#1B4F9E] animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="h-2 w-2 rounded-full bg-[#1B4F9E] animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </main>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [section, setSection] = useState<Section>("clientes");
  const [mobileOpen, setMobileOpen] = useState(false);

  const selectSection = (s: Section) => {
    setSection(s);
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F4F5F7", fontFamily: "Outfit, sans-serif" }}>
      <header
        className="fixed top-0 inset-x-0 h-14 bg-white border-b z-30 flex items-center px-4 md:pl-[236px] md:pr-6"
        style={{ borderColor: "#C5D4EA" }}
      >
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menú"
          className="md:hidden p-2 -ml-2 rounded-md hover:bg-[#E0EAF8]"
        >
          <Menu className="h-5 w-5" style={{ color: "#0F2D5A" }} />
        </button>
        <span className="md:hidden ml-2" style={{ color: "#0F2D5A", fontSize: "16px", fontWeight: 400 }}>GitAudit</span>

        <div className="ml-auto flex items-center gap-3">
          <NotificationsBell />
          <span style={{ color: "#374151", fontSize: "14px", fontWeight: 500, fontFamily: "Outfit, sans-serif" }}>
            Contador1
          </span>
          <button
            type="button"
            aria-label="Perfil"
            className="h-9 w-9 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: "#1B4F9E", fontSize: "13px", fontWeight: 500, fontFamily: "Outfit, sans-serif" }}
          >
            C1
          </button>
        </div>
      </header>

      <Sidebar
        section={section}
        onSelect={selectSection}
        onLogout={onLogout}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <main className="flex-1 md:ml-[220px] pt-14">
        <div className="p-8">
          {section === "clientes" ? <ClientesView /> : <FormulasView />}
        </div>
      </main>
    </div>
  );
}

function Sidebar({
  section,
  onSelect,
  onLogout,
  mobileOpen,
  onCloseMobile,
}: {
  section: Section;
  onSelect: (s: Section) => void;
  onLogout: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={onCloseMobile} aria-hidden="true" />
      )}
      <aside
        className={`fixed top-0 left-0 h-screen w-[220px] flex flex-col z-50 transition-transform duration-200 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{ backgroundColor: "#F0F5FC", borderRight: "0.5px solid #C5D4EA" }}
      >
        <div className="flex items-center justify-between pt-6 px-5 pb-4">
          <span style={{ color: "#0F2D5A", fontSize: "16px", fontWeight: 400 }}>GitAudit</span>
          <button
            className="md:hidden p-1 rounded hover:bg-[#E0EAF8]"
            onClick={onCloseMobile}
            aria-label="Cerrar menú"
          >
            <X className="h-4 w-4" style={{ color: "#0F2D5A" }} />
          </button>
        </div>

        <nav className="flex-1 px-3 mt-2 space-y-1">
          <NavItem active={section === "clientes"} onClick={() => onSelect("clientes")}>
            Cartera de Clientes
          </NavItem>
          <NavItem active={section === "formulas"} onClick={() => onSelect("formulas")}>
            Cálculos y Fórmulas
          </NavItem>
        </nav>

        <div className="px-3 pb-5">
          <hr className="mb-3" style={{ borderColor: "#C5D4EA", borderTopWidth: "0.5px" }} />
          <button
            onClick={onLogout}
            className="w-full text-left px-3 py-2 rounded-md transition-colors hover:text-red-500"
            style={{ color: "#9CA3AF", fontSize: "13px" }}
          >
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}

function NavItem({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2 rounded-md transition-colors"
      style={
        active
          ? { backgroundColor: "#1B4F9E", color: "#fff", fontSize: "14px" }
          : { color: "#374151", fontSize: "14px" }
      }
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.backgroundColor = "#E0EAF8";
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      {children}
    </button>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ color: "#0F2D5A", fontSize: "20px", fontWeight: 500, fontFamily: "Outfit, sans-serif" }}>
      {children}
    </h2>
  );
}

function ClientesView() {
  const clientes = ["Cliente 1", "Cliente 2", "Cliente 3"];
  return (
    <div>
      <SectionTitle>Cartera de Clientes</SectionTitle>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {clientes.map((c) => (
          <button
            key={c}
            type="button"
            className="group bg-white flex flex-col items-center justify-center gap-3 p-6 transition-all"
            style={{
              border: "0.5px solid #C5D4EA",
              borderRadius: "12px",
              minHeight: "160px",
              color: "#0F2D5A",
              fontSize: "15px",
              fontFamily: "Outfit, sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#1B4F9E";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(27, 79, 158, 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#C5D4EA";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <Folder className="h-12 w-12" style={{ color: "#1B4F9E" }} strokeWidth={1.5} />
            <span>{c}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function FormulasView() {
  const items = [
    { label: "Ingresos Brutos", Icon: TrendingUp },
    { label: "IVA", Icon: Receipt },
    { label: "Agregar o editar fórmulas", Icon: FilePlus },
  ];
  return (
    <div>
      <SectionTitle>Cálculos y Fórmulas</SectionTitle>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {items.map(({ label, Icon }) => (
          <button
            key={label}
            type="button"
            className="group bg-white flex flex-col items-center justify-center gap-3 p-6 transition-all"
            style={{
              border: "0.5px solid #C5D4EA",
              borderRadius: "12px",
              minHeight: "160px",
              color: "#0F2D5A",
              fontSize: "15px",
              fontFamily: "Outfit, sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#1B4F9E";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(27, 79, 158, 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#C5D4EA";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <Icon className="h-12 w-12" style={{ color: "#1B4F9E" }} strokeWidth={1.5} />
            <span className="text-center">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
