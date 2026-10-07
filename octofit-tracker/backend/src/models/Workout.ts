import { model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    activityType: {
      type: String,
      enum: ['running', 'walking', 'cycling', 'strength training'],
      required: true,
    },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    target: { type: String, required: true, trim: true },
    tips: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

export default model('Workout', workoutSchema);
