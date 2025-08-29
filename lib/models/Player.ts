import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  competitionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competition',
    required: true,
    index: true
  },
  slug: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  team: {
    type: String,
    default: ''
  },
  position: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  photoUrl: {
    type: String,
    default: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
  },
  votesConfirmed: {
    type: Number,
    default: 0,
    index: true
  },
  votesPending: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index composé pour slug unique par compétition
playerSchema.index({ competitionId: 1, slug: 1 }, { unique: true });

export const Player = mongoose.models.Player || mongoose.model('Player', playerSchema);