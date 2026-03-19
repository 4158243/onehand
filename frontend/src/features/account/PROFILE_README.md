# Profile page – if you only see "Profile" + one bio field

The full Profile page in code includes:
- Blue gradient bar at top
- Large circular avatar (photo or initial)
- Your name + Verified badge + **Edit profile** button
- Email and wallet
- About (bio in a light box)
- Activity card

If your browser shows only a "Profile" heading and one "my bio" input, the app is loading an **old cached bundle**.

**Do this:**
1. Stop the dev server (Ctrl+C).
2. Delete folder: `frontend/node_modules/.vite`
3. Run again: `npm run dev`
4. Open **Incognito/Private** window and go to `http://localhost:5173/profile`
   - Or: normal window → DevTools (F12) → Application → Clear storage → Clear site data, then hard refresh (Ctrl+Shift+R)

When the correct code loads you'll see the subtitle: **"View & edit your info · Photo, name, bio"** under the "Profile" title.
