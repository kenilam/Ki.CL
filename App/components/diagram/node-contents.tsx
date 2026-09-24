import React from 'react';

// Constants
import { BASE, CYLINDER_EDGE } from './constants';

// Spec
import type { Node } from './spec';

const ICON_SIZE = 14;
const ROW_SIZE = 24;
const TITLE_SIZE = 30;

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
          const Icon = row.icon;

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
              {Icon ? (
                <Icon
                  className={`${BASE}-icon`}
                  size={ICON_SIZE}
                  x={x + 10}
                  y={baseline - ICON_SIZE + 3}
                />
              ) : row.type ? (
                <text className={`${BASE}-type`} x={x + 10} y={baseline}>
                  {row.type}
                </text>
              ) : null}
              <text
                className={`${BASE}-name`}
                x={x + (Icon ? 10 + ICON_SIZE + 10 : row.type ? 62 : 10)}
                y={baseline}
              >
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

export { NodeContents };
