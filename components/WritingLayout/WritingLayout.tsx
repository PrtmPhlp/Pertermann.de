import { format, parseISO } from 'date-fns'

import Container from '@components/Container'
import { Writing } from 'contentlayer/generated'

interface IWritingLayoutProps {
  children: React.ReactNode
  post: Writing
}

const editUrl = (slug: string) =>
  `https://github.com/cristicretu/cretu.dev/edit/main/data/writing/${slug}.mdx`

export default function WritingLayout({ post, children }: IWritingLayoutProps) {
  return (
    <Container
      title={`${post.title} - Cristian Crețu`}
      description={post.summary}
      image={`https://cretu.dev${post.image}`}
      date={new Date(post.publishedAt).toISOString()}
      type='article'
      back={{
        href: '/writing',
        label: 'Writing',
      }}
    >
      <article className='flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16'>
        <h1 className='mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white'>
          {post.title}
        </h1>
        <div className='flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center'>
          <div className='text-sm flex flex-row gap-2 divide-x divide-gray-300 dark:divide-gray-700 items-center text-secondary'>
            <p>Cristian Crețu</p>
            <p className='pl-2'>
              {format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
            </p>
          </div>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0'>
            {post.readingTime.text}
          </p>
        </div>
        <div className='w-full mt-4 prose dark:prose-dark max-w-2xl'>
          {children}
        </div>
        <div className='text-sm text-gray-700 dark:text-gray-300'>
          <a
            href={editUrl(post.slug)}
            target='_blank'
            rel='noopener noreferrer'
          >
            {'Edit on GitHub'}
          </a>
        </div>
      </article>
    </Container>
  )
}
