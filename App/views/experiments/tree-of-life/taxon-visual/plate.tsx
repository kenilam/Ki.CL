import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Image, Layout, Skeleton, Status, Text } from '@/components';

// Constants
import { CLASS_NAME, DISCLAIMER, ERROR_MESSAGES } from './constants';

export function announcementFor({
  imageUrl,
  isGenerating,
  name,
}: {
  imageUrl: string | null;
  isGenerating: boolean;
  name: string;
}): string {
  if (isGenerating) {
    return 'Drawing the plate.';
  }

  return imageUrl ? `Plate of ${name || 'this taxon'} ready.` : 'No plate.';
}

type Props = {
  failed: boolean;
  imageUrl: string | null;
  isGenerating: boolean;
  message: string;
  name: string;
};

const Plate: React.FC<Props> = ({
  failed,
  imageUrl,
  isGenerating,
  message,
  name,
}) => {
  if (!imageUrl && failed) {
    return (
      <Status
        in
        level='warning'
        title='No plate'
        headingLevel='h3'
        message={message}
        align='start'
        property='fade'
      />
    );
  }

  if (isGenerating) {
    return (
      <Layout gap='narrowest'>
        <figure aria-busy='true'>
          <Skeleton
            aria-hidden
            className={classNames(
              `${CLASS_NAME}__taxon-plate-skeleton`,
              'kicl-aspect-ratio-square'
            )}
          />
          <Text
            is='span'
            className={classNames(
              'kicl-font-size-small',
              'kicl-color-grey-dark'
            )}
          >
            Drawing this one - it takes about a minute.
          </Text>
        </figure>
      </Layout>
    );
  }

  if (!imageUrl) {
    return (
      <Status
        in
        level='warning'
        title='No plate'
        headingLevel='h3'
        message={ERROR_MESSAGES.unfinished}
        align='start'
        property='fade'
      />
    );
  }

  return (
    <Layout gap='narrowest'>
      <figure>
        <Image
          data={imageUrl}
          alt={`Plate of ${name || 'this taxon'}, drawn from a description`}
          borderRadius='sm'
          className={classNames(
            `${CLASS_NAME}__taxon-plate`,
            'kicl-aspect-ratio-square'
          )}
        />
        <figcaption>
          <Text
            dense
            is='p'
            className={classNames(
              'kicl-font-size-smaller',
              'kicl-font-weight-bolder',
              'kicl-color-grey-dark',
              'kicl-line-height-narrow'
            )}
          >
            {DISCLAIMER}
          </Text>
        </figcaption>
      </figure>
    </Layout>
  );
};

export { Plate };
