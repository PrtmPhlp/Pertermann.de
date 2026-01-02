import { allWritings } from '.contentlayer/generated';
import { mdxToHtml } from '@/lib/mdxToHtml';
import { headers } from 'next/headers';

export const runtime = 'nodejs';

const CONTENT_NAMESPACE = 'http://purl.org/rss/1.0/modules/content/';

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const wrapCdata = (value: string) =>
  `<![CDATA[${value.replaceAll(']]>', ']]]]><![CDATA[>')}]]>`;

const absolutizeUrls = (html: string, baseUrl: string) => {
  const prefix = `${baseUrl}/`;
  return html
    .replaceAll('href="/', `href="${prefix}`)
    .replaceAll("href='/", `href='${prefix}`)
    .replaceAll('src="/', `src="${prefix}`)
    .replaceAll("src='/", `src='${prefix}`)
    .replaceAll('poster="/', `poster="${prefix}`)
    .replaceAll("poster='/", `poster='${prefix}`);
};

export async function GET() {
  const headersList = await headers();
  const host = headersList.get('host') || 'pertermann.de';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  const sortedWritings = [...allWritings].sort(
    (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
  );

  const items = await Promise.all(
    sortedWritings.map(async (post) => {
      const postUrl = `${baseUrl}/writing/${post.slug}`;
      const html = absolutizeUrls(await mdxToHtml(post.body.code), baseUrl);

      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <description>${escapeXml(post.summary)}</description>`,
        `      <link>${postUrl}</link>`,
        `      <guid>${postUrl}</guid>`,
        `      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>`,
        `      <content:encoded>${wrapCdata(html)}</content:encoded>`,
        '    </item>',
      ].join('\n');
    }),
  );

  const feed = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="${CONTENT_NAMESPACE}">`,
    '  <channel>',
    '    <title>Pertermann</title>',
    '    <description>A place for everything and nothing, where expectations are left at the doorstep and chaos reigns supreme.</description>',
    `    <link>${baseUrl}</link>`,
    `    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />`,
    '    <language>en</language>',
    `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    items.join('\n'),
    '  </channel>',
    '</rss>',
  ].join('\n');

  return new Response(feed, {
    headers: {
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=300',
      'Content-Type': 'application/xml',
    },
  });
}
