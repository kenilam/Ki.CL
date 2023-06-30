import { NAME } from './constants';

type TemplateProps = {
  code: string;
};
function template({ code }: TemplateProps) {
  return `${code}
if (import.meta.hot) {
  import.meta.hot.on('${NAME}', ({ content, id }) => {
    if (!content || !id) {
      console.error('[HMR] ${NAME} error: unable to parse content, either the source or the id is missing');
      return;
    }
    __vite__updateStyle(id, content);
  })
}
`;
}

export default template;
