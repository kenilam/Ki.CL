/**
 * v14 — botanical growth poster (archived).
 * Connections grow, then their node appears; children only start after the
 * parent node has finished. Existing geometry/colour stays pinned on expand;
 * new nodes take a related shade from the parent's spectrum.
 *
 * Active experiment is v15 — this folder is kept as a frozen reference.
 */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  useQuery,
  Kicl_TreeOfLifeSubtreeDocument,
  useLazyQuery,
  Kicl_TreeOfLifeSubtreesDocument,
} from 'api/provider';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm } from 'react-hook-form';

import {
  Badge,
  BadgeLabel,
  Button,
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
  Details,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Layout,
  Spinner,
  Switch,
  SwitchLabel,
  Text,
} from '@/Components';
import { Ri } from '@/Icons';

import {
  type TreeNode,
  fromSubtreeNode,
  mergeSubtree,
  labelFor,
  labelWithRank,
  displayRank,
  isTerminalRank,
  collectExpandableTips,
  pickExpandBatch,
} from '@/Views/Experiments/TreeOfLife/tree';
import { ControlsSchema, type ControlsValues } from './autoModeSchema';
import TaxonVisualPanel from '@/Views/Experiments/TreeOfLife/TaxonVisual';
import TreeWebGL from './TreeWebGL';
import {
  computePosterLayout,
  HEIGHT_LIMIT_DEFAULT,
  type LayoutNode,
  type LayoutResult,
  type ViewportSize,
} from './layoutEngine';
import './Styles.scss';

/** Keep ≤ Backend `MAX_SUBTREES_BATCH` (TreeOfLifeSubtrees validation). */
const AUTO_BATCH_SIZE = 32;
const AUTO_BATCH_DEBOUNCE_MS = 400;

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--v14';

/** Branch draws, then pedicel, then node; children wait for that full beat. */
const BRANCH_MS = 520;
const PEDICEL_MS = 280;
const NODE_MS = 220;

/**
 * Active focus group: hovered/clicked node, its ancestors (spine), and its
 * descendants (clade). Appends outside this group stay blurred while growing.
 */
function focusGroupIds(
  layout: LayoutResult,
  focusId: string | null
): ReadonlySet<string> | null {
  if (!focusId) {
    return null;
  }
  const byId = new Map(layout.nodes.map((n) => [n.id, n]));
  if (!byId.has(focusId)) {
    return null;
  }
  const group = new Set<string>();
  let current: string | null = focusId;
  while (current) {
    group.add(current);
    current = byId.get(current)?.parentId ?? null;
  }
  layout.nodes.forEach((n) => {
    let parentId = n.parentId;
    while (parentId) {
      if (parentId === focusId) {
        group.add(n.id);
        break;
      }
      parentId = byId.get(parentId)?.parentId ?? null;
    }
  });
  return group;
}

/** Focus node + all loaded descendants (not ancestors). */
function cladeIds(layout: LayoutResult, focusId: string): Set<string> {
  const byId = new Map(layout.nodes.map((n) => [n.id, n]));
  const ids = new Set<string>([focusId]);
  if (!byId.has(focusId)) {
    return ids;
  }
  layout.nodes.forEach((n) => {
    let parentId = n.parentId;
    while (parentId) {
      if (parentId === focusId) {
        ids.add(n.id);
        break;
      }
      parentId = byId.get(parentId)?.parentId ?? null;
    }
  });
  return ids;
}

/**
 * Camera target for a click/search: leaf → node centre; clade → fit the
 * bounding box of the node and its loaded descendants.
 */
function cameraTargetForFocus(
  layout: LayoutResult,
  focusId: string,
  viewport: ViewportSize,
  rootOffsetY: number,
  currentScale: number,
  clampScale: (scale: number) => number
): { x: number; y: number; scale: number } | null {
  const focus = layout.nodes.find((n) => n.id === focusId);
  if (!focus) {
    return null;
  }

  const ids = cladeIds(layout, focusId);
  const hasDescendants = ids.size > 1;

  if (!hasDescendants) {
    const [nx, ny] = focus.position;
    if (focus.isOrigin) {
      return {
        x: 0,
        y: 0,
        scale: clampScale(Math.max(currentScale * 1.85, 1.85)),
      };
    }
    return {
      x: -nx,
      y: -(ny + rootOffsetY),
      scale: clampScale(Math.max(currentScale * 1.85, 1.85)),
    };
  }

  const fit = fitCameraForNodes(
    layout.nodes.filter((n) => ids.has(n.id)),
    viewport,
    rootOffsetY
  );
  if (!fit) {
    return null;
  }
  return {
    x: fit.x,
    y: fit.y,
    scale: clampScale(fit.scale),
  };
}

