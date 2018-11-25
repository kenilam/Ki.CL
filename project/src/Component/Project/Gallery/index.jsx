// @flow
import React from 'react';

import { ordinalSuffixOf, randomId } from 'Helper';

const Image = ({ height, index, name, src, total, width }) => (
    <img src={src} height={height} width={width} alt={
        `${ordinalSuffixOf(index + 1)} of the total of ${total} images for ${name}`
    } />
);

const Gallery = ({ name, images }) => (
    <figure>
        {
            (
                images.map(
                    (image, index, images) => <Image key={randomId} { ...{ name, index, total: images.length, ...image } }/>
                )
            )
        }
    </figure>
);

export default Gallery;
