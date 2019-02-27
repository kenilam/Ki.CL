// @flow
import React from 'react';

import { Link } from 'Component';

import { classname } from './style';

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
  const { id, name, modules } = project;
  const { src } = modules.filter(module => module.type === 'image')[0];
  const path = `/works/${id}`;

  return (
    <li className={classname}>
      <figure>
        <img src={src} alt={name} />
        <figcaption>
          <Link title={name} to={path}>
            {name}
          </Link>
        </figcaption>
      </figure>
    </li>
  );
};

Item.defaultProps = {
  project: {}
};

export default Item;
