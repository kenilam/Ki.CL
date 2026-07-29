import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Badge, Layout, Spinner } from '@/Components';
import { useNavigate, useParams } from '@/Router';

import { PATH_BASE } from './constants';
import DetailsPanel from './Details';
import { useTreeUniverse } from './graphStore';
import { LabelLayer } from './labels';
import Scene from './Scene';
import Search from './Search';

import './Styles.scss';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--v15';

const Canvas: React.FunctionComponent = () => {
  const { nodeId: routeNodeId } = useParams<{ nodeId?: string }>();
  const navigate = useNavigate();
  const { ensureLocalGroup, getLocalGroup, mergeNodeFields, namedNodes } =
    useTreeUniverse();
  const [resolvedRootId, setResolvedRootId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const focusId = routeNodeId ?? resolvedRootId;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    ensureLocalGroup(routeNodeId ?? null).then((result) => {
      if (cancelled) {
        return;
      }
      if (result.ready && !routeNodeId) {
        setResolvedRootId(result.rootId);
        // Spec: the bare route redirects onto the root's own node route, so
        // the URL is always the single source of truth for what's focused.
        navigate(`${PATH_BASE}/${result.rootId}`, { replace: true });
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [routeNodeId, ensureLocalGroup, navigate]);

  const group = useMemo(
    () => (focusId ? getLocalGroup(focusId) : null),
    [focusId, getLocalGroup]
  );

  /*
   * Keep the previous group on screen while the next one resolves. Rendering
   * `null` in the gap unmounted <Scene>, which tore down the whole THREE
   * scene and reset the transition bookkeeping — so navigations never
   * animated, they rebuilt, and the rebuild happening mid camera-zoom is
   * what showed up as trailing branches.
   */
  const lastGroup = useRef<typeof group>(null);
  if (group) {
    lastGroup.current = group;
  }
  const shownGroup = group ?? lastGroup.current;

  const onNavigate = useCallback(
    (nodeId: string) => {
      navigate(`${PATH_BASE}/${nodeId}`);
    },
    [navigate]
  );

  return (
    <Layout fullScreen>
      {/*
        Layout clones its single child and merges className onto it — it does
        not render a wrapper, so the styled element has to be a real DOM node.
        `kicl--theme--light` is what gives the poster background.
      */}
      <div
        className={`${CLASS_NAME} kicl--theme--light kicl-position-relative`}
      >
        {shownGroup ? (
          <Scene group={shownGroup} onNavigate={onNavigate} />
        ) : null}

        {/* Screen-space labels live outside the Canvas so they can be laid
            out against each other and against the node bodies. */}
        <LabelLayer />

        {/*
          One Layout, cloned straight onto the <header> — no intermediate
          wrappers, and no overflow anywhere on this branch of the tree, which
          is what was clipping the Details panel's plate.
        */}
        <Layout gap='narrow' justifyItems='start' alignContent='start'>
          <header className={`${CLASS_NAME}__panels kicl-position-fixed`}>
            <Search namedNodes={namedNodes} onSelect={onNavigate} />

            {group ? (
              <DetailsPanel
                node={group.current.node}
                isOrigin={group.current.depth === 0}
                onSubtree={mergeNodeFields}
              />
            ) : null}
          </header>
        </Layout>

        {/* `in` drives the enter transition — without it the Spinner mounts
            but never animates in, so it stays invisible. */}
        {/*
          Layout merges only its layout classes with the *child's* className —
          a className given to Layout itself is dropped — so the positioning
          classes have to live on the Spinner.
        */}
        <Layout justifyItems='end'>
          <Spinner
            size='small'
            in={loading}
            position='inline'
            hasBackdrop={false}
            className={`${CLASS_NAME}__status kicl-position-fixed kicl-color-grey-darker`}
          />
        </Layout>

        <Badge
          variant='outline'
          className={`${CLASS_NAME}__credit kicl-position-fixed kicl-font-size-smaller`}
        >
          v15 · scroll to explore · click a node to focus
        </Badge>
      </div>
    </Layout>
  );
};

export default Canvas;
