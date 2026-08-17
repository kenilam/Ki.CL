import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout, Separator, Text } from '@/Components';

const Footer: React.FunctionComponent = () => {
  return (
    <Layout
      alignContent='center'
      alignItems='center'
      justifyContent='stretch'
      justifyItems='center'
    >
      <footer>
        <Separator />
        <Layout
          alignContent='center'
          alignItems='center'
          justifyContent='center'
          justifyItems='center'
        >
          <Text
            className={classNames(
              'kicl-font-style-italic',
              'kicl-padding-block-wider'
            )}
            is='cite'
          >
            Prepared for the Pika take-home.
          </Text>
        </Layout>
        <Separator />
        <Text
          className={classNames(
            'kicl-font-size-small',
            'kicl-letter-spacing',
            'kicl-text-align-center',
            'kicl-text-transform-uppercase'
          )}
          dense
          variant='secondary'
        >
          Keni · Ki.CL · August 2026
        </Text>
      </footer>
    </Layout>
  );
};

export default Footer;
