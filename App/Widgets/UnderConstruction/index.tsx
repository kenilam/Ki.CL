import React from 'react';

// Components
import { Heading, Paragraph } from '@/Components';

// Type
import * as Spec from './spec';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--widgets--under-construction';

const UnderConstruction: React.FunctionComponent<Spec.Props> = ({
  children,
  heading = 'Under Construction.',
}) => {
  return (
    <section className={CLASS_NAME}>
      <Heading is='h1'>{heading}</Heading>
      <Paragraph>Please check back for an update soon.</Paragraph>
      {children}
    </section>
  );
};

export default UnderConstruction;
