import { allWritings } from '.contentlayer/generated';
import { cn } from '@/lib/className';
import { getRelativeTimeString } from '@/lib/relativeDate';
import ExternalLink from '@/ui/ExternalLink';
import { pick } from 'contentlayer/client';
import Image from "next/image";
import Link from 'next/link';
import { Suspense } from 'react';

async function getData() {
  const posts = allWritings
    .map((post) => pick(post, ['slug', 'title', 'summary', 'publishedAt']))
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
    )
    .slice(0, 3);

  return {
    props: {
      posts,
    },
  };
}

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      <Header />
      <Contact />
      <AboutMe />
      <Suspense>
        <RecentWritings />
      </Suspense>
    </div>
  );
}

function Header() {
  return (
    <div className="flex flex-row items-center gap-4">
      <div className="relative h-12 w-12">
        <Image
          alt="Logo"
          className="rounded-full"
          src="/static/images/profile.jpg"
          fill
          sizes="100vw"
          style={{
            objectFit: "contain"
          }} />
        <div className="absolute -bottom-2 -right-2 rounded-full bg-white px-1 py-0.5 text-sm dark:bg-gray-900">
          ✨
        </div>
      </div>
      <div className="flex flex-col">
        <h1>Pertermann</h1>
        <p className="text-quaternary"></p>
      </div>
    </div>
  );
}

function AboutMe() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-tertiary">About this</p>
      <div className="text-secondary flex flex-col gap-4">
        <p>
          A place for everything and nothing, where expectations are left at the
          doorstep and chaos reigns supreme.
        </p>
        <p>
          Working on multiple projects and apps, some of them you can find here,
          some you don&apos;t. Maybe also look at my{' '}
          <ExternalLink arrow={true} href="https://github.com/PrtmPhlp">
            Github
          </ExternalLink>{' '}
          :)
        </p>
      </div>
    </div>
  );
}

function ContactLink({
  href,
  title,
  website,
  email,
}: {
  email?: string;
  href?: string;
  title: string;
  website?: string;
}) {
  return (
    <span className="block items-center gap-4">
      {website && <p className="text-quaternary">{website}</p>}
      {href && (
        <a
          className="text-secondary hover:text-primary transition-opacity duration-150"
          href={href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {title}{' '}
          <svg
            className=" inline-block h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      )}
      {email && (
        <p className="text-secondary hover:text-primary transition-opacity duration-150">
          {title}
        </p>
      )}
    </span>
  );
}

function Contact() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-tertiary">Links</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ContactLink
          href="https://github.com/PrtmPhlp"
          title="PrtmPhlp"
          website="GitHub"
        />
        <ContactLink
          href="https://X.com/PrtmPhlp"
          title="@prtmphlp"
          website="X"
        />
        <ContactLink
          href="https://www.instagram.com/PrtmPhlp"
          title="PrtmPhlp"
          website="Instagram"
        />
        <ContactLink
          href="mailto:contact@pertermann.de"
          title="contact@pertermann.de"
          website="Email"
        />
        <ContactLink
          href="https://status.pertermann.de"
          title="Systemstatus"
          website="Surveillance"
        />
        <ContactLink
          href="https://admin.pertermann.de"
          title="AdminPanel"
          website="Surveillance"
        />
        {/* <ContactLink href="about:blank" title="placeholder" website="--" /> */}
      </div>
    </div>
  );
}

async function RecentWritings() {
  const { posts } = (await getData()).props;

  return (
    <div className="flex flex-col gap-4">
      <a className="text-tertiary" href="writing/">
        Recent writing
      </a>
      <div className="space-y-2">
        {posts.map((post) => (
          <Link
            className={cn(
              '-mx-2 flex flex-row justify-between rounded-md px-2 py-2',
              'hover:bg-gray-200 dark:hover:bg-gray-800',
              'transition-all duration-200',
            )}
            href={`/writing/${post.slug}`}
            key={post.slug}
          >
            <span className="text-secondary mr-2 flex-grow truncate">
              {post.title}
            </span>
            <span className="text-tertiary flex-shrink-0">
              {getRelativeTimeString(new Date(post.publishedAt))}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
