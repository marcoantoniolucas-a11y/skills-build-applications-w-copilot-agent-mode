# OctoFit Tracker frontend

The presentation tier is a React 19 application built with Vite. It uses
React Router for navigation and Bootstrap for styling.

## API configuration

In GitHub Codespaces, define `VITE_CODESPACE_NAME` in
`octofit-tracker/frontend/.env.local` before starting Vite:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

This value is required in Codespaces so the frontend can reach the API at
`https://<VITE_CODESPACE_NAME>-8000.app.github.dev/api`. Vite reads `.env.local`
when it starts, so restart the frontend after changing the value. Do not add
`.env.local` to version control.

When `VITE_CODESPACE_NAME` is unset (for example, during local development),
the frontend safely uses `http://localhost:8000/api`.

The app reads the activities, leaderboard, teams, users, and workouts
collections from their corresponding `/api/<collection>/` endpoints. Both
plain array responses and paginated responses containing `results`, `items`, or
`data` arrays are supported.
