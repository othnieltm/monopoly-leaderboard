# House Rules Monopoly Leaderboard

A small weekly Monopoly leaderboard with 3 points for first place, 2 for second, and 1 for third.

## Run locally

Requires Node.js 18 or newer.

```sh
npm start
```

Open `http://localhost:3000` in a browser. Weekly results are stored in `data.json` through the `/api/state` endpoint.

## Deploy

Deploy this folder to any Node.js host with a persistent filesystem (for example, Render with a persistent disk, Railway, Fly.io, or your own server). Set the start command to `npm start`. The app listens on the host-provided `PORT` value.

A purely static host cannot save changes back to a JSON file. If deploying to Vercel, replace the file storage with a database or Vercel Blob/KV because serverless filesystem changes are not persistent.

## Data

`data.json` is intentionally kept outside the HTML. Back it up with the rest of the project before deploying updates.
