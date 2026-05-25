/* eslint-disable */
// app.jsx — root orchestrator + Tweaks panel

const ACCENTS = [
  { coral: "oklch(62% 0.18 30)",  ink: "oklch(48% 0.16 30)",  soft: "oklch(88% 0.05 30)"  }, // coral
  { coral: "oklch(55% 0.16 45)",  ink: "oklch(42% 0.14 45)",  soft: "oklch(86% 0.05 45)"  }, // rust
  { coral: "oklch(70% 0.21 145)", ink: "oklch(55% 0.18 145)", soft: "oklch(90% 0.06 145)" }, // electric green
  { coral: "oklch(22% 0.01 40)",  ink: "oklch(15% 0.01 40)",  soft: "oklch(85% 0.005 70)" }, // ink (monochrome)
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "oklch(62% 0.18 30)",
  "mode": "dual",
  "density": "regular"
}/*EDITMODE-END*/;

const DENSITY_MAP = { compact: 0.7, regular: 1.0, comfy: 1.3 };

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks to CSS variables on :root
  useEffect(() => {
    const root = document.documentElement;
    const a = ACCENTS.find((x) => x.coral === t.accent) || ACCENTS[0];
    root.style.setProperty("--coral", a.coral);
    root.style.setProperty("--coral-ink", a.ink);
    root.style.setProperty("--coral-soft", a.soft);
    root.style.setProperty("--density", DENSITY_MAP[t.density] || 1);

    // Mode is handled by data-mode attribute + CSS rules (clean overrides per mode)
    root.setAttribute("data-mode", t.mode || "dual");
  }, [t.accent, t.mode, t.density]);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Manifesto />
        <CasesSection />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />

      <TweaksPanel>
        <TweakSection label="Acento" />
        <TweakColor
          label="Color"
          value={t.accent}
          options={ACCENTS.map((a) => a.coral)}
          onChange={(v) => setTweak("accent", v)}
        />

        <TweakSection label="Modo de página" />
        <TweakRadio
          label="Esquema"
          value={t.mode}
          options={["dual", "light", "dark"]}
          onChange={(v) => setTweak("mode", v)}
        />

        <TweakSection label="Densidad" />
        <TweakRadio
          label="Espaciado"
          value={t.density}
          options={["compact", "regular", "comfy"]}
          onChange={(v) => setTweak("density", v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
