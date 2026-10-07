import { model, Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: {
      type: String,
      enum: ['running', 'walking', 'cycling', 'strength training'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    points: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, required: true },
    notes: { type: String, trim: true },
  },
  { timestamps: true },
);

activitySchema.index({ user: 1, activityType: 1, completedAt: 1 }, { unique: true });

export default model('Activity', activitySchema);
