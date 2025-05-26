// app/sitemap.xml/route.js
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

export async function GET() {
  const hostname = 'https://inzuscene.com'; // ✅ Replace with your domain

  // Fetch dynamic routes (e.g., from CMS, DB, file system)
  const dynamicRoutes = [
    // '/blog/ai-powered-business',
    // '/blog/ifs-implementation-tips',
    // Add logic to pull this from DB or file system
  ];

  const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/services', changefreq: 'monthly', priority: 0.7 },
    { url: '/partners', changefreq: 'monthly', priority: 0.7 },
    { url: '/about', changefreq: 'monthly', priority: 0.7 },
    { url: '/contact', changefreq: 'monthly', priority: 0.7 },
    { url: '/blog', changefreq: 'monthly', priority: 0.7 },
    ...dynamicRoutes.map(path => ({
      url: path,
      changefreq: 'weekly',
      priority: 0.8,
    })),
  ];

  const stream = new SitemapStream({ hostname });
  const xml = await streamToPromise(Readable.from(links).pipe(stream)).then(data => data.toString());

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
