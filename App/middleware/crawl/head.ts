import { ORIGIN, toCard } from './constants';
import { preview } from './previews';

const HTML: Record<string, string> = {
  '"': '&quot;',
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
};

const escapeHtml = (text: string) => {
  return text.replace(/[&<>"]/g, (character) => HTML[character]);
};

const head = (html: string, path: string) => {
  const { description, title, to, type = 'website' } = preview(path);

  const values: Record<string, string> = {
    description,
    image: `${ORIGIN}${toCard(to)}`,
    title,
    type,
    url: `${ORIGIN}${path}`,
  };

  return html.replace(/\{\{page\.(\w+)\}\}/g, (match, key: string) => {
    return escapeHtml(values[key] ?? match);
  });
};

export { head };
