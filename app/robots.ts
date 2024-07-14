export default function robots() {
  return {
    // host: 'https://pertermann.de',
    rules: [
      {
        userAgent: '*',
        disallow: '',
      },
    ],
    sitemap: 'https://pertermann.de/sitemap.xml',
  };
}
