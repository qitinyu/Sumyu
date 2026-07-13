/**
 * rehype-alerts.mjs
 * Convert GitHub-style alert blockquotes to styled HTML.
 * Works at the HTML AST level, so it's processor-agnostic.
 */
import { visit } from 'unist-util-visit';

const ALERT_CONFIG = {
  note: { icon: '📌', title: 'NOTE' },
  tip: { icon: '💡', title: 'TIP' },
  warning: { icon: '⚠️', title: 'WARNING' },
  important: { icon: '❗', title: 'IMPORTANT' },
  caution: { icon: '🔒', title: 'CAUTION' },
};

export default function rehypeAlerts() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (!parent || index == null) return;
      if (node.tagName !== 'blockquote') return;

      const firstChild = node.children?.[0];
      if (!firstChild || firstChild.type !== 'element' || firstChild.tagName !== 'p') return;

      const textNodes = firstChild.children?.filter((c) => c.type === 'text') || [];
      const allText = textNodes.map((c) => c.value).join('') || '';

      const match = allText.match(/^\[!(\w+)\]\s*/);
      if (!match || !ALERT_CONFIG[match[1].toLowerCase()]) return;

      const alertType = match[1].toLowerCase();
      const config = ALERT_CONFIG[alertType];
      const markerLen = match[0].length;

      let remaining = markerLen;
      const newChildren = [];
      for (const child of firstChild.children) {
        if (remaining > 0 && child.type === 'text') {
          if (child.value.length <= remaining) {
            remaining -= child.value.length;
          } else {
            const leftover = child.value.slice(remaining).trimStart();
            remaining = 0;
            if (leftover) {
              newChildren.push({ type: 'text', value: leftover });
            }
          }
        } else {
          newChildren.push(child);
        }
      }

      if (newChildren.length > 0) {
        firstChild.children = newChildren;
      } else {
        node.children.shift();
      }

      const alertDiv = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['github-alert'],
          'data-type': alertType,
        },
        children: [
          {
            type: 'element',
            tagName: 'div',
            properties: { className: ['github-alert__header'] },
            children: [
              {
                type: 'element',
                tagName: 'span',
                properties: { className: ['github-alert__icon'] },
                children: [{ type: 'text', value: config.icon }],
              },
              { type: 'text', value: config.title },
            ],
          },
          {
            type: 'element',
            tagName: 'div',
            properties: { className: ['github-alert__content'] },
            children: node.children,
          },
        ],
      };

      parent.children[index] = alertDiv;
    });
  };
}