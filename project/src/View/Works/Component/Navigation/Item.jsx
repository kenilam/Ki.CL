// @flow
import React from 'react';

import { Link } from 'Component';
import { agesAgo, toDate } from 'Helper';

type Module = {
  type: String
};

type Props = {
  id: Number,
  modules: Array<Module>,
  name: String,
  published_on: Number
};

const Item = ({ id, modules, name, published_on: publishedOn }: Props) => {
  const dateTime = toDate(publishedOn, 'YYYY-MM-DD');
  const age = agesAgo(publishedOn);

  const { src } = modules.filter(module => module.type === 'image')[0];

  return (
    <li>
      <figure>
        <img src={ src } alt={ name }/>
        <figcaption>
          <Link to={`/works/${id}`} title={ name }>{ name }</Link>
          <p>Published: <time { ...{ dateTime } }>{ age }</time></p>
        </figcaption>
      </figure>
    </li>
  );
};

export default Item;
