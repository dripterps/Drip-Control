# Drip Control

Your streaming control center for TikTok LIVE drops. First module: **Bags Left Tracker**.

- **Admin dashboard** — password-protected (real Firebase sign-in), fully functional counter with realtime auto-save.
- **Public overlay** — a transparent page for TikTok LIVE Studio's Link Source that updates instantly, on any device, the moment you change something on the dashboard.
- Built with **React + Vite**, **Tailwind CSS**, and **Firebase** (Auth + Firestore).

This file covers running the project locally. For putting it online, see **DEPLOYMENT.md**.

## 1. Install

You need [Node.js](https://nodejs.org) (v18 or newer) installed. Then, in this folder:

```bash
npm install
```

## 2. Connect it to your Firebase project

1. Copy `.env.example` to a new file called `.env`.
2. Fill in the six `VITE_FIREBASE_...` values. You get these from the Firebase console after creating a project — full step-by-step instructions are in **DEPLOYMENT.md**.

## 3. Create your admin login

This app uses **Firebase Authentication** (email + password) instead of a hardcoded password, so it's safe to put the code and even the overlay link in public. To create your one admin account:

1. In the [Firebase console](https://console.firebase.google.com), open your project.
2. Go to **Build → Authentication → Sign-in method**, and enable **Email/Password**.
3. Go to the **Users** tab → **Add user** → enter the email and password you want to sign in with.

That's it — no signup screen in the app itself, since it's just you.

## 4. Run it locally

```bash
npm run dev
```

- Dashboard: the URL Vite prints (e.g. `http://localhost:5173`)
- Overlay only: same URL + `/overlay.html` (e.g. `http://localhost:5173/overlay.html`)

Open both in two browser windows side by side — change something on the dashboard and watch the overlay update instantly.

## How it's organized

```
src/
  App.jsx              the admin dashboard (sign-in + tabs)
  OverlayApp.jsx        the standalone overlay page
  firebase.js            Firebase project setup
  hooks/
    useAuth.js            sign-in / sign-out
    useDripState.js       realtime Firestore read + write
  lib/constants.js         shared colors, sizes, and the "status" logic
  components/               the UI pieces (buttons, cards, the meter, etc.)
```

Everything reads and writes one Firestore document: `state/bagsTracker`. That's intentionally simple — future modules can each get their own document the same way, which is why the tab bar already has a "More modules soon" placeholder.

## Security model

- Anyone with the overlay link can **read** the bag count (that's what makes the overlay work without asking viewers to sign in).
- Only you, signed in through the dashboard, can **write** changes.
- This is enforced by `firestore.rules`, not by hiding the link — treat the overlay URL as shareable, but keep your dashboard password private.
