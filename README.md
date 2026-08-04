# DevConnector

Social network for developers. Backend API built with Node.js, Express, and MongoDB Atlas.

## What's set up so far

- Express server on port `5000` with a root health route (`GET /` → `API Running`)
- MongoDB Atlas connection via Mongoose (`config/db.js`)
- Secrets loaded from `.env` with `dotenv` (not committed to Git)
- `.env.sample` as a template for local setup
- Nodemon for local development (`npm run server`)
- DNS override for Atlas `mongodb+srv` SRV lookups on this Windows/Node setup

## Project structure

```
dev-connector/
├── config/
│   └── db.js           # MongoDB connection
├── .env                # Local secrets (gitignored)
├── .env.sample         # Env template (safe to commit)
├── .gitignore
├── package.json
├── server.js           # Express app entry
└── README.md
```

## Prerequisites

- Node.js
- A MongoDB Atlas cluster and database user
- Atlas **Network Access** allowing your IP (or `0.0.0.0/0` for local testing)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create your env file:

```bash
cp .env.sample .env
```

3. Set `MONGO_URI` in `.env` to your Atlas connection string:

```env
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?appName=DevConnector
```

URL-encode special characters in the password (`@`, `#`, `/`, etc.).

4. Start the server:

```bash
npm run server
```

You should see:

```text
Server started on port 5000
MongoDB Connected...
```

Then open [http://localhost:5000](http://localhost:5000).

## Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `node server` | Run once (production-style) |
| `server` | `nodemon server` | Auto-restart on file changes |

## Dependencies (current)

**Runtime**

| Package | Purpose |
|---------|---------|
| `express` | HTTP API framework |
| `mongoose` | MongoDB ODM |
| `dotenv` | Load `.env` into `process.env` |
| `bcryptjs` | Password hashing (planned auth) |
| `jsonwebtoken` | JWT auth (planned) |
| `express-validator` | Request validation (planned) |
| `gravatar` | Avatar URLs from email (planned) |
| `request` | HTTP client (legacy; prefer `fetch`/`axios` later) |

**Dev**

| Package | Purpose |
|---------|---------|
| `nodemon` | Restart server on changes |
| `concurrently` | Run multiple processes together (e.g. API + client later) |

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URI` | Yes | MongoDB Atlas connection string |
| `PORT` | No | Server port (default `5000`) |

Never commit `.env`. Only `.env.sample` (keys, no values) should be in Git.

## Notes

### Secrets

MongoDB credentials live only in `.env`. If a connection string was ever committed earlier, rotate the Atlas database user password and update `.env`.

### DNS (`querySrv ECONNREFUSED`)

On some Windows setups, Node’s DNS resolver uses `127.0.0.1` and fails Atlas SRV lookups for `mongodb+srv://...`, even when system DNS works.

`config/db.js` forces public DNS for the process:

```js
dns.setServers(['8.8.8.8', '1.1.1.1']);
```

If you later switch to Atlas’s standard `mongodb://...` URI (no SRV), this override may not be needed.

## Author

Akshai T R
