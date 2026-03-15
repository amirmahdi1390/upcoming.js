<div align="center">
<br />

██╗   ██╗██████╗  ██████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗ ██████╗
██║   ██║██╔══██╗██╔════╝██╔═══██╗████╗ ████║██║████╗  ██║██╔════╝
██║   ██║██████╔╝██║     ██║   ██║██╔████╔██║██║██╔██╗ ██║██║  ███╗
██║   ██║██╔═══╝ ██║     ██║   ██║██║╚██╔╝██║██║██║╚██╗██║██║   ██║
╚██████╔╝██║     ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║██║ ╚████║╚██████╔╝
 ╚═════╝ ╚═╝      ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝

```

```

### File-based routing for React + Vite. Inspired by Next.js. Built for those who love React.

<br />

[![npm version](https://img.shields.io/npm/v/upcoming.js?color=black&style=flat-square)](https://www.npmjs.com/package/upcoming.js)
[![npm downloads](https://img.shields.io/npm/dm/upcoming.js?color=black&style=flat-square)](https://www.npmjs.com/package/upcoming.js)
[![license](https://img.shields.io/npm/l/upcoming.js?color=black&style=flat-square)](https://github.com/amirmahdi390/upcoming.js/blob/main/LICENSE)
[![github](https://img.shields.io/badge/github-upcoming.js-black?style=flat-square&logo=github)](https://github.com/amirmahdi1390/upcoming.js)

<br />

</div>
---


---

---

---

---

## Why We Built This

I love Next.js's file-based routing. The idea of just creating a folder and a file and having a route automatically appear — no configuration, no imports, no `<Route>` declarations — is genuinely brilliant.

**But I don't want to use Next.js.**

I want React. I want Vite. I want the speed, the freedom, and the simplicity of a plain React project — without being forced into a full framework just to get one feature I love.

So I built **upcoming.js** — Next.js-style file routing, for React + Vite. Nothing more, nothing less.

---

## What is upcoming.js?

**upcoming.js** is a Vite plugin that watches your folder structure and automatically generates routes for React Router — no setup, no manual route declarations, no `<BrowserRouter>` wiring.

You create folders. It creates routes.

```
src/
├── page.jsx          →   /
├── about/
│   └── page.jsx      →   /about
├── blog/
│   ├── page.jsx      →   /blog
│   └── [id]/
│       └── page.jsx  →   /blog/:id
└── notfound.jsx      →   404
```

That's it. That's the whole idea.

---

## Features

* 📁 **Folder-based routing** — your file structure is your route structure
* ⚡ **Vite plugin** — zero config, plugs directly into your existing Vite setup
* 🔄 **Live route updates** — add or delete a `page.jsx` and the routes update instantly, no server restart needed
* 🔀 **Dynamic routes** — `[param]` folders become `:param` in the URL
* 🗂️ **Route groups** — `(group)` folders organize your code without affecting the URL
* 🙈 **Private folders** — `_folder` folders are completely ignored by the router
* 🚫 **404 pages** — just create `notfound.jsx` at the root of your routes folder
* 💤 **Lazy loading** — every page is automatically code-split and lazy loaded
* 🤝 **React Router powered** — all navigation, params, and hooks work exactly as you already know

---

## Installation

```bash
npm install upcoming.js
```

> **upcoming.js** will automatically install `react-router` as a dependency.
> Make sure you have `react`, `react-dom`, and `vite` already in your project.

---

## Setup

### 1. Add the plugin to `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import upcoming from 'upcoming.js'

export default defineConfig({
  plugins: [react(), upcoming()],
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router'] // (optional) for better performance
  },
  optimizeDeps: {
    include: ['react-router'] // (optional) for better performance
  }
})
```

> The `dedupe` line prevents duplicate React instances — always include it.

### 2. Replace your `src/main.jsx`

```jsx
import ReactDOM from 'react-dom/client'
import { UpcomingRouter } from 'upcoming.js/runtime'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UpcomingRouter />
)
```

Done. No `App.jsx`, no `<BrowserRouter>`, no route declarations. Just run `npm run dev`.

---

## Folder & File Conventions

### `page.jsx` — defines a route

Every route is a `page.jsx` (or `page.js`) file. The folder path becomes the URL.

```
src/page.jsx                   →  /
src/about/page.jsx             →  /about
src/settings/account/page.jsx  →  /settings/account
```

---

### `[param]` — dynamic segments

Wrap a folder name in square brackets to make it a dynamic route parameter.

```
src/blog/[id]/page.jsx         →  /blog/:id
src/shop/[category]/page.jsx   →  /shop/:category
src/user/[id]/posts/page.jsx   →  /user/:id/posts
```

Accessing the param works exactly like React Router:

```jsx
import { useParams } from 'react-router'

export default function BlogPost() {
  const { id } = useParams()
  return <h1>Post ID: {id}</h1>
}
```

---

### `(group)` — route groups

Wrap a folder name in parentheses to group routes without affecting the URL. Great for organizing by feature or layout without polluting the URL.

```
src/(auth)/login/page.jsx      →  /login
src/(auth)/signup/page.jsx     →  /signup
src/(dashboard)/home/page.jsx  →  /home
```

---

### `_folder` — private folders

Prefix a folder name with `_` to exclude it from routing entirely. Use this for shared components, utilities, or anything that lives inside your routes folder but is not a route.

```
src/_components/Navbar.jsx     →  ignored
src/_utils/helpers.js          →  ignored
src/about/page.jsx             →  /about  ✓
```

---

### `notfound.jsx` — 404 page

Place a `notfound.jsx` at the root of your routes folder to handle unmatched routes.

```
src/notfound.jsx               →  * (catches all unmatched routes)
```

```jsx
export default function NotFound() {
  return <h1>404 — Page not found</h1>
}
```

---

## Navigation

Navigation works exactly like React Router. **upcoming.js** is just an API on top of it — all hooks and components are the same.

```jsx
import { Link, useNavigate, useParams, useLocation } from 'react-router'

// Link component
<Link to="/about">About</Link>

// Programmatic navigation
const navigate = useNavigate()
navigate('/blog/123')

// Route params
const { id } = useParams()

// Current location
const location = useLocation()
```

---

## Configuration Options

```js
upcoming({
  routesDir: 'src'  // the folder to scan for routes — default is 'src'
})
```

If you use a feature-based architecture or want routes in a different folder:

```js
upcoming({
  routesDir: 'src/pages'
})
```

---

## Custom Loading State

You can pass a custom loading component that shows while lazy-loaded pages are being fetched:

```jsx
<UpcomingRouter loading={<div>Loading...</div>} />
```

---

## Full Example Structure

```
src/
├── page.jsx                     →  /
├── notfound.jsx                 →  404
├── about/
│   └── page.jsx                 →  /about
├── blog/
│   ├── page.jsx                 →  /blog
│   └── [id]/
│       └── page.jsx             →  /blog/:id
├── (auth)/
│   ├── login/
│   │   └── page.jsx             →  /login
│   └── signup/
│       └── page.jsx             →  /signup
├── shop/
│   └── [category]/
│       └── [product]/
│           └── page.jsx         →  /shop/:category/:product
└── _components/
    └── Navbar.jsx               →  ignored
```

---

## Requirements

| Dependency   | Version |
| ------------ | ------- |
| React        | ≥ 18   |
| React DOM    | ≥ 18   |
| Vite         | ≥ 4    |
| react-router | ≥ 7    |

---

## Links

* 📦 [npm](https://www.npmjs.com/package/upcoming.js)
* 🐙 [GitHub](https://github.com/amirmahdi1390/upcoming.js)

---

## License

MIT © [Amir.Mahdi Sultani](https://github.com/amirmahdi1390)

---

<div align="center">

**If upcoming.js saved you time, give it a ⭐ on [GitHub](https://github.com/amirmahdi1390/upcoming.js)**

</div>
