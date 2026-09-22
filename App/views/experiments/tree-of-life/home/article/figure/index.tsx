import React from 'react';

// Components
import { Button, Dialog, Image, Layout, Text } from '@/components';

// Spec
import * as Spec from './spec';

// Styles
import './styles.scss';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life__figure';

const Figure: React.FunctionComponent<Spec.Props> = ({
  alt,
  caption,
  data,
}) => {
  return (
    <figure className={CLASS_NAME}>
      <Layout alignItems='center' justifyContent='center'>
        <Button
          aria-label={`${alt} Open the full image.`}
          className={`${CLASS_NAME}__preview`}
          command='show-modal'
          commandFor={data}
          unstyled
        >
          <Image data={data} alt='' />
        </Button>
      </Layout>

      <figcaption className='kicl-padding-block-start-narrower'>
        <Text is='span' dense>
          {caption}
        </Text>
      </figcaption>

      <Dialog
        aria-label={alt}
        className={`${CLASS_NAME}__full`}
        fullScreen
        id={data}
      >
        <Layout alignItems='center' justifyContent='center'>
          <div>
            <Image data={data} alt={alt} />
          </div>
        </Layout>
      </Dialog>
    </figure>
  );
};

export { Figure };
