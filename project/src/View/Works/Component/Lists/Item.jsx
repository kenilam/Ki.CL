// @flow
import React from 'react';

import { Link } from 'Component';
import { agesAgo, toDate } from 'Helper';

type Module = {
  type: string
};

type Project = {
  allow_comments: number,
  cover: string,
  description: string,
  id: number,
  modified_on: number,
  modules: Array<Module>,
  name: string,
  published_on: number,
  url: string
};

type Props = {
  project?: Project
};

const Item = ({ project }: Props) => {
  const { id, modules, name, published_on: publishedOn } = project;
  const dateTime = toDate(publishedOn, 'YYYY-MM-DD');
  const age = agesAgo(publishedOn);

  const { src } = modules.filter(module => module.type === 'image')[0];

  return (
    <li>
      <figure>
        <img src={src} alt={name} />
        <figcaption>
          <Link to={`/works/${id}`} title={name}>
            {name}
          </Link>
          <p>
            Published: <time {...{ dateTime }}>{age}</time>
          </p>
        </figcaption>
      </figure>
    </li>
  );
};

Item.defaultProps = {
  project: {}
};

export default Item;
