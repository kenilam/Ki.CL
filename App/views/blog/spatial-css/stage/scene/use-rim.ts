import { useCallback, useEffect, useMemo } from 'react';

// Three
import { THREE } from '@/three';

// Hooks
import { useColours } from './use-colours';

const POWER = 2.4;
const STRENGTH = 1.3;

const UNIFORMS = `
uniform vec3 uRimTop;
uniform vec3 uRimBottom;
uniform float uRimPower;
uniform float uRimStrength;
`;

const RIM = `
float rimFacing = 1.0 - saturate(dot(normal, normalize(vViewPosition)));
vec3 rimColour = mix(uRimBottom, uRimTop, normal.y * 0.5 + 0.5);
outgoingLight += rimColour * pow(rimFacing, uRimPower) * uRimStrength;
`;

const useRim = () => {
  const { rims } = useColours();
  const uniforms = useMemo(() => {
    return {
      uRimBottom: { value: new THREE.Color() },
      uRimPower: { value: POWER },
      uRimStrength: { value: STRENGTH },
      uRimTop: { value: new THREE.Color() },
    };
  }, []);

  useEffect(() => {
    uniforms.uRimTop.value.set(rims.back);
    uniforms.uRimBottom.value.set(rims.side);
  }, [rims, uniforms]);

  return useCallback(
    (shader: THREE.WebGLProgramParametersWithUniforms) => {
      Object.assign(shader.uniforms, uniforms);
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', `#include <common>${UNIFORMS}`)
        .replace(
          '#include <opaque_fragment>',
          `${RIM}#include <opaque_fragment>`
        );
    },
    [uniforms]
  );
};

export { useRim };
