import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

adminSchema.methods.comparePassword = async function(password: string) {
  return bcrypt.compare(password, this.passwordHash);
};

export const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);