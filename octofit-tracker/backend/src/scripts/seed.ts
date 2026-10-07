import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';
import { connectDatabase } from '../config/database';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  let connected = false;

  try {
    await connectDatabase();
    connected = true;

    const usersToSeed = [
      { name: 'Maya Chen', username: 'maya-chen', email: 'maya@example.test', age: 16 },
      { name: 'Leo Martinez', username: 'leo-martinez', email: 'leo@example.test', age: 15 },
      { name: 'Ava Patel', username: 'ava-patel', email: 'ava@example.test', age: 17 },
      { name: 'Noah Kim', username: 'noah-kim', email: 'noah@example.test', age: 16 },
    ];
    for (const user of usersToSeed) {
      const existingUser = await User.findOne({ email: user.email });
      if (existingUser) {
        existingUser.set(user);
        await existingUser.save();
      } else {
        await User.create(user);
      }
    }
    const users = await User.find({ email: { $in: usersToSeed.map((user) => user.email) } });
    const usersByEmail = new Map(users.map((user) => [user.email, user]));
    const maya = usersByEmail.get('maya@example.test');
    const leo = usersByEmail.get('leo@example.test');
    const ava = usersByEmail.get('ava@example.test');
    const noah = usersByEmail.get('noah@example.test');
    if (!maya || !leo || !ava || !noah) {
      throw new Error('Unable to load seeded users after upserting them');
    }

    const teamsToSeed = [
      {
        name: 'Swift Octopuses',
        description: 'A running and walking team focused on steady progress.',
        members: [maya._id, leo._id],
        points: 245,
      },
      {
        name: 'Coral Crushers',
        description: 'A strength and cycling team that trains together.',
        members: [ava._id, noah._id],
        points: 230,
      },
    ];
    for (const team of teamsToSeed) {
      const existingTeam = await Team.findOne({ name: team.name });
      if (existingTeam) {
        existingTeam.set(team);
        await existingTeam.save();
      } else {
        await Team.create(team);
      }
    }
    const teams = await Team.find({ name: { $in: teamsToSeed.map((team) => team.name) } });
    const swiftOctopuses = teams.find((team) => team.name === 'Swift Octopuses');
    const coralCrushers = teams.find((team) => team.name === 'Coral Crushers');
    if (!swiftOctopuses || !coralCrushers) {
      throw new Error('Unable to load seeded teams after upserting them');
    }

    await User.bulkWrite([
      { updateOne: { filter: { _id: maya._id }, update: { $set: { team: swiftOctopuses._id } } } },
      { updateOne: { filter: { _id: leo._id }, update: { $set: { team: swiftOctopuses._id } } } },
      { updateOne: { filter: { _id: ava._id }, update: { $set: { team: coralCrushers._id } } } },
      { updateOne: { filter: { _id: noah._id }, update: { $set: { team: coralCrushers._id } } } },
    ]);

    const activitiesToSeed = [
      {
        user: maya._id,
        activityType: 'running' as const,
        durationMinutes: 28,
        distanceKm: 4.2,
        points: 55,
        completedAt: new Date('2026-10-01T16:00:00.000Z'),
        notes: 'Easy loop after school',
      },
      {
        user: leo._id,
        activityType: 'walking' as const,
        durationMinutes: 35,
        distanceKm: 2.8,
        points: 40,
        completedAt: new Date('2026-10-02T16:00:00.000Z'),
        notes: 'Brisk walk with a teammate',
      },
      {
        user: ava._id,
        activityType: 'cycling' as const,
        durationMinutes: 42,
        distanceKm: 11,
        points: 65,
        completedAt: new Date('2026-10-03T16:00:00.000Z'),
        notes: 'Neighborhood cycling route',
      },
      {
        user: noah._id,
        activityType: 'strength training' as const,
        durationMinutes: 30,
        points: 60,
        completedAt: new Date('2026-10-04T16:00:00.000Z'),
        notes: 'Bodyweight circuit',
      },
      {
        user: maya._id,
        activityType: 'walking' as const,
        durationMinutes: 25,
        distanceKm: 2.1,
        points: 35,
        completedAt: new Date('2026-10-05T16:00:00.000Z'),
        notes: 'Recovery walk',
      },
    ];
    for (const activity of activitiesToSeed) {
      const activityFilter = {
        user: activity.user,
        activityType: activity.activityType,
        completedAt: activity.completedAt,
      };
      const existingActivity = await Activity.findOne(activityFilter);
      if (existingActivity) {
        existingActivity.set(activity);
        await existingActivity.save();
      } else {
        await Activity.create(activity);
      }
    }

    const leaderboardToSeed = [
      { user: maya._id, team: swiftOctopuses._id, period: '2026-10', points: 90, rank: 1 },
      { user: ava._id, team: coralCrushers._id, period: '2026-10', points: 65, rank: 2 },
      { user: noah._id, team: coralCrushers._id, period: '2026-10', points: 60, rank: 3 },
      { user: leo._id, team: swiftOctopuses._id, period: '2026-10', points: 40, rank: 4 },
    ];
    for (const entry of leaderboardToSeed) {
      const existingEntry = await Leaderboard.findOne({
        user: entry.user,
        period: entry.period,
      });
      if (existingEntry) {
        existingEntry.set(entry);
        await existingEntry.save();
      } else {
        await Leaderboard.create(entry);
      }
    }

    const workoutsToSeed = [
      {
        name: 'After-School Easy Run',
        description: 'A relaxed run with a comfortable pace and a short cool-down walk.',
        activityType: 'running' as const,
        difficulty: 'beginner' as const,
        durationMinutes: 25,
        target: 'Build a consistent running habit',
        tips: ['Start at a conversational pace', 'Walk if you need a recovery break'],
      },
      {
        name: 'Power Walk Intervals',
        description: 'Alternate brisk walking with easy recovery periods.',
        activityType: 'walking' as const,
        difficulty: 'beginner' as const,
        durationMinutes: 30,
        target: 'Improve cardiovascular endurance',
        tips: ['Keep your shoulders relaxed', 'Use a safe, familiar route'],
      },
      {
        name: 'Bodyweight Strength Circuit',
        description: 'A full-body circuit using controlled, equipment-free movements.',
        activityType: 'strength training' as const,
        difficulty: 'intermediate' as const,
        durationMinutes: 20,
        target: 'Practice safe bodyweight strength exercises',
        tips: ['Focus on good form', 'Rest between rounds when needed'],
      },
      {
        name: 'Neighborhood Bike Ride',
        description: 'A steady ride on a safe route with time to recover.',
        activityType: 'cycling' as const,
        difficulty: 'intermediate' as const,
        durationMinutes: 35,
        target: 'Build cycling stamina',
        tips: ['Wear a helmet', 'Check your route and bike before starting'],
      },
    ];
    for (const workout of workoutsToSeed) {
      const existingWorkout = await Workout.findOne({ name: workout.name });
      if (existingWorkout) {
        existingWorkout.set(workout);
        await existingWorkout.save();
      } else {
        await Workout.create(workout);
      }
    }

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    if (connected) {
      await mongoose.disconnect();
    }
  }
}

void seedDatabase();
