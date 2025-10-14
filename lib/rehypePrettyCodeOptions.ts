import type { Options } from 'rehype-pretty-code';

export const rehypePrettyCodeOptions: Partial<Options> = {
  onVisitHighlightedLine(node) {
    node.properties.className.push('syntax-line--highlighted');
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ['syntax-word--highlighted'];
  },
  onVisitLine(node) {
    // Preserve vertical spacing and copy/paste fidelity for empty lines.
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
    node.properties.className.push('syntax-line');
  },
  theme: 'one-dark-pro',
  tokensMap: {
    fn: 'entity.name.function',
    objKey: 'meta.object-literal.key',
  },
};

