import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Icons
import * as Icons from 'design/icons';

// Components
import { AnimatedText, Heading, HyperLink, Layout } from 'design/components';

const Contents: React.FunctionComponent = () => {
  const { t } = useTranslation('home');

  return (
    <>
      <Heading
        className={classNames('kicl-font-size-largest', 'kicl-z-index-raised')}
        is='h1'
      >
        {/* A box of its own, so the logo isn't set on the heading's text line. */}
        <Layout display='inline-grid'>
          <HyperLink aria-label={t('header.contents.home')} to='/' unstyled>
            <Icons.Logo />
          </HyperLink>
        </Layout>
      </Heading>
      <Layout gap='narrow'>
        <section>
          <AnimatedText
            delay={1000}
            dense
            duration='slower'
            easing='ease-sine-in'
            property='slide-from-bottom'
            className='kicl-z-index-raised'
          >
            {t('header.contents.lead')}
          </AnimatedText>
          <AnimatedText
            delay={1000}
            dense
            duration='slower'
            easing='ease-sine-in'
            property='slide-from-bottom'
            className='kicl-z-index-raised'
          >
            {t('header.contents.body')}
          </AnimatedText>
        </section>
      </Layout>
    </>
  );
};

export { Contents };
