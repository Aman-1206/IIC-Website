/** @type {import('next-sitemap').IConfig} */
const siteUrl = 'https://iic-slc.live'; // 🧠 change this

module.exports = {
  siteUrl,
  generateRobotsTxt: true, // ✅ auto-generate robots.txt
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin/*', '/api/*','/manage-team','/add-webinar','/add-sponsor','/add-past-events','/add-gallery','/add-event','/add-collaborate'], 
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ]
  },
};
