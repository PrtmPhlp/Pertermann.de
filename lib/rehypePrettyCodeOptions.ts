import type { Options } from 'rehype-pretty-code';

export const rehypePrettyCodeOptions: Partial<Options> = {
  onVisitHighlightedLine(node) {
    if (node.properties.className) {
      node.properties.className.push('syntax-line--highlighted');
    } else {
      node.properties.className = ['syntax-line--highlighted'];
    }
  },
  onVisitHighlightedChars(node) {
    node.properties.className = ['syntax-word--highlighted'];
  },
  onVisitLine(node) {
    // Preserve vertical spacing and copy/paste fidelity for empty lines.
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
    if (node.properties.className) {
      node.properties.className.push('syntax-line');
    } else {
      node.properties.className = ['syntax-line'];
    }
  },
  theme: 'one-dark-pro',
};

