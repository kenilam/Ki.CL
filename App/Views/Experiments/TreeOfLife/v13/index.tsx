/**
 * v13 — tip-first poster with fine hairlines; no PhyloPic.
 * Subtle origin at bottom; small labels; thin organic curves.
 */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  useKicl_TreeOfLifeSubtree,
  useKicl_TreeOfLifeSubtreeLazyQuery,
} from 'api/provider';

import { Spinner, Text } from '@/Components';

import {
  type TreeNode,
  ROOT_OTT_ID,
  mergeSubtree,
  labelFor,
} from '@/Views/Experiments/TreeOfLife/tree';
import {
  computePosterLayout,
  HEIGHT_LIMIT_DEFAULT,
  type LayoutNode,
  type ViewportSize,
} from './layoutEngine';

import './Styles.scss';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--v13';

type Camera = {
  x: number;
  y: number;
  scale: number;
};

const PosterTree: React.FunctionComponent<{
  layout: ReturnType<typeof computePosterLayout>;
  expandingId: string | null;
  onExpand: (node: LayoutNode) => void;
}> = ({ layout, expandingId, onExpand }) => {
  const origin = layout.nodes.find(
    (n) =>
      n.isOrigin &&
      (n.node.ottId === ROOT_OTT_ID || n.node.nodeId === `ott${ROOT_OTT_ID}`)
  );

  return (
    <g>
      {layout.branches.map((branch) => (
        <path
          key={branch.id}
          className={`${CLASS_NAME}__branch`}
          d={branch.path}
          stroke={branch.color}
          strokeWidth={branch.strokeWidth}
        />
      ))}

      {layout.nodes
        .filter((n) => !n.isOrigin && !n.isTip)
        .map((n) => {
          const [x, y] = n.position;
          return (
            <circle
              key={`internal-${n.id}`}
              cx={x}
              cy={y}
              r={n.markerRadius}
              fill={n.color}
              opacity={0.85}
            />
          );
        })}

      {layout.nodes
        .filter((n) => !n.isOrigin && (n.isTip || n.expandable))
        .map((n) => {
          const [x, y] = n.position;
          const expanding = expandingId === n.id;
          return (
            <g
              key={`tip-${n.id}`}
              className={[
                `${CLASS_NAME}__tip`,
                n.expandable ? `${CLASS_NAME}__tip--expandable` : '',
              ]
                .filter(Boolean)
                .join(' ')}
              transform={`translate(${x}, ${y})`}
              onClick={(event) => {
                if (!n.expandable) {
                  return;
                }
                event.stopPropagation();
                onExpand(n);
              }}
            >
              <circle
                r={expanding ? n.markerRadius * 1.5 : n.markerRadius}
                fill={expanding ? 'var(--kicl-color-green)' : n.color}
              />
            </g>
          );
        })}

      {origin ? (
        <g
          transform={`translate(${origin.position[0]}, ${origin.position[1]})`}
        >
          <ellipse
            className={`${CLASS_NAME}__origin-halo kicl-fill-green`}
            rx={origin.markerRadius * 2.2}
            ry={origin.markerRadius * 1.5}
          />
          <ellipse
            className={`${CLASS_NAME}__origin-core kicl-fill-green`}
            rx={origin.markerRadius * 1.15}
            ry={origin.markerRadius * 0.85}
          />
          <text
            className={`${CLASS_NAME}__origin-label kicl-font-family kicl-font-weight kicl-font-size-smallest kicl-fill-green`}
            textAnchor='middle'
            y={origin.markerRadius * 3.2}
          >
            Origin of life
          </text>
        </g>
      ) : null}

      {layout.nodes
        .filter((n) => n.showLabel && !n.isOrigin)
        .map((n) => {
          const text = labelFor(n.node);
          if (!text) {
            return null;
          }
          const [x, y] = n.position;
          return (
            <text
              key={`label-${n.id}`}
              className={`${CLASS_NAME}__label kicl-font-family kicl-font-weight kicl-fill-grey-darker`}
              x={x}
              y={y - 5}
              textAnchor='middle'
              fontSize={n.fontSize}
              fill={n.color}
            >
              {text}
            </text>
          );
        })}
    </g>
  );
};

