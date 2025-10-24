import User from '../models/User.js';
import Portfolio from '../models/Portfolio.js';
import Template from '../models/Template.js';
import { paginate } from '../utils/helpers.js';

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPortfolios = await Portfolio.countDocuments();
    const totalTemplates = await Template.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const featuredPortfolios = await Portfolio.countDocuments({ isFeatured: true });

    // Get recent users
    const recentUsers = await User.find()
      .sort('-createdAt')
      .limit(5)
      .select('name email createdAt');

    // Get recent portfolios
    const recentPortfolios = await Portfolio.find()
      .sort('-createdAt')
      .limit(5)
      .populate('user', 'name email')
      .select('name user createdAt views');

    // Get popular portfolios
    const popularPortfolios = await Portfolio.find()
      .sort('-views')
      .limit(5)
      .populate('user', 'name email')
      .select('name user views');

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalPortfolios,
          totalTemplates,
          activeUsers,
          featuredPortfolios,
        },
        recentUsers,
        recentPortfolios,
        popularPortfolios,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getUsers = async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate(req.query.page, req.query.limit);

    const users = await User.find()
      .sort('-createdAt')
      .limit(limit)
      .skip(skip);

    const total = await User.countDocuments();

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Delete user's portfolios
    await Portfolio.deleteMany({ user: req.params.id });

    await user.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all portfolios (admin)
// @route   GET /api/admin/portfolios
// @access  Private/Admin
export const getAllPortfolios = async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate(req.query.page, req.query.limit);

    const portfolios = await Portfolio.find()
      .populate('user', 'name email')
      .sort('-createdAt')
      .limit(limit)
      .skip(skip);

    const total = await Portfolio.countDocuments();

    res.status(200).json({
      success: true,
      count: portfolios.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: portfolios,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Feature/Unfeature portfolio
// @route   PUT /api/admin/portfolios/:id/feature
// @access  Private/Admin
export const featurePortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found',
      });
    }

    portfolio.isFeatured = !portfolio.isFeatured;
    await portfolio.save();

    res.status(200).json({
      success: true,
      data: portfolio,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete portfolio (admin)
// @route   DELETE /api/admin/portfolios/:id
// @access  Private/Admin
export const deletePortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found',
      });
    }

    await portfolio.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
