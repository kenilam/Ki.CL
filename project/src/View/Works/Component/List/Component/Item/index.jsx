// @flow
import React, { useRef } from 'react';
import { InView } from 'react-intersection-observer';
import classnames from 'classnames';

import { Link } from 'Component';
import { withRouter } from 'Component/Router';
import { cssUnit } from 'Helper';

import State from './State';

import { rootmargin, classname, inviewclassname } from './style';

const IN_VIEW_THRESHOLD = 1;

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
  project?: Project,
  changeHandler: ({ inView: boolean, entry: {}, path: string }) => void,
  clickHandler: ({ inView: boolean, event: {} }) => void
};

const Item = ({
  location,
  project,
  inView,
  changeHandler,
  clickHandler,
  updateInView
}: Props) => {
  const node = useRef();

  const { id, name, modules } = project;
  const { src } = modules.filter(module => module.type === 'image')[0];
  const { pathname } = location;
  const path = `/works/${id}`;
  const isInView = inView.some(inViewId => inViewId === id);

  const [end, start] = [cssUnit(rootmargin), cssUnit(rootmargin)];

  console.log(end, start);

  const className = classnames(
    {
      [inviewclassname]: inView.some(inViewId => inViewId === id)
    },
    classname
  );

  const onChange = (isInView, entry) => {
    updateInView(isInView, id);

    changeHandler({
      inView: isInView && pathname !== path,
      entry,
      path
    });
  };

  const onClick = event => {
    event.preventDefault();

    clickHandler({ inView: isInView, event });
  };

  return (
    <InView
      as="li"
      className={className}
      ref={node}
      onChange={onChange}
      rootMargin={`${start}px 0px ${end}px 0px`}
      threshold={IN_VIEW_THRESHOLD}
    >
      <figure>
        <img src={src} alt={name} />
        <figcaption>
          <Link onClick={onClick} title={name} to={path}>
            {name}
          </Link>
        </figcaption>
      </figure>
    </InView>
  );
};

const Instance = withRouter(Item);

const Store = State.connecter(Instance);

const Component = ({ changeHandler, clickHandler, project }) => (
  <Store
    changeHandler={changeHandler}
    clickHandler={clickHandler}
    project={project}
  />
);

Item.defaultProps = {
  project: {}
};

export default Component;
