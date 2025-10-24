import Portfolio from '../models/Portfolio.js';
import { paginate, generateHTML } from '../utils/helpers.js';

// ==================== CRUD Operations ====================

// Get all portfolios
export const getPortfolios = async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate(req.query.page, req.query.limit);

    const query = req.user
      ? { user: req.user.id } // private for user
      : { isPublic: true };   // public access

    const portfolios = await Portfolio.find(query)
      .sort('-createdAt')
      .limit(limit)
      .skip(skip);

    const total = await Portfolio.countDocuments(query);

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

// Get single portfolio
export const getPortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id).populate('user', 'name email');

    if (!portfolio) {
      return res.status(404).json({ success: false, message: 'Portfolio not found' });
    }

    // Increment views for public access
    if (portfolio.isPublic) {
      portfolio.views += 1;
      await portfolio.save();
    }

    res.status(200).json({ success: true, data: portfolio });
  } catch (error) {
    next(error);
  }
};

// Get portfolio by slug
export const getPortfolioBySlug = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOne({ slug: req.params.slug }).populate('user', 'name email');

    if (!portfolio) {
      return res.status(404).json({ success: false, message: 'Portfolio not found' });
    }

    if (portfolio.isPublic) {
      portfolio.views += 1;
      await portfolio.save();
    }

    res.status(200).json({ success: true, data: portfolio });
  } catch (error) {
    next(error);
  }
};

// Create new portfolio
export const createPortfolio = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const portfolio = await Portfolio.create(req.body);

    res.status(201).json({ success: true, data: portfolio });
  } catch (error) {
    next(error);
  }
};

// Update portfolio
export const updatePortfolio = async (req, res, next) => {
  try {
    let portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) return res.status(404).json({ success: false, message: 'Portfolio not found' });

    if (portfolio.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    res.status(200).json({ success: true, data: portfolio });
  } catch (error) {
    next(error);
  }
};

// Delete portfolio
export const deletePortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) return res.status(404).json({ success: false, message: 'Portfolio not found' });

    if (portfolio.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    await portfolio.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

// ==================== Sections Management ====================

// Add section
export const addSection = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ success: false, message: 'Portfolio not found' });

    if (portfolio.user.toString() !== req.user.id)
      return res.status(401).json({ success: false, message: 'Not authorized' });

    portfolio.sections.push(req.body);
    await portfolio.save();

    res.status(200).json({ success: true, data: portfolio });
  } catch (error) {
    next(error);
  }
};

// Update section
export const updateSection = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ success: false, message: 'Portfolio not found' });

    if (portfolio.user.toString() !== req.user.id)
      return res.status(401).json({ success: false, message: 'Not authorized' });

    const section = portfolio.sections.id(req.params.sectionId);
    if (!section) return res.status(404).json({ success: false, message: 'Section not found' });

    Object.assign(section, req.body);
    await portfolio.save();

    res.status(200).json({ success: true, data: portfolio });
  } catch (error) {
    next(error);
  }
};

// Delete section
export const deleteSection = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ success: false, message: 'Portfolio not found' });

    if (portfolio.user.toString() !== req.user.id)
      return res.status(401).json({ success: false, message: 'Not authorized' });

    portfolio.sections.pull(req.params.sectionId);
    await portfolio.save();

    res.status(200).json({ success: true, data: portfolio });
  } catch (error) {
    next(error);
  }
};

// ==================== Export Portfolio ====================

// Export as HTML
export const exportPortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ success: false, message: 'Portfolio not found' });

    if (portfolio.user.toString() !== req.user.id)
      return res.status(401).json({ success: false, message: 'Not authorized' });

    const html = generateHTML(portfolio);

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Disposition', `attachment; filename="${portfolio.slug}.html"`);
    res.send(html);
  } catch (error) {
    next(error);
  }
};

// ==================== Featured & Search ====================

// Get featured portfolios
export const getFeaturedPortfolios = async (req, res, next) => {
  try {
    const portfolios = await Portfolio.find({ isFeatured: true, isPublic: true })
      .populate('user', 'name email')
      .sort('-views')
      .limit(10);

    res.status(200).json({ success: true, count: portfolios.length, data: portfolios });
  } catch (error) {
    next(error);
  }
};

// Search portfolios by title or tags
export const searchPortfolios = async (req, res, next) => {
  try {
    const { query, page, limit, skip } = { query: req.query.q || '', ...paginate(req.query.page, req.query.limit) };

    const regex = new RegExp(query, 'i');
    const portfolios = await Portfolio.find({
      isPublic: true,
      $or: [{ name: regex }, { 'sections.content.title': regex }, { tags: regex }],
    })
      .sort('-views')
      .skip(skip)
      .limit(limit)
      .populate('user', 'name email');

    const total = await Portfolio.countDocuments({
      isPublic: true,
      $or: [{ name: regex }, { 'sections.content.title': regex }, { tags: regex }],
    });

    res.status(200).json({ success: true, count: portfolios.length, total, page, pages: Math.ceil(total / limit), data: portfolios });
  } catch (error) {
    next(error);
  }
};

