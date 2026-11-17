const GRID = 7;

const POSES = {
  about: {
    true: {
      ending: { across: 0, span: 0.6, up: 0 },
      opening: { across: 0.2, span: 0.5, up: -0.2 },
      timeline: { across: 0.42, span: 0.36, up: 0.05 },
    },
    false: {
      ending: { across: 0, span: 0.9, up: 0 },
      opening: { across: 0.27, span: 0.6, up: 0 },
      timeline: { across: 0.3, span: 0.5, up: 0 },
    },
  },
  resume: {
    true: {
      ending: { across: 0, span: 0.6, up: 0 },
      opening: { across: 0.2, span: 0.5, up: -0.2 },
      timeline: { across: 0.3, span: 0.28, up: 0.3 },
    },
    false: {
      ending: { across: 0, span: 0.9, up: 0 },
      opening: { across: 0.27, span: 0.6, up: 0 },
      timeline: { across: 0.3, span: 0.5, up: 0 },
    },
  },
};

const SIDES = { ltr: 1, rtl: -1 };

export { GRID, POSES, SIDES };
