// Three
import { THREE } from '@/three';

const TANGENT = new THREE.Vector3();
const VIEW = new THREE.Vector3();
const SIDE = new THREE.Vector3();

const VERTEX = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform float blur;
  uniform vec3 color;
  uniform float strength;
  varying vec2 vUv;

  void main() {
    float across = abs(vUv.y * 2.0 - 1.0);
    float core = (1.0 - smoothstep(0.0, 0.4, across)) * (1.0 - blur);
    float glow = exp(-across * across * mix(4.0, 3.0, blur));
    float fade = 1.0 - smoothstep(mix(0.55, 0.2, blur), 1.0, vUv.x);
    vec3 tint = mix(color, vec3(1.0), core * 0.7);

    gl_FragColor = vec4(tint * (core + glow * 0.6) * fade * strength, 1.0);
  }
`;

const createRibbon = (points: number): THREE.BufferGeometry => {
  const geometry = new THREE.BufferGeometry();
  const index: number[] = [];
  const uv: number[] = [];

  for (let point = 0; point < points; point += 1) {
    const along = point / (points - 1);

    uv.push(along, 0, along, 1);

    if (point < points - 1) {
      const left = point * 2;

      index.push(left, left + 1, left + 2, left + 1, left + 3, left + 2);
    }
  }

  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(points * 6), 3)
  );
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geometry.setIndex(index);

  return geometry;
};

const createTube = (strength: number, blur = 0): THREE.ShaderMaterial =>
  new THREE.ShaderMaterial({
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    fragmentShader: FRAGMENT,
    side: THREE.DoubleSide,
    transparent: true,
    uniforms: {
      blur: { value: blur },
      color: { value: new THREE.Color() },
      strength: { value: strength },
    },
    vertexShader: VERTEX,
  });

const createGlow = (): THREE.CanvasTexture => {
  const size = 128;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.width = size;
  canvas.height = size;

  if (context) {
    const gradient = context.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );

    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.45)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
  }

  return new THREE.CanvasTexture(canvas);
};

const writeRibbon = (
  geometry: THREE.BufferGeometry,
  samples: readonly THREE.Vector3[],
  eye: THREE.Vector3,
  width: number
): void => {
  const position = geometry.getAttribute('position');
  const last = samples.length - 1;

  samples.forEach((sample, index) => {
    TANGENT.subVectors(
      samples[Math.max(0, index - 1)],
      samples[Math.min(last, index + 1)]
    );
    VIEW.subVectors(eye, sample);
    SIDE.crossVectors(TANGENT, VIEW);

    if (SIDE.lengthSq() > 0) {
      SIDE.setLength(width / 2);
    }

    position.setXYZ(
      index * 2,
      sample.x + SIDE.x,
      sample.y + SIDE.y,
      sample.z + SIDE.z
    );
    position.setXYZ(
      index * 2 + 1,
      sample.x - SIDE.x,
      sample.y - SIDE.y,
      sample.z - SIDE.z
    );
  });

  position.needsUpdate = true;
};

export { createGlow, createRibbon, createTube, writeRibbon };
