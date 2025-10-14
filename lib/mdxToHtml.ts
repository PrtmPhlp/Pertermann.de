import { createElement } from 'react';
import { getMDXComponent } from 'next-contentlayer/hooks';
import components from './rssMdxComponents';

export async function mdxToHtml(code: string): Promise<string> {
  const { renderToStaticMarkup } = await import('react-dom/server');
  const MDXComponent = getMDXComponent(code);

  return renderToStaticMarkup(
    createElement(MDXComponent, { components }),
  );
}
