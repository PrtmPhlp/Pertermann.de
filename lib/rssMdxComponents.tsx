import React from 'react';

const RssAnimatedGradientBox = (
  props: React.HTMLAttributes<HTMLDivElement>,
) => <div {...props}>{props.children}</div>;

type CardProps = {
  children?: React.ReactNode;
  content?: string;
  title?: string;
};

const RssCard = ({ title, content, children }: CardProps) => (
  <section>
    {title ? <strong>{title}</strong> : null}
    {content ? <p>{content}</p> : null}
    {children}
  </section>
);

type FlashcardProps = {
  children?: React.ReactNode;
  front?: React.ReactNode;
};

const RssFlashcard = ({ front, children }: FlashcardProps) => (
  <section>
    {front ? <strong>{front}</strong> : null}
    {children}
  </section>
);

const RssImage = ({
  alt,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <figure>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img alt={alt} {...props} />
    {alt ? <figcaption>{alt}</figcaption> : null}
  </figure>
);

const RssLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a {...props} />
);

const rssComponents = {
  AnimatedGradientBox: RssAnimatedGradientBox,
  Card: RssCard,
  Flashcard: RssFlashcard,
  Image: RssImage,
  a: RssLink,
};

export default rssComponents;
