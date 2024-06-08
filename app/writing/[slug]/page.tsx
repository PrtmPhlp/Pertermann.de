import '../../../styles/prose.css';
import { Writing, allWritings } from '@/.contentlayer/generated';
import { getRelativeTimeString } from '@/lib/relativeDate';
import ExternalLink from '@/ui/ExternalLink';
import { Mdx } from '@/ui/MDXComponents';
import { Metadata } from 'next';
import { getPlaiceholder } from "plaiceholder";
import Image from 'next/image';
import { notFound } from 'next/navigation';
import fs from "node:fs/promises";

export async function generateStaticParams() {
  return allWritings.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Writing;
}): Promise<Metadata | undefined> {
  const post = allWritings.find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    slug,
  } = post;
  const ogImage = image
    ? `https://pertermann.de${image}`
    : `https://pertermann.de/api/og?title=${title}`;

  return {
    description,
    openGraph: {
      description,
      images: [
        {
          url: ogImage,
        },
      ],
      publishedTime,
      title,
      type: 'article',
      url: `https://pertermann.de/blog/${slug}`,
    },
    title,
    twitter: {
      card: 'summary_large_image',
      description,
      images: [ogImage],
      title,
    },
  };
}

const editUrl = (slug: string) =>
  `https://github.com/PrtmPhlp/cretu.dev/edit/main/data/writing/${slug}.mdx`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function WritingPost({ params }: { params: any }) {
  const post = allWritings.find((post) => post.slug === params.slug);
  
  if (!post) {
    notFound();
  }

  const buffer = await fs.readFile(`./public${post.image}`);
  const { base64 } = await getPlaiceholder(buffer);

  return (
    <div className="text-secondary">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(post.structuredData),
        }}
        suppressHydrationWarning
        type="application/ld+json"
      ></script>
      <p className="text-tertiary mb-2 font-mono text-sm">
        {getRelativeTimeString(new Date(post.publishedAt)).toUpperCase()}
      </p>
      <h1 className="text-primary text-3xl font-semibold">{post.title}</h1>
      <div className="relative mt-8 h-[400px]">
        <Image
          alt={post.title}
          className="rounded-lg"
          fill
          placeholder="blur"
          blurDataURL={base64}
          priority={true}
          sizes="100vw"
          src={post.image}
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <Mdx code={post.body.code} />

      <div className="mt-4">
        <h4>Page not working as intended?</h4>
        <p>
          Status available at{' '}
          <ExternalLink
            className="text-sm"
            href={'https://status.pertermann.de'}
          >
            status.pertermann.de
          </ExternalLink>
        </p>
        <ExternalLink className="text-sm" href={editUrl(post.slug)}>
          Edit source on GitHub
        </ExternalLink>
      </div>
    </div>
  );
}