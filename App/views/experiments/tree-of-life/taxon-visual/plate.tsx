import React from 'react';

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
      <Layout gap='narrowest' aria-busy='true'>
        <div>
          <Skeleton
            aria-hidden
            className={`${CLASS_NAME}__taxon-plate-skeleton`}
          />
          <Text is='span' className='kicl-font-size-small kicl-color-grey-dark'>
            Drawing this one - it takes about a minute.
          </Text>
        </div>
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
          className={`${CLASS_NAME}__taxon-plate`}
        />
        <figcaption>
          <Text
            dense
            is='p'
            className='kicl-font-size-smaller kicl-font-weight-bolder kicl-color-grey-dark kicl-line-height-narrow'
          >
            {DISCLAIMER}
          </Text>
        </figcaption>
      </figure>
    </Layout>
  );
};

export { Plate };
