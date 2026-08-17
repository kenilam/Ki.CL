import React, { useId } from 'react';

// Constants
import { CLASS_NAME } from '../constants';

// Spec
import type { Accent, Edge, Node, Spec } from './Spec';

const BASE = `${CLASS_NAME}__diagram`;

const ACCENTS: Accent[] = ['blue', 'green', 'orange', 'red', 'yellow'];

const CYLINDER_EDGE = 8;
const ROW_SIZE = 24;
const TITLE_SIZE = 30;

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

const NodeContents: React.FunctionComponent<{ node: Node }> = ({ node }) => {
  const { h, lines, rows, title, w, x, y } = node;
  const cx = x + w / 2;
  const offset = node.shape === 'cylinder' ? CYLINDER_EDGE : 0;

  if (rows) {
    return (
      <>
        <text className={`${BASE}-title`} textAnchor='middle' x={cx} y={y + 20}>
          {title}
        </text>
        <line
          className={`${BASE}-rule`}
          x1={x}
          x2={x + w}
          y1={y + TITLE_SIZE}
          y2={y + TITLE_SIZE}
        />
        {rows.map((row, index) => {
          const baseline = y + TITLE_SIZE + index * ROW_SIZE + 16;

          return (
            <React.Fragment key={row.name}>
              {index > 0 && (
                <line
                  className={`${BASE}-rule ${BASE}-rule--faint`}
                  x1={x}
                  x2={x + w}
                  y1={y + TITLE_SIZE + index * ROW_SIZE}
                  y2={y + TITLE_SIZE + index * ROW_SIZE}
                />
              )}
              <text className={`${BASE}-type`} x={x + 10} y={baseline}>
                {row.type}
              </text>
              <text className={`${BASE}-name`} x={x + 62} y={baseline}>
                {row.name}
              </text>
              {(row.key || row.note) && (
                <text
                  className={`${BASE}-key`}
                  textAnchor='end'
                  x={x + w - 10}
                  y={baseline}
                >
                  {row.key || row.note}
                </text>
              )}
            </React.Fragment>
          );
        })}
      </>
    );
  }

  const middle = y + offset + (h - offset) / 2;
  const titleY = lines?.length ? middle - (lines.length * 14) / 2 : middle + 5;

  return (
    <>
      <text className={`${BASE}-title`} textAnchor='middle' x={cx} y={titleY}>
        {title}
      </text>
      {lines?.map((line, index) => (
        <text
          className={`${BASE}-line`}
          key={line}
          textAnchor='middle'
          x={cx}
          y={titleY + 16 + index * 14}
        >
          {line}
        </text>
      ))}
    </>
  );
};

const NodeShape: React.FunctionComponent<{ modifier?: string; node: Node }> = ({
  modifier,
  node,
}) => {
  const { h, shape = 'rect', w, x, y } = node;
  const boxClassName = `${BASE}-box${modifier ? ` ${BASE}-box--${modifier}` : ''}`;

  if (shape === 'cylinder') {
    const e = CYLINDER_EDGE;

    return (
      <>
        <path
          className={boxClassName}
          d={`M ${x} ${y + e} A ${w / 2} ${e} 0 0 1 ${x + w} ${y + e} V ${y + h - e} A ${w / 2} ${e} 0 0 1 ${x} ${y + h - e} Z`}
        />
        <path
          className={`${BASE}-rule`}
          d={`M ${x} ${y + e} A ${w / 2} ${e} 0 0 0 ${x + w} ${y + e}`}
          fill='none'
        />
      </>
    );
  }

  return (
    <>
      <rect className={boxClassName} height={h} rx={8} width={w} x={x} y={y} />
      {shape === 'queue' && (
        <>
          <line
            className={`${BASE}-rule`}
            x1={x + 5}
            x2={x + 5}
            y1={y}
            y2={y + h}
          />
          <line
            className={`${BASE}-rule`}
            x1={x + w - 5}
            x2={x + w - 5}
            y1={y}
            y2={y + h}
          />
        </>
      )}
    </>
  );
};

export type DiagramState = {
  active?: string[];
  failed?: string[];
};

type Props = {
  spec: Spec;
  state?: DiagramState;
};

/**
 * Declarative SVG architecture diagram, drawn with the design system's own
 * tokens - surfaces, borders, brand accents, and the site typeface - so it
 * follows the theme instead of shipping as a static image.
 */
const Diagram: React.FunctionComponent<Props> = ({ spec, state }) => {
  const id = useId().replace(/:/g, '');
  const { description, edges, groups, height, nodes, width } = spec;

  return (
    <figure className={BASE}>
      <svg
        aria-label={description}
        role='img'
        viewBox={`0 0 ${width} ${height}`}
      >
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
                className={
                  `${BASE}-edge` +
                  (edge.accent ? ` ${BASE}-edge--${edge.accent}` : '') +
                  (edge.dashed ? ` ${BASE}-edge--dashed` : '')
                }
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
    </figure>
  );
};

export default Diagram;
