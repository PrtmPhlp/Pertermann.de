import { useRef, useState } from 'react'

import { pick } from 'contentlayer/client'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'

import Container from '@components/Container'
import { cn } from '@lib/classNames'
import type { Writing } from 'contentlayer/generated'

import { allWritings } from '.contentlayer/generated'

// https://github.com/Pondorasti/alexandru/blob/main/pages/journal/index.tsx
const WritingPage = ({ posts }: { posts: Writing[] }) => {
  return (
    <Container
      back={{
        href: '/',
        label: 'Index',
      }}
    >
      <h1 className='font-semibold'>Writing</h1>
      {posts.map((post, index) => (
        <Link key={post.slug} href={`/writing/${post.slug}`}>
          <a
            className={cn(
              'flex flex-row justify-between py-2 px-2 -mx-2 rounded-md',
              'hover:bg-gray-200 dark:hover:bg-gray-800',
              'transition-all duration-200'
            )}
          >
            <span className='text-quaternary pr-2'>
              {posts.length - index - 1}
            </span>
            <span className='flex-grow'>{post.title}</span>
            <span className='text-tertiary'>
              {format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
            </span>
          </a>
        </Link>
      ))}
    </Container>
  )
}

export default WritingPage

export function getStaticProps() {
  const posts = allWritings
    .map(post => pick(post, ['slug', 'title', 'summary', 'publishedAt']))
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    )

  return {
    props: {
      posts,
    },
  }
}
