import React, { useEffect, useState } from 'react';

// Components
import { Button, Layout, Spinner, Text } from '@/Components';

// Icons
import { Ri } from '@/Icons';

// Three
import { Fiber } from '@/Three';

// Context
import { useTreeOfLifeContext } from '@/Views/Experiments/TreeOfLife/Context';

// Camera
import CameraRig from './CameraRig';

// Globe
import Globe from './Globe';

// Details
import Details from './Details';

// Labels
import { Labels, LabelProjector } from './labels';

// Search
import Search from './Search';

// Taxon
import Taxon from './Taxon';

// Constants
import {
  OFFSET_OF_VIEWPORT,
  ORIGIN,
  ROOT_COLOR,
  OPENING_DISTANCE,
  TRUNK_SIZE,
  TRUNK_WIDTH,
  WIDTH_TAPER,
} from './constants';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--v15';

const Canvas: React.FunctionComponent = () => {
  const { animate, chains, focus, loading, rooted, setAnimate } =
    useTreeOfLifeContext();

  /*
   * How far right of centre the focused taxon sits — a twentieth of the
   * viewport's shorter side.
   *
   * Proportional rather than a spacing token: this is a composition offset in a
   * 3D view, not padding between elements. A fixed 32px was a third of the
   * frame on a phone and a rounding error on a wide monitor. Taking the shorter
   * side means the nudge stays inside the frame whichever way the window is
   * turned.
   */
  const [offsetPx, setOffsetPx] = useState(0);

  useEffect(() => {
    const measure = () =>
      setOffsetPx(
        Math.min(window.innerWidth, window.innerHeight) * OFFSET_OF_VIEWPORT
      );

    measure();

    window.addEventListener('resize', measure);

    return () => window.removeEventListener('resize', measure);
  }, []);

  /*
   * `chains` runs focus → root, so the last entry is where the tree starts.
   * Nothing is drawn until it actually reaches the origin: the climb takes
   * several fetches, and the outermost node known before it lands is not the
   * root — planting on it would grow the tree from the wrong centre.
   */
  const root = rooted ? chains[chains.length - 1] : undefined;

  return (
    <>
      <Layout fullScreen>
        <div>
          <Fiber.Canvas
            camera={{ position: [0, 0, OPENING_DISTANCE], fov: 50 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            {/*
              Weighted toward ambient and sky rather than direct light. Lambert
              multiplies the base colour by whatever lands on it, so a strong
              key carves a dark underside into every body and the tree reads as
              moulded plastic.
            */}
            <ambientLight intensity={0.88} />
            <hemisphereLight args={['#ffffff', '#cfdcd5', 0.46]} />
            <directionalLight position={[4, 8, 6]} intensity={0.19} />
            <directionalLight
              position={[-6, -3, -5]}
              intensity={0.1}
              color='#dcefe6'
            />

            <Globe />

            {root ? (
              <Taxon
                key={root}
                nodeId={root}
                start={ORIGIN}
                startColor={ROOT_COLOR}
                startWidth={TRUNK_WIDTH}
                endWidth={TRUNK_WIDTH * WIDTH_TAPER}
                size={TRUNK_SIZE}
                play='enter'
              />
            ) : null}

            <LabelProjector />

            <CameraRig
              nodeId={focus}
              ancestorId={chains[1]}
              offsetPx={offsetPx}
            />
          </Fiber.Canvas>
        </div>
      </Layout>

      <Labels />

      {/*
        Both panels sit outside the Canvas, fixed to the left, so they are
        ordinary DOM — readable text at a fixed size rather than something
        projected into the scene and fighting the camera.
      */}
      <Layout
        className={`${CLASS_NAME}__chrome kicl-position-fixed kicl-inset-block-start-narrow kicl-inset-inline-start-narrow`}
        autoFlow='row'
        gap='narrow'
      >
        <div>
          <Search />
          <Details />
        </div>
      </Layout>

      {/*
        Inset from the top-right corner rather than all four sides: `Layout`
        gives the wrapper `inline-size: 100%`, so setting `inset-inline-start`
        as well would over-constrain it and push a full-width box past the right
        edge. Insetting only the end pulls the whole strip inward, and
        `justifyContent='end'` lands the control a gutter in from the corner.
      */}
      <Layout
        className={`${CLASS_NAME}__chrome kicl-position-fixed kicl-inset-block-start-narrow kicl-inset-inline-end-narrow`}
        alignItems='center'
        autoFlow='column'
        justifyContent='end'
        gap='narrower'
      >
        <div>
          {/* `in` is what drives the enter transition — without it the
              Spinner mounts but never animates, so it stays invisible. */}
          <Spinner
            size='small'
            in={loading}
            position='inline'
            hasBackdrop={false}
          />

          {/*
            Lit while the tree plays out — the icon shows the state it is
            *in*, not the state clicking it would reach.
          */}
          {/*
            `alignItems`/`gap` reach the icon and the label directly: Layout
            clones its only child rather than wrapping it, so Button's layout
            props land on the `button` element and make it the grid.
          */}
          <Button
            unstyled
            type='button'
            alignItems='center'
            gap='narrower'
            className={animate ? 'kicl-color-green' : 'kicl-color-grey-dark'}
            aria-label='Play the tree out branch by branch'
            aria-pressed={animate}
            title={
              animate
                ? 'Playing out branch by branch — click to land it at once'
                : 'Landing at once — click to play it out branch by branch'
            }
            onClick={() => setAnimate((current) => !current)}
          >
            <Ri.RiFlashlightFill aria-hidden />
            <Text is='span' dense unstyled className='kicl-font-size-small'>
              animation
            </Text>
          </Button>
        </div>
      </Layout>
    </>
  );
};

export default Canvas;
