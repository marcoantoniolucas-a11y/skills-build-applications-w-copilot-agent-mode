import express from 'express';
import type { ErrorRequestHandler } from 'express';
import Activity from './models/Activity';
import Leaderboard from './models/Leaderboard';
import Team from './models/Team';
import User from './models/User';
import Workout from './models/Workout';
import { connectDatabase } from './config/database';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
]);

export const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use((request, response, next) => {
  const origin = request.get('origin');
  response.vary('Origin');

  if (origin && allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  if (request.method === 'OPTIONS' && origin && allowedOrigins.has(origin)) {
    response.sendStatus(204);
    return;
  }

  next();
});

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/users/', async (_request, response) => {
  const users = await User.find().sort({ name: 1 }).lean();
  response.json(users);
});

app.get('/api/teams/', async (_request, response) => {
  const teams = await Team.find().sort({ name: 1 }).lean();
  response.json(teams);
});

app.get('/api/activities/', async (_request, response) => {
  const activities = await Activity.find().sort({ completedAt: -1 }).lean();
  response.json(activities);
});

app.get('/api/leaderboard/', async (_request, response) => {
  const leaderboard = await Leaderboard.find().sort({ period: -1, rank: 1 }).lean();
  response.json(leaderboard);
});

app.get('/api/workouts/', async (_request, response) => {
  const workouts = await Workout.find().sort({ name: 1 }).lean();
  response.json(workouts);
});

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
};

app.use(errorHandler);

async function startServer() {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`OctoFit API listening at ${baseUrl}`);
  });
}

void startServer().catch((error: unknown) => {
  console.error('Unable to start OctoFit API:', error);
  process.exitCode = 1;
});
