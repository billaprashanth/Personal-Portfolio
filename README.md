# Prashanth Billa — Portfolio v2

A redesigned, fully responsive one-page portfolio built with plain HTML, CSS, and JavaScript. No framework, no build step — deploys to Vercel as-is.

## What's in this folder

- `index.html` — the complete portfolio page: navigation, hero, about, skills, projects, freelance work, and contact
- `style.css` — all styling, including the dark technical theme, responsive layouts, animations, hover effects, and accessibility states
- `script.js` — interactive functionality including mobile navigation, active-section navigation, scroll progress, reveal animations, project filtering, animated hero chart, magnetic buttons, subtle 3D effects, and reduced-motion support
- `README.md` — this file

**Not included:** your `assets/` folder and `Sections/` folder. These should remain in your existing repository. The redesigned page reuses the existing filenames, so you do not need to modify those folders.

---

## Step 1 — Get the new files into your existing project

1. Open your local clone of `Portfolio-1` (or clone it fresh):

   ```bash
   git clone https://github.com/billaprashanth/Personal-Portfolio.git
   ```

2. Copy the three files from this folder (`index.html`, `style.css`, `script.js`) into the root of that project, **overwriting** the existing versions.

3. Leave the `assets/` and `Sections/` folders exactly as they are. The new `index.html` is designed to reuse the existing image, video, and project-page filenames.

4. The portfolio already uses your real email address:

   `prashanthbilla003@gmail.com`

   The **Hire me** button and Contact section should point to this address. If you change your email in the future, search the project for the old address and update both locations.

> **Important:** Do not remove or rename the existing `assets/` and `Sections/` folders unless you also update the corresponding paths in `index.html`.

### If an image or video looks broken

Check the filename and capitalization inside `assets/` and `Sections/`.

Vercel runs on Linux, where file paths are case-sensitive. For example:

```text
assets/MyImage.png
```

is different from:

```text
assets/myimage.png
```

Make sure the filename referenced in `index.html` matches the actual filename exactly.

---

## Step 2 — Test it locally

You do not need Node or any build tooling. This is a static HTML/CSS/JS website.

### Option 1 — Open directly

Double-click `index.html` and open it in your browser.

Most features will work normally. Some browsers may restrict local video playback or other file-based behavior. This is normal and should not occur after deployment.

### Responsive testing

Resize the browser window or use the browser's Developer Tools device toolbar.

Check:

- Desktop layout
- Tablet layout
- Mobile layout
- Hamburger navigation
- Project filters
- Project links
- Images and videos
- Contact links
- Hero animations
- Scroll animations

The navigation collapses into a mobile menu on smaller screens.

---

## Step 3 — Commit and push to GitHub

From inside the project folder:

```bash
git add .
git commit -m "First commit"
git push origin main
```

If this is a fresh clone, make sure the existing `assets/` and `Sections/` folders are present before committing.

You are keeping those folders — not replacing them.

---

## Step 4 — Deploy to Vercel

Your repository is already connected to Vercel, so pushing to the `main` branch should trigger a new deployment automatically.

Your existing portfolio URL is:

```text
https://personal-portfolio-coral-tau.vercel.app/
```

### Deployment steps

1. Push your changes to the `main` branch.
2. Open the Vercel dashboard.
3. Open the `Personal-Portfolio` project.
4. Go to **Deployments**.
5. Wait for the latest deployment to show **Ready**.
6. Open the deployment or refresh your portfolio URL.

Because this is a plain HTML/CSS/JS project, there is no framework build step required.

### If you ever need to set up Vercel from scratch

1. Sign in to Vercel with your GitHub account.
2. Select **Add New → Project**.
3. Select `billaprashanth/Personal-Portfolio`.
4. Framework preset: **Other**.
5. Leave the build command empty.
6. Leave the output directory empty.
7. Deploy.

Vercel will provide a live URL and can automatically redeploy future pushes to `main`.

---

## What changed in this redesign

### Layout

- One-page portfolio structure
- Fixed/sticky navigation
- Hero section
- About section
- Skills section
- Filterable project grid
- Freelance/project video section
- Contact section
- Footer

### Visual identity

- Dark technical/data-science aesthetic
- Navy/charcoal background
- Amber primary accent
- Teal data/AI accent
- Space Grotesk for headings
- Inter for body text
- IBM Plex Mono for technical/data-style labels

### Hero

The hero includes an animated canvas visualization inspired by a machine-learning training/loss curve.

It provides a technical visual identity without relying on a generic gradient or stock illustration.

### Interactions and animations

The updated JavaScript adds:

- Smooth navigation behavior
- Mobile hamburger navigation
- Active navigation section detection
- Scroll progress indicator
- Scroll-triggered reveal animations
- Project filtering animations
- Animated ML signal/chart
- Mouse-follow ambient glow
- Subtle 3D hero-card tilt
- Magnetic button interaction
- Keyboard accessibility behavior
- Reduced-motion support

No animation library is required.

### Projects

Projects can be filtered by category:

- Data Science
- SQL
- Web Development

Project cards use:

```html
<article class="project-card" data-cat="ds"></article>
```

Available category values are:

```text
ds
sql
web
```

To add another project, copy an existing project card and update:

- Image
- Project title
- Description
- Technology stack
- Project link
- `data-cat`

Example:

```html
<article class="project-card" data-cat="web"></article>
```

---

## No dependencies

This portfolio does **not** require:

- npm install
- React
- Next.js
- Vite
- Webpack
- Node.js
- A CSS framework
- A JavaScript framework

It is simply:

```text
HTML
CSS
JavaScript
```

That makes it easy to run locally and deploy directly to Vercel.

---

## Existing project assets

The redesign intentionally keeps the existing repository structure.

Do not move these folders:

```text
assets/
Sections/
```

The existing project pages and media can continue to be referenced by the new portfolio.

If you add new assets, keep the paths organized and make sure their filenames match the references in `index.html`.

---

## Optional — Add a résumé download

If you have a résumé PDF, place it here:

```text
assets/resume.pdf
```

Then add a link such as:

```html
<a href="assets/resume.pdf" class="btn btn-line" target="_blank" rel="noopener">
  Download résumé
</a>
```

A résumé button can be placed beside the primary hero CTA.

---

## Before pushing to GitHub

Use this checklist:

- [ ] `index.html` updated
- [ ] `style.css` updated
- [ ] `script.js` updated
- [ ] `README.md` updated
- [ ] `assets/` folder preserved
- [ ] `Sections/` folder preserved
- [ ] Email address is correct
- [ ] LinkedIn link works
- [ ] GitHub link works
- [ ] Project links work
- [ ] Images load correctly
- [ ] Videos load correctly
- [ ] Mobile navigation works
- [ ] Project filters work
- [ ] Desktop layout checked
- [ ] Mobile layout checked
- [ ] No broken links in browser console

---

## Git commands — quick version

```bash
git add .
git commit -m "First Commit"
git push origin main
```

After the push completes, Vercel should automatically create a new deployment for the `main` branch.

---

## Portfolio

**GitHub:**  
https://github.com/billaprashanth

**LinkedIn:**  
https://www.linkedin.com/in/prashanth-billa-566020348/

**Email:**  
prashanthbilla003@gmail.com

**Live Portfolio:**  
https://personal-portfolio-coral-tau.vercel.app/
