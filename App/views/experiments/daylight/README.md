# Daylight

`/experiments/daylight`. The Earth as a stained-glass window, lit by where
the sun is right now. Warm glass is day, blue glass is night, and the rays
round the globe are warm on the side the sun is on. The globe can be dragged,
and picking a place turns it there.

## How the pieces fit

- **sun.ts.** Where the sun is overhead, from the clock alone, by NOAA's
  low-accuracy series. It is right to about a degree, which is less than one
  pane of the glass. The same file turns a place into day, twilight or night.
- **glass.** One fragment shader draws the whole window: the globe, a ring of
  beads and two layers of rays. A pane is a Voronoi cell and the lead is the
  line between two cells. The coast is lead too, read from `land.png`.
- **land.png.** A 512 by 256 mask of the land, rasterised from Natural
  Earth's 1:110m outlines (public domain, through the `world-atlas` package).
  It is 3 KB, so the view needs no map library.
- **places.** The list says what the window shows, in words: each place's
  local time and its light. The canvas is hidden from assistive tech.
- **home.ts.** The globe starts facing roughly where the visitor is, worked
  out from their clock's offset from UTC. Nothing asks for a location.

## Decisions

- The look follows a stained-glass sun and moon that Keni gave as the
  reference: warm against cool, black lead, round beads. It does not copy
  that piece. It has no faces, and the globe is the Earth.
- Raw WebGL with one shader, like the music visualiser, and no three.js. A
  frame takes about 2 ms on an M2 at 1900 by 1700.
- With the globe at rest it draws about eight frames a second, enough for the
  glass to flicker. Reduced motion stops the flicker and the easing.
- The pixel ratio is capped at 1.5.
- The title and the line under it sit straight on the page, over the
  window. The places are a ghost card at the bottom of the start side, closed
  on phones. I tried one card for all of it and it looked worse. On a wide
  page the window sits right of the middle to leave the words clear. The view
  has no stylesheet.

## Verified

12 October 2026, in Chrome on a local dev server: the window draws, the
terminator and the place lights match the clock, and the rays turn warm on
the sun's side. The tab was in the background, where the browser runs no
animation frames, so the picture was drawn by calling the renderer by hand.
Dragging, the easing between places, the flicker, the experiments home plate
and phone width are not checked yet. Typecheck, oxlint and Prettier pass, and
`sun.test.ts` passes with `npx tsx --tsconfig App/tsconfig.json --test`.
