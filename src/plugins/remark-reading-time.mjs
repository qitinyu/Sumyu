// remark plugin: calculate reading time from markdown content
function countChars(text) {
  const chineseCount = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;
  return chineseCount + englishWords;
}

export default function remarkReadingTime() {
  return (tree, file) => {
    let total = 0;
    const walk = (node) => {
      if (node.type === 'text') {
        total += countChars(node.value);
      }
      if (node.children) {
        for (const c of node.children) walk(c);
      }
    };
    walk(tree);
    const minutes = total / 300;
    file.data.astro.frontmatter = file.data.astro.frontmatter || {};
    file.data.astro.frontmatter.readingMinutes = Math.max(0.5, minutes);
  };
}
