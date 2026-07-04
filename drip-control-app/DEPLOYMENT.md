# Deployment Guide

Step-by-step, assuming you haven't done this before. Three parts:

1. Set up Firebase (your database + login)
2. Deploy the app to Vercel (free hosting)
3. Add the overlay to TikTok LIVE Studio

---

## Part 1 — Firebase setup

### 1.1 Create the project

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and sign in with a Google account.
2. Click **Add project**, name it something like `drip-control`, and finish the wizard (you can decline Google Analytics — you don't need it).

### 1.2 Create the Firestore database

1. In the left sidebar, go to **Build → Firestore Database**.
2. Click **Create database**.
3. Choose **Start in production mode** (safe default — we'll paste in our own rules next).
4. Pick a location close to you and click **Enable**.

### 1.3 Paste in the security rules

1. Still in Firestore, click the **Rules** tab.
2. Delete what's there and paste in the contents of this project's `firestore.rules` file.
3. **Replace `YOUR_ADMIN_EMAIL@example.com`** with the exact email you're about to create in step 1.4 below.
4. Click **Publish**.

This makes the bag count publicly readable (so the overlay works) but only writable by that one signed-in email — not just "anyone who happens to be signed in." Firebase's config is public by design (it's in your deployed site's code), so this email check is what actually keeps other people out, not secrecy.

### 1.4 Turn on Email/Password sign-in

1. Go to **Build → Authentication → Get started**.
2. Under **Sign-in method**, enable **Email/Password**.
3. Go to the **Users** tab → **Add user**. Enter the email and password you'll use to log into the dashboard. This is the *only* account that can change the bag count — there's no public sign-up screen.

### 1.5 Register a web app and get your config

1. Go to **Project settings** (gear icon, top left) → scroll to **Your apps** → click the **</>** (web) icon.
2. Give it any nickname, skip Firebase Hosting (we're using Vercel), and click **Register app**.
3. You'll see a `firebaseConfig` object with values like `apiKey`, `authDomain`, `projectId`, etc. Keep this tab open — you'll need it in the next part.

---

## Part 2 — Deploy to Vercel

### 2.1 Push the project to GitHub

If you haven't already, create a new GitHub repository and push this project's files to it. (GitHub Desktop is the easiest way if you're not comfortable with git commands.)

### 2.2 Import it into Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (you can use your GitHub account).
2. Click **Add New → Project**, and select the GitHub repo you just created.
3. Vercel will auto-detect this as a Vite project. Leave the build settings as-is:
   - Build command: `npm run build`
   - Output directory: `dist`

### 2.3 Add your Firebase config as environment variables

Before clicking Deploy, open the **Environment Variables** section and add each of these, using the matching values from your Firebase config (step 1.5):

| Name | Value comes from |
|---|---|
| `VITE_FIREBASE_API_KEY` | `apiKey` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `authDomain` |
| `VITE_FIREBASE_PROJECT_ID` | `projectId` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `storageBucket` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `messagingSenderId` |
| `VITE_FIREBASE_APP_ID` | `appId` |

Click **Deploy**. After a minute or two, you'll get a live URL like `https://drip-control-yourname.vercel.app`.

### 2.4 Authorize the domain in Firebase

Firebase blocks sign-in from domains it doesn't recognize.

1. Back in the Firebase console, go to **Authentication → Settings → Authorized domains**.
2. Click **Add domain** and paste in your Vercel domain (e.g. `drip-control-yourname.vercel.app`).

Your dashboard is now live at your Vercel URL, and your overlay is live at that same URL + `/overlay.html`.

---

## Part 3 — Add the overlay to TikTok LIVE Studio

1. Open the dashboard (your Vercel URL), sign in, go to the **Overlay** tab, and copy the **Link Source URL** (it's your Vercel URL + `/overlay.html`).
2. Open **TikTok LIVE Studio** on the computer you stream from.
3. Add a new **Link Source** (sometimes listed as "Web" or "Browser" source) to your scene.
4. Paste in the overlay URL.
5. Resize and position the source in your scene the same way you'd resize any other layer — the page background is transparent, so only the widget itself will show over your camera.

From here on, everything is live: changing the count on your dashboard (from your phone or laptop) updates the overlay on your streaming computer within a second, with no need to touch TikTok LIVE Studio again.

## Updating later

Any time you push a change to your GitHub repo, Vercel rebuilds and redeploys automatically. Your Link Source URL never changes, so you don't need to touch TikTok LIVE Studio again after the first setup.
