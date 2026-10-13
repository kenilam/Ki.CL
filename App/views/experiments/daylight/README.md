# Daylight

`/experiments/daylight/:place`. The Earth as an ink drawing in two colours, lit by
where the sun is right now. Paper is day and black is night. The rays round
the globe are red-orange toward the sun and blue away from it. A sun stands
on the side the real one is on and a moon across from it, and both go round
as the globe is turned. The globe can be dragged, and picking a place turns it there.

## How the pieces fit

- **sun.ts.** Where the sun is overhead, from the clock alone, by NOAA's
  low-accuracy series. It is right to about a degree. The same file turns a
  place into day, twilight or night.
- **orb.** One fragment shader draws the whole picture: the globe shaded in
  stipple, the rays, the sun and the moon, the stars, and hatching in the
  corners. The coast is read
  from `land.png`.
- **land.png.** A 512 by 256 mask of the land, rasterised from Natural
  Earth's 1:110m outlines (public domain, through the `world-atlas` package).
  It is 3 KB, so the view needs no map library.
- **places.** A button under the title opens a popover with each place's local
  time and its light. That list says in words what the drawing shows, so the
  canvas is hidden from assistive tech.
- **The address.** The place in the address is the one the globe faces, so
  a link opens the same view and back and forward work. Each row of the list
  is a link. The bare path, or a place it does not know, goes to the nearest
  place.
- **nearest.ts.** The nearest place is the one in the visitor's time zone,
  or else the one nearest the longitude their clock's offset from UTC stands
  for. Nothing asks for a location.

## Decisions

- The look follows an ink illustration Keni gave as the reference: black and
  paper, stipple, fine rays, dots and rings, hatching. It does not copy that
  picture. The first version was stained glass, from an earlier reference,
  and was replaced.
- The picture is black and paper in both themes, so the article carries the
  dark theme's class and everything over it is light on dark. The stars, the hatching and the ground are kept faint so the
  words read over them.
- Only the rays, the sun and the moon are coloured, so the eye goes to which
  side the sun is on.
- The sun and the moon are larger and more coloured the nearer they are to
  the viewer. With the sun behind the globe it is small and nearly grey, and
  the moon is large and blue. Only the colour fades, not the brightness.
- The moon is drawn across from the sun. It is a sign for night, not the real
  moon's position.
- An earlier version rested the globe on a floor with a horizon. It was
  taken out.
- The title, the places button and the drawing stay inside the page's 12
  columns. On a wide page the drawing takes at most two thirds of the column
  and sits at its far edge, which leaves a third to the words.
- Raw WebGL with one shader, like the music visualiser, and no three.js.
- With the globe at rest it draws about eight frames a second, enough for the
  stars to twinkle. Reduced motion stops the twinkle and the easing.
- The pixel ratio is capped at 1.5.
- The popover stays open after a pick, so several places can be tried in a
  row. Picking the place already in the address does not turn a dragged
  globe back to it. The view has no stylesheet.

## Verified

12 October 2026, in Chrome on a local dev server: the picture draws, and the
day side and the place lights match the clock. The tab was in the background,
where the browser runs no animation frames, so the picture was drawn by
calling the renderer by hand. Not checked yet: dragging, the easing between
places, the twinkle, the experiments home plate, phone width, and the last
changes to where the drawing sits and where the stars stop. Typecheck, oxlint
and Prettier pass, and `sun.test.ts` passes with
`npx tsx --tsconfig App/tsconfig.json --test`.
