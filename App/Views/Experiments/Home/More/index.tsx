import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from '@/Components';

// Partials
import Words from '@/Views/Experiments/Home/Words';

// Styles
import './Styles.scss';

// Constants
import { PATH as EXPERIMENTS } from '@/Views/Experiments/constants';
import { CLASS_NAME as HOME } from '@/Views/Experiments/Home/constants';

const CLASS_NAME = `${HOME}__more`;

const COPY = {
  bookmark: 'Bookmark this page',
  title: 'More to come',
};

/** The closing section, in normal flow after the stage. */
const More: React.FunctionComponent = () => (
  <section className={classNames(CLASS_NAME, 'kicl-position-relative')}>
    <Layout alignContent='center' autoFlow='row' gap='none'>
      <div className={`${CLASS_NAME}__body`}>
        <Words
          align='center'
          link={{ label: COPY.bookmark, to: `/${EXPERIMENTS}` }}
          title={COPY.title}
          titleIs='h2'
        />
      </div>
    </Layout>
  </section>
);

export { CLASS_NAME };
export default More;
