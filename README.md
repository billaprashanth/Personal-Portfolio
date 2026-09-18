# Prashanth Billa — Portfolio v2

A redesigned, fully responsive one-page portfolio. Plain HTML/CSS/JS — no build
step, no framework, deploys to Vercel as-is.

## What's in this folder

- `index.html` — the whole page (nav, hero, about, skills, projects, freelance, contact)
- `style.css` — all styles, dark technical theme, fully responsive
- `script.js` — mobile nav toggle, project filtering, the animated hero chart
- `README.md` — this file

**Not included:** your `assets/` folder and `Sections/` folder. You already have
these in your existing repo — this redesign reuses the exact same filenames, so
you don't need to touch them.

---

## Step 1 — Get the new files into your existing project

1. Open your local clone of `Portfolio-1` (or clone it fresh: `git clone https://github.com/billaprashanth/Portfolio-1.git`).
2. Copy the three files from this folder (`index.html`, `style.css`, `script.js`)
   into the root of that project, **overwriting** the old `index.html` and
   `style.css`.
3. Leave the `assets/` and `Sections/` folders exactly as they are — the new
   `index.html` points at the same image, video and project-page filenames
   your old site used, so everything keeps working without edits.
4. Double check one thing: open the new `index.html` and confirm the `Hire me`
   button and the Contact section point at your real email — right now both
   say `prashanth@example.com` as a placeholder. Search for that string and
   replace it with your actual address.

If any image looks broken once it's live, it just means that filename in
`assets/` differs slightly from what's referenced in `index.html` (case
matters on Vercel's Linux servers, even though it may not on Windows) —
rename the file or the reference to match.

## Step 2 — Test it locally (optional but recommended)

You don't need Node or any tooling for this — it's static HTML.

- **Easiest:** just double-click `index.html` to open it in a browser. Nearly
  everything will work; the browser's file-security rules can occasionally
  block local video playback, which is normal and won't happen once it's hosted.
- **More accurate:** if you have Python installed, run this from the project
  folder and open `http://localhost:8000`:
  ```bash
  python -m http.server 8000
  ```
- **If you have Node:** `npx serve .` does the same thing.

Resize the browser window (or open dev tools' device toolbar) to check the
mobile layout — the nav collapses into a hamburger menu under 720px wide.

## Step 3 — Commit and push to GitHub

From inside the project folder:

```bash
git add .
git commit -m "Redesign portfolio: responsive dark theme, project filtering, animated hero"
git push origin main
```

If this is a fresh clone instead of your existing folder, make sure the
`assets/` and `Sections/` folders came along with the clone before you commit
— you're not re-adding them, just keeping them.

## Step 4 — Deploy to Vercel

Your repo is already connected to Vercel (that's how `portfolio-1-gray.vercel.app`
exists). Vercel watches your `main` branch, so:

1. Pushing to `main` (Step 3) automatically triggers a new deployment —
   nothing else to configure, since this is a static site with no build
   command needed.
2. Go to [vercel.com/dashboard](https://vercel.com/dashboard), open the
   `Portfolio-1` project, and watch the **Deployments** tab — you'll see a new
   deployment building within a few seconds of the push.
3. Once it says **Ready**, click it (or just refresh
   `https://portfolio-1-gray.vercel.app/`) to see it live.

### If you ever need to set it up from scratch on Vercel

1. Sign in at [vercel.com](https://vercel.com) with your GitHub account.
2. Click **Add New → Project**, select `billaprashanth/Portfolio-1`.
3. Framework preset: choose **Other** (it's plain HTML/CSS/JS — no build
   command, no output directory needed).
4. Click **Deploy**. Vercel gives you a live URL immediately, and redeploys
   automatically on every future push to `main`.

## What changed in this redesign, at a glance

- **Layout:** hero, about, skills, filterable project grid, freelance videos,
  contact — all on one scrollable page with a fixed nav.
- **Visual identity:** dark navy background, one amber accent color used
  deliberately (buttons, active states, the hero chart line), IBM Plex Mono
  for small data-style labels (stats, tags, stack names) since that fits a
  data-science portfolio.
- **Hero:** an animated canvas plot shaped like a training-loss curve —
  a nod to the subject matter instead of a generic gradient blob.
- **Projects:** filterable by Data science / SQL / Web development instead of
  one long undifferentiated list.
- **Responsive:** the whole page reflows down to a single column on mobile,
  with a proper hamburger menu; motion is disabled for anyone with "reduce
  motion" turned on at the OS level.
- **No dependencies:** no npm install, no build step — same as your original
  setup, so Vercel deploys it instantly.

## Personalizing it further

- Swap the placeholder email in two spots (`Hire me` in the nav, and the
  Contact section).
- If you have a résumé PDF, drop it in as `assets/resume.pdf` and add a
  "Download résumé" link next to the "Start a project" button in the hero.
- The project grid pulls from the `<article class="project-card" data-cat="...">`
  blocks in `index.html` — to add a new project, copy one block, change the
  image, title, tech stack, link, and `data-cat` (`ds`, `sql`, or `web`).
