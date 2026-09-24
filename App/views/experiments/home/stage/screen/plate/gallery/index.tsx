import React from 'react';

// Libraries
import classNames from 'classnames';

// API
import { Kicl_ImageAgentGalleryDocument, useQuery } from 'api/provider';

// Components
import { Layout } from '@/components';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as PLATE } from '@/views/experiments/home/stage/screen/plate/constants';

const CLASS_NAME = `${PLATE}__mosaic`;

/** How many of the best-scored pictures to fetch. The API allows 24. */
const PICTURES = 24;

/**
 * Grids that fill the plate, largest first, as columns by rows on a wide
 * screen. A narrow screen swaps them.
 */
/** How many pictures stack and blend over the whole plate instead of tiling. */
const BLEND = 2;

const GRIDS = [
  [6, 4],
  [5, 4],
  [4, 4],
  [4, 3],
  [4, 2],
  [3, 2],
  [2, 2],
  [2, 1],
  [1, 1],
] as const;

/**
 * The best-scored pictures the agent has drawn, each once, in the largest
 * grid there are enough of them for. Until they load, or if they fail, the
 * plate's own picture shows through.
 */
const Mosaic: React.FunctionComponent = () => {
  const { data } = useQuery(Kicl_ImageAgentGalleryDocument, {
    variables: { limit: PICTURES },
  });
  const urls = data?.ImageAgentGallery.map(({ url }) => url) ?? [];
  const grid = GRIDS.find(([columns, rows]) => columns * rows <= urls.length);

  if (!grid) {
    return null;
  }

  const [columns, rows] = grid;
  const count = columns * rows;

  // Two side by side leaves each too narrow, so they stack and blend instead.
  const blend = count === BLEND;

  return (
    <Layout autoFlow='row' display='flex' gap='none' wrap>
      <span
        className={classNames(
          CLASS_NAME,
          { [`${CLASS_NAME}--blend`]: blend },
          'kicl-inset-0',
          'kicl-position-absolute'
        )}
        style={
          {
            [`--${CLASS_NAME}--columns`]: columns,
            [`--${CLASS_NAME}--rows`]: rows,
          } as React.CSSProperties
        }
      >
        {urls.slice(0, count).map((url) => (
          <span
            className={classNames(`${CLASS_NAME}__tile`, {
              'kicl-inset-0': blend,
              'kicl-position-absolute': blend,
              'kicl-position-relative': !blend,
            })}
            key={url}
          >
            <span
              className={classNames(
                `${CLASS_NAME}__picture`,
                'kicl-position-absolute'
              )}
              style={
                {
                  [`--${CLASS_NAME}--tile`]: `url('${url}')`,
                } as React.CSSProperties
              }
            />
          </span>
        ))}
      </span>
    </Layout>
  );
};

export { Mosaic };
