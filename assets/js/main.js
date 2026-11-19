// Two-state color scheme toggle: "system" (no stored value) or the opposite of the system.
// The inline script in <head> applies the stored value before first paint.
(() => {
  const KEY = "color-scheme";
  const meta = document.querySelector('meta[name="color-scheme"]');
  const button = document.querySelector("[data-theme-toggle]");
  const systemDark = matchMedia("(prefers-color-scheme: dark)");

  const read = () => {
    try { return localStorage.getItem(KEY); } catch { return null; }
  };
  const write = (value) => {
    try {
      if (value) localStorage.setItem(KEY, value);
      else localStorage.removeItem(KEY);
    } catch { /* storage blocked: the change still applies to this page */ }
  };
  const apply = (value) => {
    if (meta) meta.content = value ?? "light dark";
  };
  const rendered = () => {
    const content = meta?.content;
    if (content === "light" || content === "dark") return content;
    return systemDark.matches ? "dark" : "light";
  };

  if (button && meta) {
    button.hidden = false;
    button.addEventListener("click", () => {
      const target = rendered() === "dark" ? "light" : "dark";
      const system = systemDark.matches ? "dark" : "light";
      // Matching the system means the user is undoing their override.
      const stored = target === system ? null : target;
      write(stored);
      apply(stored);
    });

    // Keep other open tabs in sync.
    addEventListener("storage", (event) => {
      if (event.key === KEY || event.key === null) apply(read());
    });
  }

  for (const el of document.querySelectorAll("[data-year]")) {
    el.textContent = String(new Date().getFullYear());
  }
})();
