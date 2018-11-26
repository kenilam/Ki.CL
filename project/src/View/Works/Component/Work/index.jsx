import React from 'react';

import { Link } from 'Component';
import { agesAgo, toDate } from 'Helper';

const Work = ({ cover, id, name, published_on: publishedOn }) => {
  const dateTime = toDate(publishedOn, 'YYYY-MM-DD');
  const age = agesAgo(publishedOn);

  return (
    <li>
      <figure>
        <Link to={`/works/${id}`} title={name}>
          <img src={cover} alt={name}/>
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
