import mongoose from 'mongoose';

/**
 * Version Schema
 * Stores audit trail entries for text changes
 */
const versionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    timestamp: {
      type: String,
      required: true,
    },
    addedWords: {
      type: [String],
      default: [],
    },
    removedWords: {
      type: [String],
      default: [],
    },
    oldLength: {
      type: Number,
      required: true,
    },
    newLength: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
versionSchema.index({ timestamp: -1 });

const Version = mongoose.model('Version', versionSchema);

export default Version;

