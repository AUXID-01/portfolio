import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['project', 'image', 'video', 'blog'],
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  content: {
    title: String,
    description: String,
    link: String,
    image: String,
    images: [String],
    url: String,
    content: String,
  },
});

const portfolioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide a portfolio name'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      default: '',
    },
    theme: {
      type: String,
      enum: ['modern', 'minimal', 'creative', 'professional'],
      default: 'modern',
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
    },
    sections: [sectionSchema],
    isPublic: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    customCSS: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug before saving
portfolioSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now();
  }
  next();
});

export default mongoose.model('Portfolio', portfolioSchema);
