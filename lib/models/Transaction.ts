import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
    index: true
  },
  competitionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competition',
    required: true,
    index: true
  },
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
    index: true
  },
  transactionRef: {
    type: String,
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['submitted', 'confirmed', 'rejected', 'auto_confirmed'],
    default: 'submitted'
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'XOF'
  },
  provider: {
    type: String,
    default: 'WAVE'
  },
  source: {
    type: String,
    enum: ['callback', 'user_input', 'admin', 'api_verification'],
    required: true
  },
  raw: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  validatedAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);