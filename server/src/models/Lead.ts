import mongoose, { Schema } from 'mongoose';
import { LeadStatus, LeadSource } from '../types';

const leadSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(LeadStatus),
    default: LeadStatus.New,
  },
  source: {
    type: String,
    enum: Object.values(LeadSource),
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

leadSchema.index({ createdBy: 1 });
leadSchema.index({ status: 1 });

export const Lead = mongoose.model('Lead', leadSchema);