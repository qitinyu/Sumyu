/**
 * remark-alerts.mjs
 * Parse GitHub-style alerts: >[!note], >[!tip], >[!warning], >[!important], >[!caution]
 * and wrap them in <div class="github-alert" data-type="..."> elements.
 */
import { visit } from 'unist-util-visit';

const ALERT_TYPES = new Set(['note', 'tip', 'warning', 'important', 'caution']);

export default function remarkAlerts() {
  return (tree) => {
    visit(tree, 'blockquote', (node, index, parent) => {
      if (!parent || index == null) return;

      // Check first child for alert marker
      const firstChild = node.children?.[0];
      if (!firstChild || firstChild.type !== 'paragraph') return;

      const firstText = firstChild.children?.[0];
      if (!firstText || firstText.type !== 'text') return;

      const match = firstText.value.match(/^>\[!(\w+)\]\s*/);
      if (!match || !ALERT_TYPES.has(match[1].toLowerCase())) return;

      const alertType = match[1].toLowerCase();

      // Remove the marker from the first text
      firstText.value = firstText.value.replace(match[0], '');

      // Remove the paragraph if now empty
      if (firstText.value.trim() === '' && firstChild.children.length === 1) {
        node.children.shift();
      }

      // Wrap the blockquote in an HTML node
      const htmlNode = {
        type: 'html',
        value: `<div class="github-alert" data-type="${alertType}">`,
      };
      const closingHtml = {
        type: 'html',
        value: '</div>',
      };

      // Replace blockquote with: html + blockquote content + closing html
      parent.children.splice(index, 1, htmlNode, ...node.children, closingHtml);
    });
  };
}