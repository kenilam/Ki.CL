import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';

// Constants
import { BASE } from './constants';

// Spec
import type { Accent, Edge, Spec } from './spec';

// Partials
import { NodeContents } from './node-contents';
import { NodeShape } from './node-shape';

const ACCENTS: Accent[] = ['blue', 'green', 'orange', 'red', 'yellow'];

/** Polyline with rounded corners. */
const roundedPath = (points: Edge['points'], radius = 10): string => {
  if (points.length < 2) {
    return '';
  }

  let d = `M ${points[0][0]} ${points[0][1]}`;

  for (let i = 1; i < points.length - 1; i += 1) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];

    const a = [x1 - x0, y1 - y0];
    const b = [x2 - x1, y2 - y1];
    const la = Math.hypot(a[0], a[1]) || 1;
    const lb = Math.hypot(b[0], b[1]) || 1;
    const ra = Math.min(radius, la / 2);
    const rb = Math.min(radius, lb / 2);

    d += ` L ${x1 - (a[0] / la) * ra} ${y1 - (a[1] / la) * ra}`;
    d += ` Q ${x1} ${y1} ${x1 + (b[0] / lb) * rb} ${y1 + (b[1] / lb) * rb}`;
  }

  const [x, y] = points[points.length - 1];

  return `${d} L ${x} ${y}`;
};

export type DiagramState = {
  active?: string[];
  failed?: string[];
};

type Props = {
  spec: Spec;
  state?: DiagramState;
};

/** The SVG itself. It is hidden from assistive tech; the figure's caption describes it. */
const Drawing: React.FunctionComponent<Props> = ({ spec, state }) => {
  const id = useId().replace(/:/g, '');
  const { description, edges, groups, height, nodes, width } = spec;

  return (
    <svg aria-hidden viewBox={`0 0 ${width} ${height}`}>
      <title>{description}</title>
      <defs>
        <marker
          id={`${id}-arrow`}
          markerHeight={8}
          markerWidth={10}
          orient='auto-start-reverse'
          refX={8}
          refY={4}
        >
          <path className={`${BASE}-arrow`} d='M 0 0 L 9 4 L 0 8 Z' />
        </marker>
        {ACCENTS.map((accent) => (
          <marker
            id={`${id}-arrow-${accent}`}
            key={accent}
            markerHeight={8}
            markerWidth={10}
            orient='auto-start-reverse'
            refX={8}
            refY={4}
          >
            <path
              className={`${BASE}-arrow ${BASE}-arrow--${accent}`}
              d='M 0 0 L 9 4 L 0 8 Z'
            />
          </marker>
        ))}
      </defs>
      {groups?.map((group) => (
        <React.Fragment key={group.label}>
          <rect
            className={`${BASE}-group`}
            height={group.h}
            rx={10}
            width={group.w}
            x={group.x}
            y={group.y}
          />
          <text
            className={`${BASE}-group-label`}
            x={group.x + 14}
            y={group.y + 22}
          >
            {group.label}
          </text>
        </React.Fragment>
      ))}
      {edges.map((edge, index) => {
        const marker = edge.accent
          ? `${id}-arrow-${edge.accent}`
          : `${id}-arrow`;

        return (
          <React.Fragment key={index}>
            <path
              className={classNames(`${BASE}-edge`, {
                [`${BASE}-edge--${edge.accent}`]: edge.accent,
                [`${BASE}-edge--dashed`]: edge.dashed,
              })}
              d={roundedPath(edge.points)}
              markerEnd={`url(#${marker})`}
              markerStart={edge.both ? `url(#${marker})` : undefined}
            />
            {edge.label && (
              <text
                className={`${BASE}-edge-label`}
                textAnchor={edge.anchor || 'middle'}
                x={edge.lx}
                y={edge.ly}
              >
                {edge.label}
              </text>
            )}
          </React.Fragment>
        );
      })}
      {nodes.map((node) => {
        const modifier =
          node.id && state?.failed?.includes(node.id)
            ? 'failed'
            : node.id && state?.active?.includes(node.id)
              ? 'active'
              : undefined;

        return (
          <React.Fragment key={`${node.title}-${node.x}-${node.y}`}>
            <NodeShape modifier={modifier} node={node} />
            <NodeContents node={node} />
          </React.Fragment>
        );
      })}
    </svg>
  );
};

export { Drawing };
