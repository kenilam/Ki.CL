import React from 'react';

import { Link } from 'Component';
import { agesAgo, toDate } from 'Helper';

const Work = ({ modules, id, name, published_on: publishedOn }) => {
  const dateTime = toDate(publishedOn, 'YYYY-MM-DD');
  const age = agesAgo(publishedOn);

  const { src } = modules.filter(module => module.type === 'image')[0];

  return (
    <li>
      <figure>
        <Link to={`/works/${id}`} title={name}>
          <img src={src} alt={name}/>
        </Link>
        <figcaption>
          <p>{name}</p>
          <p>Published: <time { ...{ dateTime } }>{age}</time></p>
        </figcaption>
      </figure>
    </li>
  );
};

export default Work;
