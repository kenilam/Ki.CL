import * as ICanvas from './spec';
import React, {useCallback} from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

const FOV = 75;
const NEAR = 0.1;
const FAR = 1000;
const RENDERER = { antialias: true };

const Canvas: React.FunctionComponent<ICanvas.Props> = () => {
  const ref = useCallback(
    (node: HTMLDivElement) => {
      if (!node) {
        return;
      }
      
      const {
        clientHeight: height,
        clientWidth: width
      } = node;
      
      const aspect = width / height;
  
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        FOV, aspect,  NEAR,  FAR
      );
      const renderer = new THREE.WebGLRenderer(RENDERER);
      
      const { domElement } = renderer;
      
      const controls = new OrbitControls(
        camera,
        domElement
      );
      
      renderer.setSize(width, height);
      node.appendChild(domElement);
    },
    [] as React.DependencyList
  );
  
  return (
    <div ref={ref} />
  )
};

export default Canvas;
