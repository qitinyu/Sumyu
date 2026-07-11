/**
 * remark-spoiler.mjs
 * Parse :spoiler[text] syntax and wrap in <span class="spoiler"><span class="spoiler-content">text</span></span>
 */
import { visit } from 'unist-util-visit';

const SPOILER_RE = /:spoiler\[(.+?)\]/g;

export default function remarkSpoiler() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index == null) return;
      if (!SPOILER_RE.test(node.value)) return;

      const value = node.value;
      const nodes = [];
      let lastIndex = 0;
      SPOILER_RE.lastIndex = 0;

      let match;
      while ((match = SPOILER_RE.exec(value)) !== null) {
        // Text before the spoiler
        if (match.index > lastIndex) {
          nodes.push({ type: 'text', value: value.slice(lastIndex, match.index) });
        }

        // HTML for the spoiler
        nodes.push({
          type: 'html',
          value: `<span class="spoiler"><span class="spoiler-content">${match[1]}</span></span>`,
        });

        lastIndex = match.index + match[0].length;
      }

      // Remaining text
      if (lastIndex < value.length) {
        nodes.push({ type: 'text', value: value.slice(lastIndex) });
      }

      // Replace the text node
      parent.children.splice(index, 1, ...nodes);
    });
  };
}