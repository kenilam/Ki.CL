import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import {
  Button,
  Dialog,
  Image,
  Layout,
  Markdown,
  Text,
} from 'design/components';

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
  const { t } = useTranslation('tree-of-life');

  return (
    <figure className={CLASS_NAME}>
      <Layout alignItems='center' justifyContent='center'>
        <Button
          aria-label={t('article.figure.open', { alt })}
          className={classNames(
            `${CLASS_NAME}__preview`,
            'kicl-cursor-zoom-in'
          )}
          command='show-modal'
          commandFor={data}
          unstyled
        >
          <Image data={data} alt='' />
        </Button>
      </Layout>

      <figcaption className='kicl-padding-block-start-narrower'>
        <Text is='span' dense>
          <Markdown>{caption}</Markdown>
        </Text>
      </figcaption>

      <Dialog
        aria-label={alt}
        className={`${CLASS_NAME}__full`}
        fullScreen
        id={data}
      >
        {/* A grid item of the dialog's own layout, so auto margins centre it. */}
        <Image className='kicl-margin-inline-auto' data={data} alt={alt} />
      </Dialog>
    </figure>
  );
};

export { Figure };
