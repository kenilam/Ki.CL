import { hierarchy, cluster, type HierarchyPointNode } from 'd3-hierarchy';

import type { TreeNode } from '@/Views/Experiments/TreeOfLife/tree';
import { CLADE_COLORS } from '@/Views/Experiments/TreeOfLife/tree';

export type LayoutNode = {
  node: TreeNode;
  x: number;
  y: number;
  z: number;
  depth: number;
  color: string;
  expandable: boolean;
};

export type LayoutLink = {
  key: string;
  from: [number, number, number];
  to: [number, number, number];
  color: string;
};

const TWO_PI = Math.PI * 2;

function polarToCartesian(
  angle: number,
  radius: number
): [number, number, number] {
  return [
    Math.cos(angle - Math.PI / 2) * radius,
    Math.sin(angle - Math.PI / 2) * radius,
    0,
  ];
}

function cladeColor(
  point: HierarchyPointNode<TreeNode>,
  rootChildren: HierarchyPointNode<TreeNode>[]
): string {
  let current: HierarchyPointNode<TreeNode> | null = point;

  while (current?.parent && current.parent.depth > 0) {
    current = current.parent;
  }

  if (!current?.parent) {
    return CLADE_COLORS[0];
  }

  const index = rootChildren.findIndex(
    (child) => child.data.nodeId === current!.data.nodeId
  );
  return CLADE_COLORS[Math.max(0, index) % CLADE_COLORS.length];
}

export function layoutRadialTree(
  tree: TreeNode,
  radiusStep = 2.2
): { nodes: LayoutNode[]; links: LayoutLink[] } {
  const root = hierarchy(tree, (d) => d.children ?? undefined);
  const leafCount = Math.max(root.leaves().length, 1);
  const maxRadius = Math.max(root.height, 1) * radiusStep;

  const layout = cluster<TreeNode>()
    .size([TWO_PI, maxRadius])
    .separation((a, b) => (a.parent === b.parent ? 1 : 2) / leafCount);

  const points = layout(root);
  const rootChildren = points.children ?? [];

  const nodes: LayoutNode[] = [];
  const links: LayoutLink[] = [];

  points.each((point) => {
    const [x, y, z] = polarToCartesian(point.x, point.y);
    const color = cladeColor(point, rootChildren);
    const tips = point.data.numTips ?? 0;
    const expandable = tips > 1 && !point.children?.length;

    nodes.push({
      node: point.data,
      x,
      y,
      z,
      depth: point.depth,
      color,
      expandable,
    });

    if (point.parent) {
      const [px, py, pz] = polarToCartesian(point.parent.x, point.parent.y);
      links.push({
        key: `${point.parent.data.nodeId}->${point.data.nodeId}`,
        from: [px, py, pz],
        to: [x, y, z],
        color,
      });
    }
  });

  return { nodes, links };
}
