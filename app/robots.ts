export default function robots() {
  return {
    // host: 'https://pertermann.de',
    rules: [
      {
        allow: '/',
        disallow: '',
        userAgent: '*',
      },
    ],
    sitemap: 'https://pertermann.de/sitemap.xml',
  };
}
