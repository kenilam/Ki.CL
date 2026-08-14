import React from 'react';

// Components
import { Button, Dialog, Image, Layout, Text } from '@/Components';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';

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

      <figcaption>
        <Text is='span' dense>
          {caption}
        </Text>
      </figcaption>

      <Dialog className={`${CLASS_NAME}__full`} fullScreen id={data}>
        <Layout alignItems='center' justifyContent='center'>
          <section>
            <Image data={data} alt={alt} />
          </section>
        </Layout>
      </Dialog>
    </figure>
  );
};

export default Figure;
