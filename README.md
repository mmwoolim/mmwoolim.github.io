# minwoolim.github.io

Personal site for **Minwoo Lim** — founder, investor, behavioural fintech. Static HTML/CSS/JS,
no build step, no dependencies. Deploys straight to GitHub Pages.

## Files

```
index.html            the whole page
assets/styles.css     design system + all layout
assets/main.js        theme toggle, mobile nav, scroll reveal, active-nav spy
assets/portrait.jpg   hero portrait (1000×1250)
assets/portrait-sm.jpg  small variant served to phones via srcset
assets/og.jpg         1200×630 link-preview card
assets/avatar.jpg     square crop, used as the apple-touch-icon
assets/Minwoo-Lim-CV.pdf  linked from the "Curriculum Vitae" button in the contact block
favicon.svg           ML monogram
.nojekyll             tells Pages to serve the files as-is
robots.txt
```

## Publish

```bash
git add -A
git commit -m "Personal site"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
git push -u origin main
```

Then **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.

The site is live at `https://<your-username>.github.io/` about a minute later.

### If the repo is *not* named `<username>.github.io`

The site will live at `https://<username>.github.io/<repo-name>/`. All asset paths are already
relative, so it works — but update the absolute URLs in `index.html` so link previews resolve:
`<link rel="canonical">`, the four `og:*` / `twitter:image` tags, and the `url` / `image`
fields in the JSON-LD block near the top of the file.

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
