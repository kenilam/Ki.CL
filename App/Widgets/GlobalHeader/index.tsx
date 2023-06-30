import React, { useEffect } from 'react';

// Libraries
import classNames from 'classnames';

// Animation
import Animation, { ANIMATION_STYLES } from '@/Animation';

// Widgets
import { SiteLogo } from '@/Widgets';

// Components
import { CLASS_NAME as MAIN_MENU_CLASS_NAME } from './MainMenu';
import Style from './Style';

// Context
import GlobalHeaderProvider, {
  useGlobalHeaderContext,
  GLOBAL_HEADER_PARAMS,
} from './Context';

// Type
import * as Spec from './spec';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--widgets--global-header';

type Props = Omit<Spec.Props, 'minimal'>;

const Contents: React.FunctionComponent<Props> = ({ in: transitionIn }) => {
  const { deleteURLSearchParams, minimal, node, updateURLSearchParams } =
    useGlobalHeaderContext();

  useEffect(() => {
    const onClick: Parameters<typeof window.addEventListener>[1] = (event) => {
      const target = event.target as HTMLElement;

      if (!target) {
        return;
      }

      const isGlobalHeader =
        target === node.current || target.closest(`.${CLASS_NAME}`);

      const isMainMenu =
        target === document.querySelector(`.${MAIN_MENU_CLASS_NAME}`) ||
        target.closest(`.${MAIN_MENU_CLASS_NAME}`);

      if (isGlobalHeader || isMainMenu) {
        return;
      }

      deleteURLSearchParams();
      updateURLSearchParams();
    };

    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('click', onClick);
    };
  });

  const className = classNames(CLASS_NAME, {
    [`${CLASS_NAME}--is-minimal`]: minimal,
  });

  return (
    <Animation
      animationStyle={ANIMATION_STYLES['slide-from-top']}
      in={transitionIn}
    >
      <header className={className} ref={node}>
        <Style />
        <SiteLogo />
        {/* <MainMenu /> */}
      </header>
    </Animation>
  );
};

const GlobalHeader: React.FunctionComponent<Spec.Props> = ({
  minimal = true,
  ...props
}) => {
  return (
    <GlobalHeaderProvider minimal={minimal}>
      <Contents {...props} />
    </GlobalHeaderProvider>
  );
};

export { GLOBAL_HEADER_PARAMS };
export default GlobalHeader;
