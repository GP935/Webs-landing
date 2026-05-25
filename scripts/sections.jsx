/* eslint-disable */
// sections.jsx — all section components for the ecomnet landing
// Exports to window for use in app.jsx

const { useState, useRef, useEffect, useCallback } = React;

/* =========================================================================
   Logo
   ========================================================================= */
function Wordmark({ size = 24, color, slashColor, className = "" }) {
  return (
    <span className={`nav__logo ${className}`} style={{ fontSize: size, color: color || undefined }}>
      <span>ecom</span>
      <span className="nav__logo-slash" style={{ color: slashColor || undefined }}>/</span>
      <span>net</span>
    </span>
  );
}

/* =========================================================================
   Nav
   ========================================================================= */
function Nav() {
  return (
    <header className="nav">
      <div className="container nav__inner">
        <Wordmark />
        <nav className="nav__links">
          <a href="#casos">Casos</a>
          <a href="plantillas/index.html">Plantillas</a>
          <a href="#pricing">Planes</a>
          <a href="#faq">Preguntas</a>
          <span className="nav__live"><span className="dot" /> Servicio activo · 100 negocios</span>
          <a href="#cta" className="btn btn--coral nav__cta">
            Empezar
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="arrow">
              <path d="M3 7h8M7 3l4 4-4 4" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}

/* =========================================================================
   Before / After slider
   Two DOM-rendered mock landings sliced by clip-path on user drag.
   ========================================================================= */
function BeforeAfter() {
  const ref = useRef(null);
  const [split, setSplit] = useState(50);
  const dragging = useRef(false);

  const set = useCallback((clientX) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const pct = ((clientX - r.left) / r.width) * 100;
    setSplit(Math.max(3, Math.min(97, pct)));
  }, []);

  useEffect(() => {
    const move = (e) => {
      if (!dragging.current) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      set(x);
    };
    const up = () => { dragging.current = false; document.body.style.cursor = ""; };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
  }, [set]);

  // gentle auto-demo on mount
  useEffect(() => {
    let t1 = setTimeout(() => setSplit(72), 600);
    let t2 = setTimeout(() => setSplit(28), 1500);
    let t3 = setTimeout(() => setSplit(50), 2400);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  const start = (e) => {
    dragging.current = true;
    document.body.style.cursor = "ew-resize";
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    set(x);
    e.preventDefault();
  };

  return (
    <div
      className="ba"
      ref={ref}
      style={{ "--split": `${split}%` }}
      onMouseDown={start}
      onTouchStart={start}
    >
      {/* BEFORE pane — generic ugly template */}
      <div className="ba__pane ba__pane--before">
        <MockBefore />
      </div>
      {/* AFTER pane — refined editorial */}
      <div className="ba__pane ba__pane--after">
        <MockAfter />
      </div>

      <span className="ba__tag ba__tag--before">Antes · plantilla genérica</span>
      <span className="ba__tag ba__tag--after">Después · ecomnet</span>

      <div className="ba__divider" />
      <div className="ba__handle" aria-label="Arrastra para comparar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

/* BEFORE — typical PYME Spanish real-estate landing (cluttered, dated) */
function MockBefore() {
  return (
    <div className="mock mock--before">
      <div className="b-nav">
        <span className="b-logo">PINAMAR INMOBILIARIA</span>
        <span className="b-nav-links">
          Inicio · Pisos · Locales · Quiénes somos · Hipotecas · Tasaciones · Blog · Contacto
        </span>
        <span className="b-nav-tel">☎ 91 555 88 22</span>
      </div>
      <div className="b-banner">
        <div className="b-banner-photo">
          <div className="b-banner-overlay" />
          <div className="b-banner-text">
            <p className="b-banner-eyebrow">★★★★★ &nbsp;&nbsp; +20 AÑOS DE EXPERIENCIA</p>
            <h1>TU HOGAR<br/>IDEAL TE ESPERA</h1>
            <p className="b-banner-sub">La mejor inmobiliaria de Madrid · Más de 1.500 viviendas vendidas · Atención personalizada</p>
            <span className="b-btn">CONTACTAR AHORA ➜</span>
          </div>
        </div>
      </div>
      <div className="b-grid">
        <div className="b-card">
          <div className="b-card-img" />
          <div className="b-card-badge">¡OFERTA!</div>
          <div className="b-card-price">365.000€</div>
          <div className="b-card-title">PISO EN ATOCHA - 3 HAB. - 2 BAÑOS - 95M²</div>
        </div>
        <div className="b-card">
          <div className="b-card-img" />
          <div className="b-card-badge b-card-badge--alt">NUEVO</div>
          <div className="b-card-price">520.000€</div>
          <div className="b-card-title">CHAMBERÍ - 4 HAB. - REFORMADO - 120M²</div>
        </div>
        <div className="b-card">
          <div className="b-card-img" />
          <div className="b-card-badge">REBAJADO</div>
          <div className="b-card-price">285.000€</div>
          <div className="b-card-title">LAVAPIÉS - 2 HAB. - LUMINOSO - 68M²</div>
        </div>
      </div>
      <div className="b-strip">
        <span>✓ Tasación gratuita</span>
        <span>✓ Financiación al 100%</span>
        <span>✓ Sin comisiones ocultas</span>
        <span>✓ Atención 7 días</span>
      </div>
      <div className="b-whatsapp">WhatsApp</div>
    </div>
  );
}

/* AFTER — same Pinamar, refined editorial treatment */
function MockAfter() {
  return (
    <div className="mock mock--after">
      <div className="a-nav">
        <span className="a-logo">Pinamar<span style={{ color: "var(--coral)", fontStyle: "italic", padding: "0 1px" }}>/</span>Inmobiliaria</span>
        <div className="a-links">
          <span>Portfolio</span><span>Equipo</span><span>Tasación</span>
        </div>
        <span className="a-loc">Madrid · ES</span>
      </div>
      <div className="a-hero">
        <div className="a-hero-left">
          <div className="a-eyebrow">— Selección semana 24 · Madrid centro</div>
          <h1>Pisos<br/>con <em>carácter</em>,<br/>uno a uno.</h1>
          <p className="a-lede">Cada inmueble visitado, fotografiado y descrito por una persona. Cero plantillas.</p>
          <span className="a-btn">Ver selección →</span>
        </div>
        <div className="a-featured">
          <div className="a-featured-img">
            <span className="a-featured-tag">obra · Atocha</span>
            <div className="a-featured-windows" />
          </div>
          <div className="a-featured-meta">
            <span>01 / Atocha</span>
            <span>365.000€</span>
          </div>
          <div className="a-featured-title">Edificio clásico,<br/>suelos hidráulicos</div>
          <div className="a-featured-data">3 hab · 2 baños · 95m² · ext.</div>
        </div>
      </div>
      <div className="a-meta">
        <span>Inmuebles vivos<b>· 24</b></span>
        <span>Venta media<b>· 38 días</b></span>
        <span>Visitas/mes<b>· 1 240</b></span>
        <span className="a-meta-right">v. 2.4 · por ecomnet</span>
      </div>
    </div>
  );
}

/* =========================================================================
   Hero section
   ========================================================================= */
function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__meta">
          <span className="eyebrow">N.º 01 — Servicio recurrente</span>
          <span className="hero__meta-line" />
          <span className="eyebrow">Murcia · Madrid · LATAM</span>
        </div>

        <h1 className="hero__h1">
          De idea a venta<br/>
          <em>en 48 horas.</em>
        </h1>

        <div className="hero__sub-row">
          <p className="lede">
            Una landing diseñada, publicada y mantenida por una cuota fija al mes.
            Sin agencias intermedias. Sin presupuestos que se duplican.
            Si no te encaja, no pagas nada.
          </p>
          <div className="hero__actions">
            <a href="#cta" className="btn btn--coral">
              Ver planes
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="arrow"><path d="M3 7h8M7 3l4 4-4 4" /></svg>
            </a>
            <a href="plantillas/index.html" className="btn btn--ghost">Ver plantillas</a>
            <a href="#casos" className="btn btn--ghost">Ver casos reales</a>
          </div>
        </div>

        <BeforeAfter />

        <p className="hero__caption">
          Arrastra para comparar · Misma marca, antes y después de ecomnet
        </p>
      </div>
    </section>
  );
}

/* =========================================================================
   Stats strip
   ========================================================================= */
function CountUp({ to, format = (n) => n }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let started = false;
    const obs = new IntersectionObserver((ents) => {
      ents.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true;
          const dur = 1400;
          const t0 = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setV(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{format(v)}</span>;
}

function Stats() {
  return (
    <section className="stats">
      <div className="stats__row stats__row--three">
        <div className="stats__cell">
          <div className="stats__big tnum">
            <CountUp to={100} />
            <sup>+</sup>
          </div>
          <div className="stats__label">Negocios activos<br/>en producción</div>
        </div>
        <div className="stats__cell">
          <div className="stats__big tnum">
            <CountUp to={33638} format={(n) => n.toLocaleString("es-ES")} />
          </div>
          <div className="stats__label">Leads gestionados<br/>desde 2023</div>
        </div>
        <div className="stats__cell">
          <div className="stats__big tnum">
            48<sup>h</sup>
          </div>
          <div className="stats__label">Tiempo medio<br/>de entrega real</div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   Manifiesto — three values
   ========================================================================= */
function Manifesto() {
  return (
    <section className="section">
      <div className="container">
        <div className="manifesto__head">
          <span className="eyebrow">02 — Cómo trabajamos</span>
          <h2 className="display-l">
            No experimentamos<br/>contigo. <em className="italic" style={{ color: "var(--coral)" }}>Publicamos.</em>
          </h2>
        </div>
        <div className="manifesto__grid">
          <div className="manifesto__cell">
            <span className="num">— 01</span>
            <h3>Una cuota, sin sorpresas.</h3>
            <p>Diseño, hosting, dominio, mantenimiento y soporte directo. Sin "fases" ni presupuestos
              que se duplican. Pagas lo mismo el mes uno y el doce.</p>
          </div>
          <div className="manifesto__cell">
            <span className="num">— 02</span>
            <h3>48 horas, en serio.</h3>
            <p>Briefing por la mañana, primera versión publicada antes de las 48 horas.
              No es marketing: es nuestra media real medida sobre 100 entregas.</p>
          </div>
          <div className="manifesto__cell">
            <span className="num">— 03</span>
            <h3>Si no te encaja, no pagas.</h3>
            <p>Garantía de cancelación durante los primeros 14 días sin condiciones.
              Confiamos tanto en el trabajo que lo ponemos por escrito.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   Cases — anchor (Salgado) + 6 cards
   ========================================================================= */
function CasesSection() {
  return (
    <section id="casos" className="section section--night">
      <div className="container">
        <div className="cases__head">
          <span className="eyebrow eyebrow--coral">03 — Casos reales</span>
          <h2 className="display-l">
            No vendemos promesas:<br/>
            vendemos <em className="italic" style={{ color: "var(--coral)" }}>lo que ya hemos hecho.</em>
          </h2>
        </div>

        <AnchorSalgado />

        <div className="cases__grid">
          {OTHER_CASES.map((c, i) => <CaseCard key={c.name} c={c} idx={i + 2} />)}
        </div>
      </div>
    </section>
  );
}

function AnchorSalgado() {
  return (
    <div className="anchor">
      <div className="anchor__media">
        <div className="m m1" style={{ backgroundImage: "url(assets/salgado/tattoo-justice.jpeg)" }} />
        <div className="m" style={{ backgroundImage: "url(assets/salgado/tattoo-gorilla.jpeg)" }} />
        <div className="m" style={{ backgroundImage: "url(assets/salgado/tattoo-buddha.jpeg)" }} />
        <div className="m" style={{ backgroundImage: "url(assets/salgado/artist-portrait.jpeg)" }} />
        <div className="m" style={{ backgroundImage: "url(assets/salgado/tattoo-tiger.jpeg)" }} />
      </div>
      <div className="anchor__body">
        <div className="anchor__meta">
          <span>Caso 01 / Destacado</span>
          <span>Murcia, ES</span>
          <span>Tatuaje realismo</span>
          <span>Plan Premium</span>
        </div>
        <h3 className="anchor__title">
          Salgado<em>/</em>Tattoo
        </h3>
        <p className="lede" style={{ color: "var(--on-night-2)" }}>
          De una página de plantilla con menú lateral y formulario roto, a una pieza editorial
          que muestra el trabajo como debería verse: a tamaño completo, sin distracciones.
          Lista de espera abierta a cuatro meses vista.
        </p>

        <blockquote className="anchor__quote">
          "En el primer mes con la web nueva, el porcentaje de reservas que llegaron por
          formulario subió del 14% al 61%. El resto vino solo."
          <cite>— Sergio Salgado · Fundador</cite>
        </blockquote>

        <div className="anchor__metrics">
          <div className="anchor__metric">
            <div className="v tnum">×4<sup>·2</sup></div>
            <div className="l">Reservas /<br/>mes vs. web anterior</div>
          </div>
          <div className="anchor__metric">
            <div className="v tnum">38<sup>%</sup></div>
            <div className="l">Cliente<br/>foráneo nuevo</div>
          </div>
          <div className="anchor__metric">
            <div className="v tnum">36<sup>h</sup></div>
            <div className="l">Entrega real<br/>(de briefing a vivo)</div>
          </div>
        </div>

        <div>
          <a href="#" className="btn btn--ghost" style={{ color: "var(--on-night)", borderColor: "var(--rule-night)" }}>
            Ver caso completo
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="arrow"><path d="M3 7h8M7 3l4 4-4 4" /></svg>
          </a>
        </div>
      </div>
    </div>
  );
}

function CaseCard({ c, idx }) {
  return (
    <article className="case-card">
      <div className="case-card__index">— 0{idx}</div>
      <div>
        <div className="case-card__sector">{c.sector}</div>
        <h3 className="case-card__title">{c.name}</h3>
      </div>
      <div className="case-card__metrics">
        <div>
          <span className="v tnum">{c.m1.v}</span>
          <span className="l">{c.m1.l}</span>
        </div>
        <div>
          <span className="v tnum">{c.m2.v}</span>
          <span className="l">{c.m2.l}</span>
        </div>
      </div>
      <span className="case-card__arrow">→</span>
    </article>
  );
}

const OTHER_CASES = [
  { name: "Pinamar Inmobiliaria", sector: "Inmobiliaria · Madrid", m1: { v: "2.3×", l: "Leads / mes" }, m2: { v: "48h", l: "Online desde" } },
  { name: "Henko Prime Studio",   sector: "Estética · Murcia",     m1: { v: "+127", l: "Reservas / mes" }, m2: { v: "92%", l: "Ocupación" } },
  { name: "Top Global Net",       sector: "Servicios B2B · ES",   m1: { v: "×5", l: "Demos / sem." }, m2: { v: "11s", l: "Tiempo medio" } },
  { name: "Health365",            sector: "Clínica · Online",     m1: { v: "640", l: "Citas / mes" }, m2: { v: "0,8%", l: "Conv. → llamada" } },
  { name: "Pétalo Boutique",      sector: "Ecommerce · Murcia",  m1: { v: "+38%", l: "AOV" }, m2: { v: "3,4×", l: "Sesiones / cliente" } },
  { name: "Quórum Advisors",      sector: "Consultoría · Madrid", m1: { v: "210", l: "Leads cualificados" }, m2: { v: "48h", l: "Time-to-live" } },
];

/* =========================================================================
   Pricing
   ========================================================================= */
function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="container">
        <div className="pricing__head">
          <span className="eyebrow">04 — Planes y precios</span>
          <h2 className="display-l">
            Un precio fijo,<br/>
            <em className="italic" style={{ color: "var(--coral)" }}>cero letra pequeña.</em>
          </h2>
        </div>

        <div className="pricing__table">
          <div className="pricing__row pricing__row--header">
            <div></div>
            <div>
              <div className="pricing__plan-name">Estándar</div>
              <div className="pricing__plan-tag">Para empezar</div>
              <div className="pricing__price tnum" style={{ marginTop: 24 }}>
                19<span style={{ fontSize: "0.5em" }}>,99</span>€
              </div>
              <div className="pricing__price-period">/ mes · sin permanencia</div>
            </div>
            <div className="pricing__featured">
              <span className="pricing__featured-badge">Más elegido</span>
              <div className="pricing__plan-name">Premium</div>
              <div className="pricing__plan-tag pricing__plan-tag--coral">Recomendado</div>
              <div className="pricing__price tnum" style={{ marginTop: 24 }}>
                49<span style={{ fontSize: "0.5em" }}>,99</span>€
              </div>
              <div className="pricing__price-period">/ mes · sin permanencia</div>
            </div>
            <div>
              <div className="pricing__plan-name">Premium <span style={{ fontStyle: "italic", color: "var(--coral)" }}>Web Previa</span></div>
              <div className="pricing__plan-tag">Migración desde otra web</div>
              <div className="pricing__price tnum" style={{ marginTop: 24 }}>
                29<span style={{ fontSize: "0.5em" }}>,99</span>€
              </div>
              <div className="pricing__price-period">/ mes · descuento permanente</div>
            </div>
          </div>

          {PRICING_ROWS.map((row) => (
            <div className="pricing__row" key={row.label}>
              <div>{row.label}</div>
              <div>{row.std}</div>
              <div className="pricing__featured">{row.pre}</div>
              <div>{row.mig}</div>
            </div>
          ))}

          <div className="pricing__row pricing__row--cta">
            <div></div>
            <div className="pricing__cta">
              <a href="#cta" className="btn btn--ghost" style={{ color: "var(--ink)", borderColor: "var(--ink)" }}>Empezar</a>
            </div>
            <div className="pricing__featured pricing__cta">
              <a href="#cta" className="btn btn--coral">
                Empezar Premium
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="arrow"><path d="M3 7h8M7 3l4 4-4 4" /></svg>
              </a>
            </div>
            <div className="pricing__cta">
              <a href="#cta" className="btn btn--ghost" style={{ color: "var(--ink)", borderColor: "var(--ink)" }}>Migrar mi web</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const C = <span className="check">●</span>;
const D = <span className="dash">—</span>;
const PRICING_ROWS = [
  { label: "Diseño en 48h",        std: C, pre: C, mig: C },
  { label: "Rebranding visual",    std: <span className="dash">básico</span>, pre: C, mig: C },
  { label: "Hosting + dominio",    std: C, pre: C, mig: C },
  { label: "Cambios ilimitados",   std: D, pre: C, mig: C },
  { label: "Soporte directo (WhatsApp)", std: <span className="dash">email</span>, pre: C, mig: C },
  { label: "Analítica + leads",    std: D, pre: C, mig: <span className="dash">opcional</span> },
  { label: "Garantía 14 días",     std: C, pre: C, mig: C },
];

/* =========================================================================
   FAQ
   ========================================================================= */
function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="faq__head">
          <span className="eyebrow">05 — Preguntas que ya nos han hecho</span>
          <h2 className="display-l">
            Sin letra pequeña,<br/>
            <em className="italic" style={{ color: "var(--coral)" }}>sin asteriscos.</em>
          </h2>
        </div>

        <div className="faq__list" role="list">
          {FAQ_DATA.map((f, i) => (
            <FAQItem key={i} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a, open, onToggle }) {
  const ref = useRef(null);
  return (
    <div className="faq__item" role="listitem">
      <button className="faq__btn" aria-expanded={open} onClick={onToggle}>
        <span className="faq__q">{q}</span>
        <span className="faq__plus">+</span>
      </button>
      <div className="faq__panel" style={{ maxHeight: open ? (ref.current?.scrollHeight || 800) + 60 : 0 }}>
        <div className="faq__panel-inner" ref={ref}>
          {a}
        </div>
      </div>
    </div>
  );
}

const FAQ_DATA = [
  {
    q: "¿Por qué 48 horas y no una semana, como todos?",
    a: <><p>Porque tenemos un sistema de producción interno —no una agencia de freelances— y porque el 95% de las landings que necesita un negocio local comparten la misma arquitectura. Lo que cambia es la marca, el tono y las fotos. Eso sí lo hacemos a medida.</p><p>La media real de las últimas 100 entregas es 41 horas. Lo decimos como 48 porque preferimos prometer de menos.</p></>
  },
  {
    q: "Pago una cuota mensual. ¿Qué pasa si dejo de pagar?",
    a: <p>La landing se pausa. No se borra. Si vuelves en 30 días, todo sigue donde lo dejaste. Si pasan más de 90 días sin actividad, te enviamos un archivo con todo el contenido para que puedas migrarlo donde quieras. Sin rehén digital.</p>
  },
  {
    q: "¿Y si quiero cambiar algo cada semana?",
    a: <p>En los planes Premium puedes pedir cambios ilimitados por WhatsApp. La media de tiempo de respuesta del último trimestre es 3h 12min en horario laboral (lun-vie 9-19h CET).</p>
  },
  {
    q: "Trabajáis con negocios fuera de España, ¿verdad?",
    a: <p>Sí. El 18% de la cartera está en LATAM (México, Colombia, Argentina principalmente). Facturamos en euros con conversión al cambio, y aceptamos transferencia internacional o pasarela local según país.</p>
  },
  {
    q: "Tengo una web hecha por una agencia que pago demasiado. ¿Podéis migrarla?",
    a: <p>Para eso existe el plan Premium Web Previa a 29,99€/mes con descuento permanente: en una sola sesión auditamos lo que tienes, decidimos qué se rescata, y reconstruimos la landing en 48h. No tocas tu hosting actual hasta que la nueva esté aprobada.</p>
  },
  {
    q: "¿Veo el resultado antes de pagar?",
    a: <p>Tienes 14 días desde la entrega para cancelar sin coste. Si en ese plazo no te encaja, no facturamos. Pasados los 14 días, el primer mes ya está facturado y puedes cancelar para los siguientes en cualquier momento.</p>
  },
  {
    q: "¿Quién está detrás de ecomnet?",
    a: <p>Un equipo de seis personas distribuido entre Murcia, Madrid y CDMX. Diseño, copy, desarrollo y soporte bajo el mismo paraguas. No subcontratamos a freelances anónimos: cada landing la firma una persona con nombre y apellido que está disponible para ti.</p>
  },
];

/* =========================================================================
   CTA strip
   ========================================================================= */
function CTA() {
  return (
    <section id="cta" className="section section--night">
      <div className="container">
        <div className="cta">
          <span className="eyebrow eyebrow--coral" style={{ display: "block", marginBottom: 28 }}>— Briefing de 15 minutos · gratuito</span>
          <h2>
            Tu próxima landing<br/>
            empieza <em>esta semana.</em>
          </h2>
          <div className="actions">
            <a href="#" className="btn btn--coral">
              Reservar briefing
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="arrow"><path d="M3 7h8M7 3l4 4-4 4" /></svg>
            </a>
            <a href="#pricing" className="btn btn--ghost" style={{ color: "var(--on-night)", borderColor: "var(--on-night)" }}>Comparar planes</a>
          </div>
          <p className="cta__fineprint">
            <span className="coral">●</span> Sin tarjeta · Sin permanencia · 14 días para cancelar sin coste
          </p>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   Footer
   ========================================================================= */
function Footer() {
  // Compute a live-ish "last delivery" timestamp: random hours-ago between 2-23
  const [agoLabel] = useState(() => {
    const h = 2 + Math.floor(Math.random() * 22);
    return h < 24 ? `hace ${h}h` : `hace ${Math.floor(h/24)}d`;
  });
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <div className="footer__logo">ecom<span className="slash">/</span>net</div>
            <p className="footer__tag">Una landing en 48 horas. Una cuota fija al mes. Cero agencias intermedias.</p>
          </div>
          <div className="footer__col">
            <h4>Producto</h4>
            <ul>
              <li><a href="#pricing">Planes</a></li>
              <li><a href="#casos">Casos</a></li>
              <li><a href="#faq">Preguntas</a></li>
              <li><a href="#">Garantía</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Empresa</h4>
            <ul>
              <li><a href="#">Equipo</a></li>
              <li><a href="#">Diario</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Operativa</h4>
            <ul>
              <li><a href="#">Murcia · Madrid · CDMX</a></li>
              <li><a href="#">hola@ecomnet.es</a></li>
              <li><a href="#">+34 600 000 000</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 ecomnet S.L. · CIF B0000000</span>
          <span><span style={{ color: "var(--coral)" }}>●</span> Operativo · última entrega {agoLabel}</span>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================================
   Export everything to window so app.jsx can use it.
   ========================================================================= */
Object.assign(window, {
  Wordmark, Nav, Hero, Stats, Manifesto, CasesSection, Pricing, FAQ, CTA, Footer,
});
