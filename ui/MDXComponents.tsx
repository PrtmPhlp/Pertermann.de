import ExternalLink from './ExternalLink';
import Flashcard from './Flashcard';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedGradientBox from '../app/components/AnimatedGradientBox';
import Card from '../app/components/card';

const CustomLink = (props: any) => {
  const href = props.href;
  const isInternalLink = href && href.startsWith('/');

  if (isInternalLink) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return <a {...props} />;
  }

  return <ExternalLink href={href} {...props} />;
};

function RoundedImage(props: any) {
  return (
    <Image
      alt={props.alt}
      className="rounded-lg"
      {...props}
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
}

const components = {
  Flashcard,
  Image: RoundedImage,
  a: CustomLink,
  AnimatedGradientBox,
  Card,
};

export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);

  return (
    <article className="prose-quoteless prose prose-neutral dark:prose-invert">
      <Component components={components} />
    </article>
  );
}

export default components;
