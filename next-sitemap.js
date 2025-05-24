module.exports = {
    siteUrl: 'https://inzuscene.com',
    generateRobotsTxt: true,
    changefreq: 'daily',
    priority: 0.8,
    sitemapSize: 7000,
    exclude: ['/private', '/dev'],
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
      additionalSitemaps: [
        'https://inzuscene.com/sitemap-blogs.xml',
        'https://inzuscene.com/sitemap-industries.xml',
      ],
    },
  };
  