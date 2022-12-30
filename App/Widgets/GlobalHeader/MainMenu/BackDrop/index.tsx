import React from 'react';
import ReactDOM from 'react-dom';

// Animation
import Animation from '@/Animation';

// Context
import { useGlobalHeaderContext } from '@/Widgets/GlobalHeader/Context';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--widgets--global-header--main-menu--back-drop';

const BackDrop: React.FunctionComponent = () => {
  const { open, node } = useGlobalHeaderContext();

  if (!node.current?.parentElement) {
    return null;
  }

  return ReactDOM.createPortal(
    <Animation animationStyle='fade' in={open} unmountOnExit>
      <span className={CLASS_NAME} />
    </Animation>,
    node.current.parentElement
  );
};

export default BackDrop;
