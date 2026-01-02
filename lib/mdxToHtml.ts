import components from './rssMdxComponents';
import { getMDXComponent } from 'next-contentlayer2/hooks';
import { createElement } from 'react';

export async function mdxToHtml(code: string): Promise<string> {
  const { renderToStaticMarkup } = await import('react-dom/server');
  const MDXComponent = getMDXComponent(code);

  return renderToStaticMarkup(createElement(MDXComponent, { components }));
}
