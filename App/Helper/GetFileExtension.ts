import { GetFileExtension } from '^/App/Helper/_Spec';

const getFileExtension: GetFileExtension = (prop) => {
  if (typeof prop?.path !== 'string') {
    return '';
  }

  const extension =
    prop?.path?.split(/[#?]/)?.[0].split('.')?.pop()?.trim() || '';

  return extension;
};

export default getFileExtension;
