import resources from '$/resources';
import {CSSTransition, Logo, Navigation} from '@/Component';
import Style from '@/Component/CSSTransition/Core/Style';
import ICSSTransition from '@/Component/CSSTransition/spec';
import {Route} from '@/Component/Router';
import Description from '@/View/Home/Description';
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
      <CSSTransition type='slideFromLeft' in={render}>
        <Logo isSquare={true} />
      </CSSTransition>
      <Description render={render} />
      <CSSTransition type='slideDown' in={render}>
        <Navigation />
      </CSSTransition>
    </main>
  );
};

export {path, transitionType};
export default (
  <Route path={path} exact={true}>
    <Home />
  </Route>
)