/** Whitespace kept around a fitted tree on every side. */
const FIT_PAD_REM = 4;

function remToPx(rem: number): number {
  if (typeof window === 'undefined') {
    return rem * 16;
  }
  const root = Number.parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  return rem * (Number.isFinite(root) && root > 0 ? root : 16);
}

/** Scale/pan that frames the given nodes inside the viewport (with padding). */
function fitCameraForNodes(
  nodes: LayoutNode[],
  viewport: ViewportSize,
  rootOffsetY: number,
  padRem = FIT_PAD_REM
): { x: number; y: number; scale: number } | null {
  if (!nodes.length) {
    return null;
  }

  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  const include = (point: [number, number], radius = 0) => {
    const [x, y] = point;
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      return;
    }
    if (x - radius < minX) minX = x - radius;
    if (x + radius > maxX) maxX = x + radius;
    if (y - radius < minY) minY = y - radius;
    if (y + radius > maxY) maxY = y + radius;
  };
  nodes.forEach((n) => {
    include(n.position, n.markerRadius);
    include(n.markerPosition, n.markerRadius);
  });

  if (!Number.isFinite(minX) || !Number.isFinite(maxX)) {
    return null;
  }

  const width = Math.max(48, maxX - minX);
  const height = Math.max(48, maxY - minY);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const padPx = remToPx(padRem);
  const availW = Math.max(48, viewport.width - 2 * padPx);
  const availH = Math.max(48, viewport.height - 2 * padPx);
  const fit = Math.min(availW / width, availH / height);
  return {
    x: -cx,
    y: -(cy + rootOffsetY),
    scale: fit,
  };
}

type Camera = {
  x: number;
  y: number;
  scale: number;
};

function growthDuration(growthDepth: number): number {
  return Math.max(1, growthDepth) * (BRANCH_MS + PEDICEL_MS + NODE_MS) + 64;
}

/** Longest entrance beat for the current layout (initial root grow, etc.). */
function maxGrowthDuration(layout: LayoutResult | null): number {
  const nodes = layout?.nodes;
  if (!nodes?.length) {
    return 0;
  }
  let max = 0;
  for (let i = 0; i < nodes.length; i += 1) {
    const depth = Math.max(1, nodes[i]!.growthDepth || nodes[i]!.depth || 1);
    max = Math.max(max, growthDuration(depth));
  }
  return max;
}

const CAMERA_MAX_SCALE = 3.2;
const CAMERA_RECENTER_DURATION_MS = 520;

