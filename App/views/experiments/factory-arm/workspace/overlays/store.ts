import type { THREE } from '@/three';

const anchors = new Map<string, THREE.Object3D>();

const elements = new Map<string, HTMLElement>();

const toAnchor = (id: string) => (node: THREE.Object3D | null) => {
  if (node) {
    anchors.set(id, node);
  } else {
    anchors.delete(id);
  }
};

const toElement = (id: string) => (node: HTMLElement | null) => {
  if (node) {
    elements.set(id, node);
  } else {
    elements.delete(id);
  }
};

export { anchors, elements, toAnchor, toElement };
