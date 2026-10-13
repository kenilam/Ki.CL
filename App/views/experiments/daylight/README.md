# Daylight

`/experiments/daylight`. The Earth as an ink drawing in two colours, lit by
where the sun is right now. Paper is day and black is night. The rays round
the globe are the only colour: red-orange toward the sun, blue away from it. The globe can be dragged, and picking a place turns it there.

## How the pieces fit

- **sun.ts.** Where the sun is overhead, from the clock alone, by NOAA's
  low-accuracy series. It is right to about a degree. The same file turns a
  place into day, twilight or night.
- **orb.** One fragment shader draws the whole picture: the globe shaded in
  stipple, the rays, the stars, hatching in the corners, the horizon, and the
  lines on the ground that run in to where the globe rests. The coast is read
  from `land.png`.
- **land.png.** A 512 by 256 mask of the land, rasterised from Natural
  Earth's 1:110m outlines (public domain, through the `world-atlas` package).
  It is 3 KB, so the view needs no map library.
- **places.** A button at the bottom opens a popover with each place's local
  time and its light. That list says in words what the drawing shows, so the
  canvas is hidden from assistive tech.
- **home.ts.** The globe starts facing roughly where the visitor is, worked
  out from their clock's offset from UTC. Nothing asks for a location.

## Decisions

- The look follows an ink illustration Keni gave as the reference: black and
  paper, stipple, fine rays, dots and rings, hatching. It does not copy that
  picture. The first version was stained glass, from an earlier reference,
  and was replaced.
- The picture is black and paper in both themes, so the title over it is
  always light. The stars, the hatching and the ground are kept faint so the
  words read over them.
- Only the rays are coloured, so the eye goes to which side the sun is on.
- The title, the places button and the drawing stay inside the page's 12
  columns. On a wide page the drawing takes at most two thirds of the column
  and sits at its far edge, which leaves a third to the words.
- Raw WebGL with one shader, like the music visualiser, and no three.js.
- With the globe at rest it draws about eight frames a second, enough for the
  stars to twinkle. Reduced motion stops the twinkle and the easing.
- The pixel ratio is capped at 1.5.
- The popover stays open after a pick, so several places can be tried in a
  row. The view has no stylesheet.

## Verified

12 October 2026, in Chrome on a local dev server: the picture draws, and the
day side and the place lights match the clock. The tab was in the background,
where the browser runs no animation frames, so the picture was drawn by
calling the renderer by hand. Not checked yet: dragging, the easing between
places, the twinkle, the experiments home plate, phone width, and the last
changes to where the drawing sits and where the stars stop. Typecheck, oxlint
and Prettier pass, and `sun.test.ts` passes with
`npx tsx --tsconfig App/tsconfig.json --test`.