const MapStage: React.FunctionComponent<{
  tree: TreeNode;
  viewport: ViewportSize;
  expandingIds: ReadonlySet<string>;
  centerOnId: string | null;
  pinnedId: string | null;
  /** Search selection locks highlight — ignore hover/click focus until reset. */
  focusLocked: boolean;
  onPinnedIdChange: (id: string | null) => void;
  onCentered: () => void;
  onNodeClick: (node: LayoutNode) => void;
  onFocusChange: (id: string | null) => void;
  onHoverChange: (id: string | null) => void;
  onLayoutChange: (layout: LayoutResult) => void;
  autoMode: boolean;
  onAutoModeChange: (enabled: boolean) => void;
  networkBusy: boolean;
}> = ({
  tree,
  viewport,
  expandingIds,
  centerOnId,
  pinnedId,
  focusLocked,
  onPinnedIdChange,
  onCentered,
  onNodeClick,
  onFocusChange,
  onHoverChange,
  onLayoutChange,
  autoMode,
  onAutoModeChange,
  networkBusy,
}) => {
  const previousLayoutRef = useRef<LayoutResult | null>(null);
  const liveLayoutRef = useRef<LayoutResult | null>(null);
  const previousTreeRef = useRef<TreeNode | null>(null);
  const layout = useMemo(() => {
    const treeChanged = previousTreeRef.current !== tree;
    const next = computePosterLayout(tree, viewport, previousLayoutRef.current);

    const settled: LayoutResult = {
      ...next,
      nodes: next.nodes.map((n) =>
        n.isNew ? { ...n, isNew: false, growthDepth: 0 } : n
      ),
      branches: next.branches.map((b) =>
        b.isNew ? { ...b, isNew: false, growthDepth: 0 } : b
      ),
    };

    previousTreeRef.current = tree;
    // Always keep pin snapshot settled for the next expand.
    previousLayoutRef.current = settled;

    if (treeChanged) {
      liveLayoutRef.current = next;
      return next;
    }

    // Viewport-only recompute: if an entrance animation is in flight, keep
    // the live layout so isNew flags (and the clock) are not wiped mid-way.
    const live = liveLayoutRef.current;
    if (
      live &&
      (live.nodes.some((n) => n.isNew) || live.branches.some((b) => b.isNew))
    ) {
      return live;
    }

    liveLayoutRef.current = settled;
    return settled;
  }, [tree, viewport.width, viewport.height]);

  useEffect(() => {
    onLayoutChange(layout);
  }, [layout, onLayoutChange]);

  // Bottom-anchored origin — must match layoutEngine's bottomPad (5%).
  const rootOffsetY = viewport.height * 0.45;
  const windButtonRef = useRef<HTMLButtonElement>(null);
  const blowGustRef = useRef<() => void>(() => {});
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, scale: 1 });
  const cameraRef = useRef(camera);
  cameraRef.current = camera;
  /** Lowest zoom allowed — drops as the tree grows so the full canopy can fit. */
  const minScaleRef = useRef(1);
  const viewportSizeRef = useRef(viewport);

  // Viewport resize remaps layout into the new aspect — reset the camera so the
  // tree fills the frame instead of keeping a stale pan/zoom from the old size.
  useLayoutEffect(() => {
    const prev = viewportSizeRef.current;
    viewportSizeRef.current = viewport;
    if (prev.width === viewport.width && prev.height === viewport.height) {
      return;
    }
    setCamera({ x: 0, y: 0, scale: 1 });
    minScaleRef.current = 1;
  }, [viewport.width, viewport.height]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  // Search lock keeps the highlight pinned; hover only drives the name label.
  const focusId = focusLocked ? pinnedId : (hoveredId ?? pinnedId);
  const labelId = useMemo(() => {
    if (!focusLocked) {
      return focusId;
    }
    // Locked: prefer a hovered node on the active chain, else the selection.
    if (hoveredId && pinnedId) {
      const chain = focusGroupIds(layout, pinnedId);
      if (chain?.has(hoveredId)) {
        return hoveredId;
      }
    }
    return pinnedId;
  }, [focusLocked, focusId, hoveredId, pinnedId, layout]);
  const focusIds = useMemo(
    () => focusGroupIds(layout, focusId),
    [layout, focusId]
  );

  const clampScale = useCallback((scale: number) => {
    const min = minScaleRef.current;
    return Math.min(CAMERA_MAX_SCALE, Math.max(min, scale));
  }, []);

  const onCameraChange = useCallback((next: Camera) => {
    setCamera(next);
  }, []);

  const onBackdropClick = useCallback(() => {
    if (!focusLocked) {
      onPinnedIdChange(null);
    }
  }, [focusLocked, onPinnedIdChange]);

  const blowGust = useCallback(() => {
    blowGustRef.current();
  }, []);

  useEffect(() => {
    onFocusChange(focusId);
  }, [focusId, onFocusChange]);

  // Keep the zoom-out floor at “full tree + 4rem pad” — raise or lower with the
  // canopy so we never get stuck over-zoomed when the layout shrinks.
  useEffect(() => {
    const fit = fitCameraForNodes(layout.nodes, viewport, rootOffsetY);
    if (!fit) {
      return;
    }
    const prevMin = minScaleRef.current;
    const nextMin = Math.min(fit.scale, 1);
    minScaleRef.current = nextMin;

    setCamera((current) => {
      // Past the floor (e.g. after prune): pull back in so the tree fills again.
      if (current.scale < nextMin - 0.001) {
        return { x: fit.x, y: fit.y, scale: nextMin };
      }
      // At the floor while the canopy outgrew the frame: follow outward.
      if (current.scale <= prevMin + 0.001 && nextMin < prevMin - 0.001) {
        return { x: fit.x, y: fit.y, scale: nextMin };
      }
      return current;
    });
  }, [layout, viewport, rootOffsetY]);

  const handleHover = useCallback(
    (id: string | null) => {
      setHoveredId(id);
      // Sync pause immediately — don't wait for focusId → useEffect.
      onHoverChange(id);
    },
    [onHoverChange]
  );

  const handleNodeClick = useCallback(
    (node: LayoutNode) => {
      if (focusLocked) {
        // Re-select within the active search chain — updates dropdown + pin,
        // and still expands/fetches when the node is expandable.
        if (pinnedId) {
          const chain = focusGroupIds(layout, pinnedId);
          if (chain?.has(node.id)) {
            onPinnedIdChange(node.id);
            onNodeClick(node);
          }
        }
        return;
      }
      onPinnedIdChange(node.id);
      onNodeClick(node);
    },
    [focusLocked, layout, pinnedId, onNodeClick, onPinnedIdChange]
  );

  // Ease the camera to the clicked clade (or leaf node). Re-runs when layout
  // gains descendants from a fetch so the frame stays around the full group.
  useEffect(() => {
    if (!centerOnId) {
      return undefined;
    }
    const target = cameraTargetForFocus(
      layout,
      centerOnId,
      viewport,
      rootOffsetY,
      cameraRef.current.scale,
      clampScale
    );
    if (!target) {
      return undefined;
    }

    const from = cameraRef.current;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / CAMERA_RECENTER_DURATION_MS);
      const ease = 1 - (1 - t) ** 3;
      setCamera({
        x: from.x + (target.x - from.x) * ease,
        y: from.y + (target.y - from.y) * ease,
        scale: from.scale + (target.scale - from.scale) * ease,
      });
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        onCentered();
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [centerOnId, layout, viewport, rootOffsetY, onCentered, clampScale]);

  return (
    <>
      <TreeWebGL
        layout={layout}
        viewport={viewport}
        camera={camera}
        rootOffsetY={rootOffsetY}
        expandingIds={expandingIds}
        focusIds={focusIds}
        selectedId={focusId}
        pinnedId={pinnedId}
        labelId={labelId}
        clampScale={clampScale}
        onCameraChange={onCameraChange}
        onHover={handleHover}
        onNodeClick={handleNodeClick}
        onBackdropClick={onBackdropClick}
        windButtonRef={windButtonRef}
        blowGustRef={blowGustRef}
      />

      <div className={`${CLASS_NAME}__toolbar kicl-position-fixed`}>
        <Spinner
          size='small'
          in={networkBusy}
          position='inline'
          hasBackdrop={false}
          className={`${CLASS_NAME}__status kicl-color-grey-darker`}
        />
        <Switch
          size='sm'
          checked={autoMode}
          onCheckedChange={onAutoModeChange}
          title='Keep growing expandable tips automatically'
        >
          <SwitchLabel>Grow</SwitchLabel>
        </Switch>
        <Button
          ref={windButtonRef}
          unstyled
          type='button'
          className={`${CLASS_NAME}__wind-blow kicl-color-grey-dark`}
          aria-label='Force a strong gust of wind'
          aria-pressed={false}
          title='Force a gust'
          onClick={blowGust}
        >
          <Ri.RiWindyLine aria-hidden />
        </Button>
      </div>
    </>
  );
};

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });

