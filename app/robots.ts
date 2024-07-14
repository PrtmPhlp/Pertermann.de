export default function robots() {
  return {
    // host: 'https://pertermann.de',
    rules: [
      {
        disallow: '',
        userAgent: '*',
      },
    ],
    sitemap: 'https://pertermann.de/sitemap.xml',
  };
}
