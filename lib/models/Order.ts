import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
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
  unitPrice: {
    type: Number,
    required: true,
    default: 200
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'cancelled'],
    default: 'pending',
    index: true
  },
  stateToken: {
    type: String,
    required: true
  },
  checkoutUrl: {
    type: String,
    required: true
  },
  waveTransactionRef: {
    type: String,
    default: null,
    index: true
  },
  customerPhone: {
    type: String,
    default: null
  },
  customerEmail: {
    type: String,
    default: null
  },
  callbackData: {
    type: mongoose.Schema.Types.Mixed,
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

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);