const Canvas: React.FunctionComponent = () => {
  const ref = {
    root: useRef<HTMLDivElement>(null),
    expandingIds: useRef<Set<string>>(new Set()),
    layout: useRef<LayoutResult | null>(null),
    layoutWaiters: useRef<Array<() => void>>([]),
    autoAttempted: useRef<Set<string>>(new Set()),
    autoGeneration: useRef(0),
    autoMode: useRef(true),
    autoPaused: useRef(false),
    pausedByNodeFocus: useRef(false),
    pausedByHover: useRef(false),
    pausedByWindowBlur: useRef(false),
    tree: useRef<TreeNode | null>(null),
  };
  const [viewport, setViewport] = useState<ViewportSize>(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 960,
    height: typeof window !== 'undefined' ? window.innerHeight : 640,
  }));
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [expandingIds, setExpandingIds] = useState<ReadonlySet<string>>(
    () => new Set()
  );
  const [centerOnId, setCenterOnId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [layoutEpoch, setLayoutEpoch] = useState(0);

  const syncAutoPaused = useCallback(() => {
    ref.autoPaused.current =
      ref.pausedByNodeFocus.current ||
      ref.pausedByHover.current ||
      ref.pausedByWindowBlur.current;
  }, []);

  const form = useForm<ControlsValues>({
    resolver: valibotResolver(ControlsSchema),
    defaultValues: {
      autoMode: true,
      query: '',
      selectedId: '',
    },
  });
  const autoMode = form.watch('autoMode');
  const selectedId = form.watch('selectedId');
  ref.autoMode.current = autoMode;
  ref.tree.current = tree;

  const { data, loading, error } = useQuery(Kicl_TreeOfLifeSubtreeDocument, {
    variables: {
      heightLimit: HEIGHT_LIMIT_DEFAULT,
    },
  });

  const [fetchSubtree] = useLazyQuery(Kicl_TreeOfLifeSubtreeDocument);
  const [fetchSubtrees] = useLazyQuery(Kicl_TreeOfLifeSubtreesDocument, {
    // Apollo 4 takes the policy when the query is created; the execute call
    // carries variables only.
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    const root = data?.TreeOfLifeSubtree;
    if (!root?.nodeId) {
      return;
    }
    const next = fromSubtreeNode(root);
    // Keep React layout state in sync with Apollo (incl. studio fields).
    setTree((current) => (current ? mergeSubtree(current, next) : next));
  }, [data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const el = ref.root.current;
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

  // Pause auto batching when the window/tab is in the background.
  useEffect(() => {
    const pause = () => {
      ref.pausedByWindowBlur.current = true;
      syncAutoPaused();
    };
    const resume = () => {
      if (document.hidden) {
        return;
      }
      ref.pausedByWindowBlur.current = false;
      syncAutoPaused();
    };
    const onVisibility = () => {
      if (document.hidden) {
        pause();
      } else {
        resume();
      }
    };

    if (document.hidden) {
      pause();
    }

    window.addEventListener('blur', pause);
    window.addEventListener('focus', resume);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('blur', pause);
      window.removeEventListener('focus', resume);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [syncAutoPaused]);

  const onCentered = useCallback(() => {
    setCenterOnId(null);
  }, []);

  const onLayoutChange = useCallback((next: LayoutResult) => {
    ref.layout.current = next;
    setLayoutEpoch((value) => value + 1);
    const waiters = ref.layoutWaiters.current.splice(0);
    waiters.forEach((resolve) => resolve());
  }, []);

  const waitForLayout = useCallback(
    () =>
      new Promise<void>((resolve) => {
        ref.layoutWaiters.current.push(resolve);
      }),
    []
  );

  const onFocusChange = useCallback(
    (id: string | null) => {
      ref.pausedByNodeFocus.current = id != null;
      syncAutoPaused();
    },
    [syncAutoPaused]
  );

  const onHoverChange = useCallback(
    (id: string | null) => {
      ref.pausedByHover.current = id != null;
      syncAutoPaused();
    },
    [syncAutoPaused]
  );

  const onPinnedIdChange = useCallback(
    (id: string | null) => {
      setPinnedId(id);
      if (!id) {
        form.setValue('selectedId', '');
        return;
      }
      form.setValue('selectedId', id);
      const node = ref.layout.current?.nodes.find((n) => n.id === id);
      if (node) {
        const name = labelWithRank(node.node, node.isOrigin);
        if (name) {
          form.setValue('query', name);
        }
      }
    },
    [form]
  );

  const namedNodes = useMemo(() => {
    void layoutEpoch;
    const nodes = ref.layout.current?.nodes ?? [];
    return nodes
      .map((n) => {
        const name = n.isOrigin ? 'Origin of life' : labelFor(n.node);
        const rank =
          n.node.rank?.trim() && !/^no[\s_-]?rank$/i.test(n.node.rank)
            ? n.node.rank.trim()
            : '';
        return {
          id: n.id,
          name,
          rank,
          label: labelWithRank(n.node, n.isOrigin),
        };
      })
      .filter((n) => Boolean(n.name))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [layoutEpoch]);

  const onSearchChange = useCallback(
    (value: string) => {
      const match = namedNodes.find(
        (n) => n.label === value || n.name === value
      );
      if (match) {
        form.setValue('selectedId', match.id);
        setPinnedId(match.id);
        setCenterOnId(match.id);
        return;
      }
      if (form.getValues('selectedId')) {
        form.setValue('selectedId', '');
        setPinnedId(null);
      }
    },
    [form, namedNodes]
  );

  const onControlsReset = useCallback(() => {
    form.reset({
      autoMode: form.getValues('autoMode'),
      query: '',
      selectedId: '',
    });
    setPinnedId(null);
  }, [form]);

  const selectedLayoutNode = useMemo(() => {
    void layoutEpoch;
    const id = pinnedId || selectedId || null;
    if (!id) {
      return null;
    }
    return ref.layout.current?.nodes.find((n) => n.id === id) ?? null;
  }, [layoutEpoch, pinnedId, selectedId]);

  const selectedDetailId = selectedLayoutNode?.node.nodeId ?? null;
  const [detailOpen, setDetailOpen] = useState(true);

  useEffect(() => {
    if (selectedDetailId != null) {
      setDetailOpen(true);
    }
  }, [selectedDetailId]);

  const onExpand = useCallback(
    async (layoutNode: LayoutNode, options: { center?: boolean } = {}) => {
      const { center = true } = options;
      if (ref.expandingIds.current.has(layoutNode.id)) {
        return;
      }

      ref.expandingIds.current.add(layoutNode.id);
      setExpandingIds(new Set(ref.expandingIds.current));
      const { node } = layoutNode;

      try {
        const result = await fetchSubtree({
          variables: node.ottId
            ? { ottId: node.ottId, heightLimit: HEIGHT_LIMIT_DEFAULT }
            : { nodeId: node.nodeId, heightLimit: HEIGHT_LIMIT_DEFAULT },
        });

        const raw = result.data?.TreeOfLifeSubtree;
        if (raw?.nodeId) {
          const subtree = fromSubtreeNode(raw);
          setTree((current) =>
            current ? mergeSubtree(current, subtree) : subtree
          );
          if (center) {
            setCenterOnId(layoutNode.id);
          }
        }
      } finally {
        ref.expandingIds.current.delete(layoutNode.id);
        setExpandingIds(new Set(ref.expandingIds.current));
      }
    },
    [fetchSubtree]
  );

  /** One GraphQL round-trip for an auto batch (Mongo/OTOL batched server-side). */
  const onExpandBatch = useCallback(
    async (tips: Array<{ node: TreeNode; parentId: string | null }>) => {
      const fresh = tips.filter(
        (tip) => !ref.expandingIds.current.has(tip.node.nodeId)
      );
      if (!fresh.length) {
        return;
      }

      fresh.forEach((tip) => {
        ref.expandingIds.current.add(tip.node.nodeId);
      });
      setExpandingIds(new Set(ref.expandingIds.current));

      const ottIds = fresh
        .map((tip) => tip.node.ottId)
        .filter((id): id is number => id != null);
      const nodeIds = fresh
        .filter((tip) => tip.node.ottId == null)
        .map((tip) => tip.node.nodeId);

      try {
        const result = await fetchSubtrees({
          variables: {
            ...(ottIds.length ? { ottIds } : {}),
            ...(nodeIds.length ? { nodeIds } : {}),
            heightLimit: HEIGHT_LIMIT_DEFAULT,
          },
        });

        const raws = result.data?.TreeOfLifeSubtrees ?? [];
        setTree((current) => {
          if (!current) {
            return current;
          }
          return raws.reduce((next, raw) => {
            if (!raw?.nodeId) {
              return next;
            }
            return mergeSubtree(next, fromSubtreeNode(raw));
          }, current);
        });
      } finally {
        fresh.forEach((tip) => {
          ref.expandingIds.current.delete(tip.node.nodeId);
        });
        setExpandingIds(new Set(ref.expandingIds.current));
      }
    },
    [fetchSubtrees]
  );

  const onStudioSubtree = useCallback((subtree: TreeNode) => {
    setTree((current) => (current ? mergeSubtree(current, subtree) : subtree));
  }, []);

  const onNodeClick = useCallback((layoutNode: LayoutNode) => {
    setCenterOnId(layoutNode.id);
    // Descendants: one subtree fetch when the pin lands (see effect below).
  }, []);

  // Selecting a node (click or search) loads its unresolved children once.
  useEffect(() => {
    if (!pinnedId) {
      return;
    }
    const layoutNode = ref.layout.current?.nodes.find((n) => n.id === pinnedId);
    if (!layoutNode?.expandable) {
      return;
    }
    void onExpand(layoutNode, { center: true });
  }, [pinnedId, layoutEpoch, onExpand]);

  useEffect(() => {
    if (!autoMode) {
      ref.autoGeneration.current += 1;
      ref.autoAttempted.current.clear();
      return undefined;
    }

    const generation = ++ref.autoGeneration.current;
    ref.autoAttempted.current.clear();
    let cancelled = false;
    let waitedForIntro = false;

    const waitWhilePaused = async () => {
      while (!cancelled && ref.autoPaused.current) {
        await sleep(120);
      }
    };

    const run = async () => {
      while (!cancelled && ref.autoGeneration.current === generation) {
        await waitWhilePaused();
        if (cancelled || ref.autoGeneration.current !== generation) {
          break;
        }

        // Walk the full loaded tree — poster pruning hides many expandable
        // tips from layout.nodes, which used to stall Grow early.
        const expandable = ref.tree.current
          ? collectExpandableTips(ref.tree.current).filter(
              (tip) => !ref.autoAttempted.current.has(tip.node.nodeId)
            )
          : [];

        if (!expandable.length) {
          // Initial load: Grow is on before the root query/layout lands.
          // Wait instead of exiting, or auto never starts after mount.
          if (!ref.tree.current) {
            await sleep(AUTO_BATCH_DEBOUNCE_MS);
            continue;
          }
          break;
        }

        // Let the root entrance finish before the first expand fetch.
        if (!waitedForIntro) {
          const introMs = maxGrowthDuration(ref.layout.current);
          waitedForIntro = true;
          if (introMs > 0) {
            await sleep(introMs);
            if (cancelled || ref.autoGeneration.current !== generation) {
              break;
            }
            await waitWhilePaused();
            if (cancelled || ref.autoGeneration.current !== generation) {
              break;
            }
          }
        }

        // Prefer large unresolved clades (animals/plants) over microbial leaf soup.
        const batch = pickExpandBatch(expandable, AUTO_BATCH_SIZE);

        // Re-check pause before marking attempted / fetching.
        await waitWhilePaused();
        if (cancelled || ref.autoGeneration.current !== generation) {
          break;
        }
        if (ref.autoPaused.current) {
          continue;
        }

        batch.forEach((tip) => {
          ref.autoAttempted.current.add(tip.node.nodeId);
        });

        const layoutAfter = waitForLayout();
        await onExpandBatch(batch);

        if (cancelled || ref.autoGeneration.current !== generation) {
          break;
        }

        // Let React recompute layout with the new tips before the next batch.
        await Promise.race([layoutAfter, sleep(AUTO_BATCH_DEBOUNCE_MS)]);
        await sleep(AUTO_BATCH_DEBOUNCE_MS);
      }
    };

    void run();

    return () => {
      cancelled = true;
      ref.autoGeneration.current += 1;
    };
  }, [autoMode, onExpandBatch, waitForLayout]);

  if (error) {
    return (
      <Layout fullScreen>
        <div
          className={`${CLASS_NAME} kicl--theme--light kicl-position-relative`}
        >
          <Text className='kicl-color-error'>{error.message}</Text>
        </div>
      </Layout>
    );
  }

  if (loading && !tree) {
    return (
      <Layout fullScreen>
        <div
          className={`${CLASS_NAME} kicl--theme--light kicl-position-relative`}
        >
          <Spinner position='inline' />
        </div>
      </Layout>
    );
  }

  if (!tree) {
    return null;
  }

  const networkBusy = loading || expandingIds.size > 0;

  return (
    <Layout fullScreen>
      <div
        className={`${CLASS_NAME} kicl--theme--light kicl-position-relative`}
        ref={ref.root}
      >
        <MapStage
          tree={tree}
          viewport={viewport}
          expandingIds={expandingIds}
          centerOnId={centerOnId}
          pinnedId={pinnedId}
          focusLocked={Boolean(selectedId)}
          onPinnedIdChange={onPinnedIdChange}
          onCentered={onCentered}
          onNodeClick={onNodeClick}
          onFocusChange={onFocusChange}
          onHoverChange={onHoverChange}
          onLayoutChange={onLayoutChange}
          autoMode={autoMode}
          onAutoModeChange={(checked) => {
            form.setValue('autoMode', checked);
          }}
          networkBusy={networkBusy}
        />

        <Form {...form}>
          <Layout gap='none' justifyContent='start' alignItems='start'>
            <div className={`${CLASS_NAME}__panel-slot kicl-position-fixed`}>
              <Layout gap='narrow' justifyContent='start' alignItems='stretch'>
                <div className={`${CLASS_NAME}__panel-stack`}>
                  <Card
                    is='aside'
                    className={`${CLASS_NAME}__panel kicl-inline-size-xxl`}
                  >
                    <CardContent>
                      <FormField
                        control={form.control}
                        name='query'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Search</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type='search'
                                list={`${CLASS_NAME}-search-list`}
                                placeholder='Find a named node…'
                                autoComplete='off'
                                onChange={(event) => {
                                  field.onChange(event);
                                  onSearchChange(event.target.value);
                                }}
                              />
                            </FormControl>
                            <datalist id={`${CLASS_NAME}-search-list`}>
                              {namedNodes.map((item) => (
                                <option key={item.id} value={item.label} />
                              ))}
                            </datalist>
                            <FormDescription>
                              {namedNodes.length} in total
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {selectedLayoutNode ? (
                    <Card
                      is='aside'
                      aria-live='polite'
                      className={`${CLASS_NAME}__panel kicl-inline-size-xxl`}
                    >
                      <CardHeader>
                        {displayRank(selectedLayoutNode.node.rank) ||
                        isTerminalRank(selectedLayoutNode.node.rank) ||
                        selectedLayoutNode.node.ottId != null ? (
                          <Layout
                            display='inline-grid'
                            gap='narrow'
                            autoFlow='column'
                            alignItems='center'
                            justifyContent='start'
                          >
                            <div>
                              {displayRank(selectedLayoutNode.node.rank) ? (
                                <Badge
                                  variant='outline'
                                  className='kicl-font-size-smaller kicl-text-transform-lowercase'
                                >
                                  <BadgeLabel>Rank</BadgeLabel>
                                  {displayRank(selectedLayoutNode.node.rank)}
                                </Badge>
                              ) : null}
                              {isTerminalRank(selectedLayoutNode.node.rank) ? (
                                <Badge
                                  variant='secondary'
                                  className='kicl-font-size-smaller kicl-text-transform-lowercase'
                                >
                                  terminal
                                </Badge>
                              ) : null}
                              {selectedLayoutNode.node.ottId != null ? (
                                <Badge
                                  variant='outline'
                                  className='kicl-font-size-smaller'
                                >
                                  <BadgeLabel>OTT ID</BadgeLabel>
                                  {selectedLayoutNode.node.ottId}
                                </Badge>
                              ) : null}
                            </div>
                          </Layout>
                        ) : null}
                        <CardAction>
                          <Button
                            unstyled
                            type='button'
                            aria-label='Close panel'
                            title='Close'
                            className='kicl-color-grey-dark'
                            onClick={onControlsReset}
                          >
                            <Ri.RiCloseLine aria-hidden />
                          </Button>
                        </CardAction>
                      </CardHeader>
                      <CardContent>
                        <Layout gap='narrow'>
                          <div>
                            <Details
                              className='kicl-color-grey-dark'
                              open={detailOpen}
                              onToggle={(event) => {
                                setDetailOpen(event.currentTarget.open);
                              }}
                              summary={
                                <CardTitle
                                  is='h2'
                                  className='kicl-font-size kicl-color-grey-darker'
                                >
                                  {selectedLayoutNode.isOrigin
                                    ? 'Origin of life'
                                    : labelFor(selectedLayoutNode.node) ||
                                      'Unnamed node'}
                                </CardTitle>
                              }
                            >
                              <TaxonVisualPanel
                                node={selectedLayoutNode.node}
                                isOrigin={selectedLayoutNode.isOrigin}
                                onSubtree={onStudioSubtree}
                              />
                            </Details>
                            {selectedLayoutNode.node.description?.trim() ? (
                              <Text
                                dense
                                is='p'
                                className='kicl-font-size-small kicl-color-grey-dark kicl-line-height-narrow'
                              >
                                {selectedLayoutNode.node.description.trim()}
                              </Text>
                            ) : null}
                          </div>
                        </Layout>
                      </CardContent>
                    </Card>
                  ) : null}
                </div>
              </Layout>
            </div>
          </Layout>
        </Form>

        <Badge
          variant='outline'
          className={`${CLASS_NAME}__credit kicl-position-fixed kicl-font-size-smaller`}
        >
          v14 · botanical growth · hover/click to focus · click away to resume
        </Badge>
      </div>
    </Layout>
  );
};

export default Canvas;
