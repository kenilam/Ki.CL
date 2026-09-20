import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, HyperLink, Layout, Text } from '@/Components';

// Styles
import './Styles.scss';

// Constants
import { CLASS_NAME as HOME } from '@/Views/Experiments/Home/constants';

const CLASS_NAME = `${HOME}__words`;

type Props = {
  /** Where the block sits in its box. */
  align?: 'center' | 'end';
  description?: string;
  /** Small, tracked, above the title. */
  label?: string;
  link: { label: string; to: string };
  title: string;
  titleIs: 'h1' | 'h2';
};

/** A label, a display-size title, a description and a button-like link. */
const Words: React.FunctionComponent<Props> = ({
  align = 'end',
  description,
  label,
  link,
  title,
  titleIs,
}) => (
  <Layout alignContent={align} autoFlow='row' gap='narrow'>
    <span className={classNames(CLASS_NAME, 'kicl-pointer-events-auto')}>
      {label ? (
        <Text
          is='span'
          dense
          variant='secondary'
          className={classNames(
            `${CLASS_NAME}__label`,
            'kicl-font-size-small',
            'kicl-text-transform-uppercase'
          )}
        >
          {label}
        </Text>
      ) : null}
      <Heading
        is={titleIs}
        dense
        className={classNames(
          `${CLASS_NAME}__title`,
          'kicl-text-transform-uppercase'
        )}
      >
        {title}
      </Heading>
      {description ? (
        <Text
          is='p'
          dense
          className={classNames(
            `${CLASS_NAME}__description`,
            'kicl-font-size-small'
          )}
        >
          {description}
        </Text>
      ) : null}
      <HyperLink className={`${CLASS_NAME}__link`} lookLikeButton to={link.to}>
        {link.label}
      </HyperLink>
    </span>
  </Layout>
);

export { CLASS_NAME };
export default Words;
