import Template from '../models/Template.js';
import { paginate } from '../utils/helpers.js';

// @desc    Get all templates
// @route   GET /api/templates
// @access  Public
export const getTemplates = async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate(req.query.page, req.query.limit);
    const { category, isPremium } = req.query;

    const filter = { isActive: true };
    if (category) filter.category = category;
    if (isPremium !== undefined) filter.isPremium = isPremium === 'true';

    const templates = await Template.find(filter)
      .sort('-createdAt')
      .limit(limit)
      .skip(skip);

    const total = await Template.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: templates.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: templates,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single template
// @route   GET /api/templates/:id
// @access  Public
export const getTemplate = async (req, res, next) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found',
      });
    }

    res.status(200).json({
      success: true,
      data: template,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create template
// @route   POST /api/templates
// @access  Private/Admin
export const createTemplate = async (req, res, next) => {
  try {
    const template = await Template.create(req.body);

    res.status(201).json({
      success: true,
      data: template,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update template
// @route   PUT /api/templates/:id
// @access  Private/Admin
export const updateTemplate = async (req, res, next) => {
  try {
    const template = await Template.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found',
      });
    }

    res.status(200).json({
      success: true,
      data: template,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete template
// @route   DELETE /api/templates/:id
// @access  Private/Admin
export const deleteTemplate = async (req, res, next) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found',
      });
    }

    await template.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Increment template usage
// @route   POST /api/templates/:id/use
// @access  Private
export const useTemplate = async (req, res, next) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found',
      });
    }

    template.usageCount += 1;
    await template.save();

    res.status(200).json({
      success: true,
      data: template,
    });
  } catch (error) {
    next(error);
  }
};