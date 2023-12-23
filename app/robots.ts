export default function robots() {
  return {
    host: 'https://pertermann.de',
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: 'https://pertermann.de/sitemap.xml',
  };
}
