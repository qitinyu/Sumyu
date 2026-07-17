import { visit } from 'unist-util-visit';

export default function remarkSpoiler() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index == null) return;

      const regex = /:spoiler\[([^\]]+)\]/g;
      let match;
      let lastIndex = 0;
      const children = [];

      while ((match = regex.exec(node.value)) !== null) {
        if (match.index > lastIndex) {
          children.push({ type: 'text', value: node.value.slice(lastIndex, match.index) });
        }
        children.push({
          type: 'html',
          value: `<span class="spoiler">${match[1]}</span>`,
        });
        lastIndex = regex.lastIndex;
      }

      if (children.length === 0) return;

      if (lastIndex < node.value.length) {
        children.push({ type: 'text', value: node.value.slice(lastIndex) });
      }

      parent.children.splice(index, 1, ...children);
    });
  };
}
