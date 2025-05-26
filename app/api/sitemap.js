import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

export default async function handler(req, res) {
  const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about', changefreq: 'monthly', priority: 0.7 },
    { url: '/contact', changefreq: 'monthly', priority: 0.7 },
    // Dynamically add blog/product pages here
  ];

  const stream = new SitemapStream({ hostname: 'https://yourdomain.com' });
  const xml = await streamToPromise(Readable.from(links).pipe(stream)).then(data => data.toString());

  res.setHeader('Content-Type', 'application/xml');
  res.write(xml);
  res.end();
}
