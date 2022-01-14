import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';

import BlogPost from '@components/BlogPost';
import Container from '@components/Container';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { getAllFilesFrontMatter } from 'lib/mdx';
import useDelayedRender from 'use-delayed-render';

interface writingProps {
  posts;
}

function cx(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Writing({ posts }: writingProps): JSX.Element {
  const { rendered } = useDelayedRender(true, {
    exitDelay: 2000
  });

  const [Results, setResults] = useState('');
  const SearchResults = posts
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    )
    .filter((date) => date.title.toLowerCase().includes(Results.toLowerCase()));

  return (
    <Container
      title="Cristian Crețu - Writing"
      description="My ideas about programming, tech, and personal life."
    >
      <div className="flex flex-col space-y-4 text-gray-600 delayed dark:text-gray-400">
        <div
          className={cx(
            'before flex flex-col space-y-4',
            rendered ? 'after' : ''
          )}
          style={{ transitionDelay: '250ms' }}
        >
          <h1 className="font-serif text-4xl font-bold text-gray-900 dark:text-gray-100">
            Writing
          </h1>
          <p>
            This is the place where I share my ideas about programming, tech,
            and other things from my life. Use the search box bellow to filter
            posts.
          </p>
        </div>
        <div
          className={cx(
            'relative w-full space-x-2 flex px-4 py-2 items-center font-bold text-lg rounded-md text-gray-900 bg-gray-100 dark:text-gray-100 dark:bg-gray-800 before',
            rendered ? 'after' : ''
          )}
          style={{ transitionDelay: '350ms' }}
        >
          <MagnifyingGlassIcon className="w-5 h-5 fill-current" />
          <input
            value={Results}
            className="flex-grow block w-full bg-transparent outline-none rounded-xs"
            aria-label="Search articles"
            type="text"
            onChange={(e) => setResults(e.target.value)}
            placeholder="Search Articles"
          />
        </div>

        {!SearchResults.length && <p>No results found.</p>}
        <div
          className={cx(
            'flex flex-col space-y-2 before',
            rendered ? 'after' : ''
          )}
          style={{ transitionDelay: '435ms' }}
        >
          {SearchResults.map((data) => (
            <div className="flex items-center py-6 space-x-2 transition-colors duration-200 rounded-md cursor-pointer group hover:bg-gray-200 dark:hover:bg-gray-800">
              <em className="text-sm rotate-90">
                <hr className="h-full mb-2 dotted"></hr>
                {format(parseISO(data.publishedAt), 'MMMM dd')}
              </em>
              <BlogPost
                key={data.title}
                title={data.title}
                summary={data.summary}
                slug={data.slug}
              />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog');

  return {
    props: { posts }
  };
}