const MapStage: React.FunctionComponent<{
  tree: TreeNode;
  viewport: ViewportSize;
  expandingId: string | null;
  onExpand: (node: LayoutNode) => void;
}> = ({ tree, viewport, expandingId, onExpand }) => {
  const layout = useMemo(
    () => computePosterLayout(tree, viewport),
    [tree, viewport.width, viewport.height]
  );

  const rootOffsetY = viewport.height * 0.44;
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, scale: 1 });
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const onWheel = useCallback((event: React.WheelEvent<SVGSVGElement>) => {
    event.preventDefault();
    const delta = event.deltaY > 0 ? 0.9 : 1.1;
    setCamera((current) => ({
      ...current,
      scale: Math.min(3.2, Math.max(0.4, current.scale * delta)),
    }));
  }, []);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<SVGSVGElement>) => {
      if (event.button !== 0) {
        return;
      }
      dragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        originX: camera.x,
        originY: camera.y,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [camera.x, camera.y]
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<SVGSVGElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) {
        return;
      }
      setCamera((current) => ({
        ...current,
        x: drag.originX + (event.clientX - drag.startX) / current.scale,
        y: drag.originY + (event.clientY - drag.startY) / current.scale,
      }));
    },
    []
  );

  const onPointerUp = useCallback(
    (event: React.PointerEvent<SVGSVGElement>) => {
      if (dragRef.current?.pointerId === event.pointerId) {
        dragRef.current = null;
      }
    },
    []
  );

  const halfW = viewport.width / 2;
  const halfH = viewport.height / 2;

  return (
    <svg
      className={`${CLASS_NAME}__svg`}
      viewBox={`${-halfW} ${-halfH} ${viewport.width} ${viewport.height}`}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <g
        transform={
          `translate(${camera.x * camera.scale}, ${camera.y * camera.scale}) ` +
          `scale(${camera.scale}) ` +
          `translate(0, ${rootOffsetY})`
        }
      >
        <PosterTree
          layout={layout}
          expandingId={expandingId}
          onExpand={onExpand}
        />
      </g>
    </svg>
  );
};

const Canvas: React.FunctionComponent = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState<ViewportSize>({
    width: 960,
    height: 640,
  });
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [expandingId, setExpandingId] = useState<string | null>(null);

  const { data, loading, error } = useKicl_TreeOfLifeSubtree({
    variables: {
      ottId: ROOT_OTT_ID,
      heightLimit: HEIGHT_LIMIT_DEFAULT,
    },
  });

  const [fetchSubtree] = useKicl_TreeOfLifeSubtreeLazyQuery();

  useEffect(() => {
    const root = data?.TreeOfLifeSubtree;
    if (!root?.nodeId) {
      return;
    }
    setTree((current) => current ?? (root as TreeNode));
  }, [data]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) {
      return undefined;
    }

    const update = () => {
      const rect = el.getBoundingClientRect();
      setViewport({
        width: Math.max(rect.width, 1),
        height: Math.max(rect.height, 1),
      });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const onExpand = async (layoutNode: LayoutNode) => {
    if (expandingId) {
      return;
    }

    setExpandingId(layoutNode.id);
    const { node } = layoutNode;

    try {
      const result = await fetchSubtree({
        variables: node.ottId
          ? { ottId: node.ottId, heightLimit: HEIGHT_LIMIT_DEFAULT }
          : { nodeId: node.nodeId, heightLimit: HEIGHT_LIMIT_DEFAULT },
      });

      const subtree = result.data?.TreeOfLifeSubtree as TreeNode | undefined;
      if (subtree?.nodeId) {
        setTree((current) =>
          current ? mergeSubtree(current, subtree) : subtree
        );
      }
    } finally {
      setExpandingId(null);
    }
  };

  if (error) {
    return (
      <Text className={`${CLASS_NAME}__error kicl-color-error`}>
        {error.message}
      </Text>
    );
  }

  if (loading && !tree) {
    return <Spinner />;
  }

  if (!tree) {
    return null;
  }

  return (
    <div className={CLASS_NAME}>
      <div className={`${CLASS_NAME}__stage`} ref={stageRef}>
        <MapStage
          tree={tree}
          viewport={viewport}
          expandingId={expandingId}
          onExpand={onExpand}
        />
      </div>
      <Text
        className={`${CLASS_NAME}__hint kicl-font-size-smaller kicl-color-grey-dark kicl-text-align-center`}
      >
        v13 · tip-first · fine branches · drag / zoom / click tips to expand
      </Text>
    </div>
  );
};

export default Canvas;
