import { allWritings } from '.contentlayer/generated';
import { headers } from 'next/headers';

export async function GET() {
  const headersList = headers();
  const host = headersList.get('host') || 'pertermann.de';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Pertermann</title>
    <description>A place for everything and nothing, where expectations are left at the doorstep and chaos reigns supreme.</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${allWritings
      .sort(
        (a, b) =>
          Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
      )
      .map((post) => {
        const postUrl = `${baseUrl}/writing/${post.slug}`;
        return `
      <item>
        <title>${post.title}</title>
        <description>${post.summary}</description>
        <link>${postUrl}</link>
        <guid>${postUrl}</guid>
        <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      </item>
    `;
      })
      .join('')}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=300',
      'Content-Type': 'application/xml',
    },
  });
}
