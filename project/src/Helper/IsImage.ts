import { GetFileExtension } from '@/Helper';
import { imageExtension } from '$/resources';
import * as Spec from './spec';

const IsImage: Spec.IsImage = (prop) => {
  if (!prop?.path) {
    return false;
  }

  const { path } = prop;

  const extension = GetFileExtension({ path });

  return imageExtension.includes[extension];
}

export default IsImage;