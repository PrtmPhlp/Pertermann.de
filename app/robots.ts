import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [],
    sitemap: 'https://pertermann.de/sitemap.xml',
  };
}
