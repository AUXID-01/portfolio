import jwt from 'jsonwebtoken';
import slugifyLib from 'slugify';

/**
 * Generate JWT Token
 * @param {string} id - User or resource ID
 * @returns {string} JWT token
 */
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

/**
 * Slugify string
 * @param {string} text - Input text
 * @returns {string} URL-friendly slug
 */
export const slugify = (text) => {
  if (!text) return '';
  return slugifyLib(text, {
    lower: true,
    strict: true, // removes special characters
    trim: true,
  });
};

/**
 * Pagination helper
 * @param {number|string} page - Current page number
 * @param {number|string} limit - Number of items per page
 * @returns {object} Pagination object with skip, page, limit
 */
export const paginate = (page, limit) => {
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;
  const skip = (pageNum - 1) * limitNum;

  return {
    page: pageNum,
    limit: limitNum,
    skip,
  };
};

/**
 * Export portfolio as HTML
 * @param {object} portfolio - Portfolio data
 * @returns {string} HTML string
 */
export const generateHTML = (portfolio) => {
  const sections = portfolio.sections
    .map((section) => {
      switch (section.type) {
        case 'project':
          return `
            <section class="project-section">
              <h2>${section.content.title}</h2>
              <p>${section.content.description}</p>
              ${section.content.link ? `<a href="${section.content.link}">View Project</a>` : ''}
              ${section.content.image ? `<img src="${section.content.image}" alt="${section.content.title}">` : ''}
            </section>
          `;
        case 'blog':
          return `
            <section class="blog-section">
              <h2>${section.content.title}</h2>
              <p>${section.content.content}</p>
            </section>
          `;
        case 'video':
          return `
            <section class="video-section">
              <h2>${section.content.title}</h2>
              <iframe src="${section.content.url}" frameborder="0" allowfullscreen></iframe>
            </section>
          `;
        case 'image':
          return `
            <section class="image-section">
              <h2>${section.content.title}</h2>
              <div class="gallery">
                ${section.content.images.map(img => `<img src="${img}" alt="${section.content.title}">`).join('')}
              </div>
            </section>
          `;
        default:
          return '';
      }
    })
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${portfolio.name}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; line-height: 1.6; background: #f9f9f9; color: #333; }
        header { padding: 2rem; text-align: center; background: #222; color: #fff; }
        section { padding: 2rem; margin: 2rem auto; max-width: 1200px; background: #fff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1, h2 { margin-bottom: 1rem; }
        img { max-width: 100%; height: auto; border-radius: 4px; }
        .gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; }
        a { color: #3498db; text-decoration: none; }
        a:hover { text-decoration: underline; }
        ${portfolio.customCSS || ''}
      </style>
    </head>
    <body>
      <header>
        <h1>${portfolio.name}</h1>
        ${portfolio.tagline ? `<p>${portfolio.tagline}</p>` : ''}
      </header>
      <main>
        ${sections}
      </main>
    </body>
    </html>
  `;
};

/**
 * Format date helper
 * @param {Date|string} date - Input date
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date
 */
export const formatDate = (date, options = {}) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  });
};

/**
 * Safe JSON parse
 * @param {string} str - JSON string
 * @returns {object|null} Parsed object or null if invalid
 */
export const safeJSONParse = (str) => {
  try {
    return JSON.parse(str);
  } catch (err) {
    return null;
  }
};
