import '../../../styles/prose.css';
import { Writing, allWritings } from '@/.contentlayer/generated';
import CommitSection from '@/app/writing/CommitSection';
import DateViewer from '@/ui/DateView';
import ExternalLink from '@/ui/ExternalLink';
import { Mdx } from '@/ui/MDXComponents';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import fs from 'node:fs/promises';
import { getPlaiceholder } from 'plaiceholder';

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
    <div className="text-secondary mx-auto max-w-2xl">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(post.structuredData),
        }}
        suppressHydrationWarning
        type="application/ld+json"
      ></script>
      <p className="text-tertiary -ml-1 mb-2 w-fit rounded-md bg-gray-200 px-1.5 py-0.5 font-mono text-sm dark:bg-gray-800">
        <DateViewer date={post.publishedAt} />
      </p>
      <h1 className="text-primary text-3xl font-semibold">{post.title}</h1>
      {post.image && (
        <div className="relative mt-8 h-[400px]">
          <Image
            alt={post.title}
            blurDataURL={base64}
            className="rounded-lg"
            fill
            placeholder="blur"
            priority={true}
            sizes="100vw"
            src={post.image}
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      )}
      <Mdx code={post.body.code} />
      <CommitSection slug={post.slug} /> {/* Use the wrapper component */}
      <div className="mt-8 text-sm">
        <p>
            <ExternalLink arrow={false} href={editUrl(post.slug)}>edit source on GitHub</ExternalLink>
            {' • '}
            <ExternalLink arrow={false} href="https://status.pertermann.de">status.pertermann.de</ExternalLink>
          </p>
          </div>
    </div>
  );
}
