import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a template name'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['professional', 'creative', 'minimal', 'photography', 'developer', 'business'],
    },
    thumbnail: {
      type: String,
      required: true,
    },
    previewUrl: {
      type: String,
    },
    theme: {
      type: String,
      enum: ['modern', 'minimal', 'creative', 'professional'],
      default: 'modern',
    },
    defaultSections: [{
      type: {
        type: String,
        enum: ['project', 'image', 'video', 'blog'],
      },
      order: Number,
      content: mongoose.Schema.Types.Mixed,
    }],
    isPremium: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Template', templateSchema);
