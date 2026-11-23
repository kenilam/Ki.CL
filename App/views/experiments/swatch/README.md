# Swatch

`/experiments/swatch` opens a preset swatch: white in the light theme, black
in the dark. A swatch is a color with a name, a photograph in that color, a
looping film of the photograph with its own sound, and a tone the browser
plays under it. The page shows the film full screen behind a
paper chip with the name, a window onto the film with pinked teeth at its
foot, the closest Pantone color with the CMYK, RGB and HEX values, and the
film and sound buttons. The button above the chip
opens a sheet to pick a color or upload a picture. Every swatch is public and
kept forever.

The API does the work, in `Ki.CL-api`'s `Swatch` module. This view asks for a
swatch and shows it.

- **`home/`** is the index route. It replaces itself with the preset for the
  visitor's theme, or shows the sheet open when there is none. The presets are
  the API's examples (`make swatch.examples HEXES="#FFFFFF #000000"`), and
  `use-preset.ts` picks the one whose color suits the theme. The experiments
  page shows the same preset's film, and switches it with the theme.
- **`card/`** is the `:id` route: a banner with the back link, the button that
  opens the sheet, the chip and a chevron to the "How it was made" article
  below it, then the sheet. The article's steps are four across, two by two
  at the `normal` breakpoint and below, and its notes stack at `narrow`. The
  film is its own layer (`card/backdrop/`) that moves at half the page's speed as the banner scrolls away, with a
  scroll-driven animation, and stays still with reduced motion. Moving to
  another swatch keeps the same page, so only what changes is drawn again.
  `use-swatch.ts` fetches the swatch and subscribes to `swatchUpdated` while
  it's being made, so the still and then the film appear as each is ready.
  Every part reads the swatch from the cache with `use-card.ts`.
- **`card/chip/`** has two versions. `narrower/`, at the `narrower`
  breakpoint and below, is two columns wide with a 16:9 pane and the buttons
  under the values; `default/` is three columns with a square pane and the
  buttons beside them. The chip's paper is `window/`, which takes the chip's
  parts as children. Through its hole, the pane shows the film frosted with
  grain (`::before`), and the swatch's color pooling at the foot over it,
  under the paper's lip (`::after`), both anchored to the pane. The color sits
  above the frost so it shows exactly, white included. The swatch's hex is the
  chip's `color`. The chip moves down with the banner as it scrolls away, and
  only its parts fade: opacity on the chip would cut the frost off from the
  film. A `ResizeObserver`
  in `window/use-clip.ts` measures the pane, the empty span among them, and
  clips a hole through the paper where it is, with one `evenodd` polygon.
  Its foot is cut into teeth `--kicl-size` wide at 45°, centred, with part of
  a tooth at each end, as pinking shears leave them.
- **`card/chip/values/`** lists the closest Pantone Coated color to the
  swatch's hex, then its CMYK, RGB and HEX values. The Pantone match is
  found by [chromonym](https://github.com/simiancraft/chromonym) with
  CIEDE2000, the way pantoneconverter.com finds it, with its ΔE in the credit
  line below (`use-pantone.ts`). chromonym's Pantone values are community
  approximations, so it's the nearest match, not the swatch's own Pantone
  number.
- **`maker/`** is the sheet, opened by the button above the chip, "Find a
  swatch". Its
  color field is the design system's `ColorPicker` in place
  (`presentation='widget'`). Moving the color opens the existing swatch
  nearest to it, measured in OKLab (`oklab.ts`), so picking browses. Below
  the picker, `make/pick/swatches/` lists every finished swatch, marks the one
  on the page as exact or closest to the picked color, and scrolls it into
  view; the list and the allowance are fetched again each time the sheet opens (`maker/use-refresh.ts`) and when the swatch on the page is ready; choosing one opens it and moves the picker to its color, and closes the
  sheet where it fills the screen (`narrow` and below), where the sheet is a
  modal dialog and `maker/close.ts` closes it with `close()`, not
  `hidePopover()`. The color
  field sticks below the sheet's header, at the height the sheet publishes
  (`--kicl--components--sheet--header-block-size`), while the list scrolls
  under it. The picked
  color follows the swatch on the page until the visitor moves it
  (`keepDirtyValues`). "Generate a swatch", in the sheet's footer, submits
  whichever form is showing through the button's `form` attribute: it makes a
  swatch in exactly that color. It's disabled while the page already shows
  that exact color, and once the allowance is used up, when uploading is
  turned off too. It shows "Generating…" while one of the visitor's swatches
  is still being made, which the API counts until the film is ready, minutes
  after the sheet has opened the swatch at its photograph. The allowance badge sits above it. The API refuses an
  upload without allowance before it reads the picture. The picked color, the
  mode and the request live in `maker/context/`, since the forms and the
  footer are in different parts of the sheet. An uploaded picture is sent as
  base64, read by the API and dropped. Under the picture field,
  `make/upload/found/` shows the color and name the API found in it while the
  photograph and film are made. A new swatch isn't opened until its
  photograph exists: `maker/watch/` follows it from outside the sheet, and
  `maker/progress/` shows each step in it.
  Starting one refetches the notifications, so the site's notification group
  subscribes and says when it's ready if the visitor has moved to another
  page. The footer says who can see a
  swatch, beside the button or the badge.
- **`film/`** shows a swatch's film, or its still until the film is ready and
  with reduced motion. The swatch page and the experiments page share it.
- **`use-theme.ts`** gives the light theme to a swatch whose color is light,
  measured by WCAG relative luminance, and the dark theme otherwise. The back
  link and the button over the film follow it; the chip is always paper.
- **`card/chip/controls/`** holds the film's play and pause button, which
  pauses the backdrop's video through `film/context/`, and the sound button.
  **`controls/sound/`** turns the sound on and off, and is hidden while the
  film loads: the tone, with Tone.js,
  loaded when the visitor turns the sound on and stopped while the film is
  paused, and a film with its own sound (`audio`) unmuted over it. The tone is a chord on a slow progression in its
  mode, sparse notes above it as often as its density asks, through a filter
  that its brightness opens and its movement sweeps, then a delay and a
  reverb. Another swatch fades into its own sound. The tone plays at
  `TONE_LEVEL` (−26 dB) and the film at `FILM_SHARE` (20%) of it, both in
  `constants.ts`.
