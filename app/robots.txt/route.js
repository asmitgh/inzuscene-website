// app/robots.txt/route.js

export function GET() {
    const body = `
  User-agent: *
  Allow: /
  
  Sitemap: https://inzuscene.com/sitemap.xml
    `.trim();
  
    return new Response(body, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
<<<<<<< HEAD
  
=======
  
>>>>>>> c8c0466a38d035860b4a0d36133ce93441abfab5
