# giathanh.github.io

Personal site of Chau Lai Gia Thanh: <https://giathanh.github.io/>

Plain HTML, CSS and a few lines of JavaScript. No framework, no build step, no dependencies.

## Run locally

Any static file server works. With Python:

```bash
python3 -m http.server 4321
```

Then open <http://localhost:4321/>. Use a server rather than opening `index.html` directly, because asset paths are root-relative (`/assets/...`).

## Structure

```
index.html            single-page site (hero, about, projects, stack, contact)
404.html              GitHub Pages "not found" page
assets/css/main.css   all styles; design tokens at the top
assets/js/main.js     light/dark toggle and footer year
assets/img/           favicon.svg, app icons, Open Graph image, project art
favicon.ico           32x32 fallback icon
site.webmanifest      icons and colors for "Add to Home Screen"
robots.txt            allows all crawlers, points to the sitemap
sitemap.xml           single URL; update <lastmod> when content changes
.nojekyll             serve files as-is (skip Jekyll processing)
```

## Editing

- **Content** lives in `index.html`. Each project is one `<li class="project">` in the Projects section; copy one to add a project.
- **Colors** are defined once at the top of `main.css` as light (`*-l`) and dark (`*-d`) values, then resolved with `light-dark()`.
- **Dark mode** follows the system by default. The header button overrides it for this site only and stores the choice in `localStorage`; clicking back to the system scheme clears the override.
- **Open Graph image** (`assets/img/og-image.png`, 1200×630) is a static PNG. If the name or role changes, regenerate it, for example by screenshotting an HTML template with headless Chrome:

  ```bash
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --window-size=1200,630 --screenshot=og-image.png og.html
  ```

- Placeholders are marked in the HTML with `TODO(placeholder)` comments:

  ```bash
  grep -n "TODO(placeholder)" index.html
  ```

## Deploy

GitHub Pages publishes the `master` branch root ("Deploy from a branch"). Merging into `master` and pushing is all it takes; the site updates within a minute or two.
