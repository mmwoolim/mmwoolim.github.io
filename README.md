# minwoolim.github.io

Personal site for **Minwoo Lim** — founder, investor, behavioural fintech. Static HTML/CSS/JS,
no build step, no dependencies. Deploys straight to GitHub Pages.

## Files

```
index.html            the whole page
assets/styles.css     design system + all layout
assets/main.js        theme toggle, mobile nav, contact dialog, scroll reveal, nav spy
assets/portrait.jpg   hero portrait (1000×1250)
assets/portrait-sm.jpg  small variant served to phones via srcset
assets/og.jpg         1200×630 link-preview card
assets/avatar.jpg     square crop, used as the apple-touch-icon
assets/Minwoo-Lim-CV.pdf  linked from the "Curriculum Vitae" button in the contact block
favicon.svg           ML monogram
.nojekyll             only matters if you switch to branch-based deploys; the
                      Actions workflow serves files as-is and strips dotfiles
robots.txt
.github/workflows/static.yml   publishes on every push to main
```

## Publish

Deploys to **github.com/mmwoolim/mmwoolim.github.io** → live at **https://mmwoolim.github.io/**

Deployment runs through GitHub Actions ([`.github/workflows/static.yml`](.github/workflows/static.yml)),
so every push to `main` republishes the site. There is no build step — the workflow uploads the
repo root as-is.

**One-time setup:** repo → **Settings → Pages → Source: GitHub Actions**.

Then:

```bash
git remote add origin https://github.com/mmwoolim/mmwoolim.github.io.git
git push -u origin main
```

Watch the run under the **Actions** tab; the site is live about a minute after it goes green.
You can also republish without a commit via **Actions → Deploy static content to Pages → Run workflow**.

### Absolute URLs

Six URLs in `index.html` are absolute because link previews need them: `<link rel="canonical">`,
`og:image`, `og:url`, `twitter:image`, and the `url` / `image` fields in the JSON-LD block. They
all point at `https://mmwoolim.github.io/`. Update them if the site ever moves.

### Custom domain

Add a `CNAME` file containing just the domain (e.g. `minwoolim.com`), point a DNS `CNAME`
record at `<username>.github.io`, then set the domain under Settings → Pages.

To swap the CV later, overwrite `assets/Minwoo-Lim-CV.pdf` — the filename is what the button
links to, so keeping the name means nothing else needs to change.

## Notes

- Light and dark themes both ship. It follows the OS by default; the header toggle overrides
  and remembers the choice in `localStorage`.
- Fonts are Instrument Serif + Inter from Google Fonts, with Georgia / system-sans fallbacks.
- All six press links were verified live. The Private Trading Club card links to
  `pnlapp.co/#community` because `pnlapp.co/privatetradingclub` returns 404.
- Phone number and date of birth from the CV are deliberately left off a public page.
  Add them to the contact block if you want them there.
