import mongoose from 'mongoose';

const competitionSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'ended'],
    default: 'draft'
  },
  votePrice: {
    type: Number,
    default: 200
  },
  startDate: {
    type: Date,
    default: null
  },
  endDate: {
    type: Date,
    default: null
  },
  rules: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  wavePaymentBaseUrl: {
    type: String,
    default: null
  },
  redirectUrl: {
    type: String,
    default: null
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

export const Competition = mongoose.models.Competition || mongoose.model('Competition', competitionSchema);