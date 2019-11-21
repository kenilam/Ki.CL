import resources from '$/resources';
import Style from '@/Component/CSSTransition/Core/Style';
import ICSSTransition from '@/Component/CSSTransition/spec';
import {Route} from '@/Component/Router';
import Logo from '@/View/Home/Logo';
import Navigation from '@/View/Home/Navigation';
import Slogan from '@/View/Home/Slogan';
import IHome from '@/View/Home/spec';
import React, {useEffect, useRef, useState} from 'react';
import './Style';

const transitionType: ICSSTransition.Type = 'fade';

const {
  view: {
    home: {
      path
    }
  }
} = resources;

const Home: React.FunctionComponent<IHome.Props> = () => {
  const ref = useRef<HTMLElement>();
  const [render, shouldRenderChildren] = useState(false);
  
  let onEnterState = false;
  
  const onMutate: MutationCallback = (mutationList) => {
    mutationList.forEach(
      ({type, target}) => {
        if (type !== 'attributes') {
          return;
        }
        
        if (onEnterState && (target as HTMLElement).classList.length === 0) {
          shouldRenderChildren(onEnterState);
          return;
        }
        
        if (
          (target as HTMLElement).classList.contains(Style.exit)
        ) {
          shouldRenderChildren(false);
          return;
        }
        
        onEnterState = (
          (target as HTMLElement).classList.contains(Style.enterActive) ||
          (target as HTMLElement).classList.contains(Style.appearActive)
        );
      }
    )
  };
  
  useEffect(() => {
    const {current} = ref;
    
    const observer = new MutationObserver(onMutate);
    
    observer.observe(current, {attributes: true});
    
    return () => {
      observer.disconnect();
    }
  }, [render]);
  
  return (
    <main data-routes='home' ref={ref}>
      <Logo render={render} />
      <Slogan render={render} />
      <Navigation render={render} />
    </main>
  );
};

export {path, transitionType};
export default (
  <Route path={path} exact={true}>
    <Home />
  </Route>
)
