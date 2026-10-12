# CSS Only

`/experiments/css-only`. Five things a page usually scripts, each done by the
stylesheet: a reading progress bar, a popover that follows its button, a
highlight that slides to the checked option, a `details` that opens to its
own height, and rows that fade in on scroll.

## Decisions

- Every piece is a design system component or utility (`ScrollIndicator`,
  `Popover`, `Segmented`, `Details`, `kicl-scroll-reveal`). The view has no
  stylesheet. A piece that needs CSS a component lacks is added to
  Ki.CL-design-system first.
- React still renders the markup, so the page says the behaviour is CSS. It
  doesn't claim to run without script.
- The segmented control is uncontrolled (`defaultValue`), so nothing in the
  view holds its state.
- `PageIndicator` is left out. It counts full-screen pages, and this page
  has none.
- The plate on the experiments home is the plain background. It has no
  picture yet.

## Verified

In Chrome against a local dev server, 12 October 2026, at 500px wide: the
popover opens beside its button and closes on Escape, the highlight moves to
the chosen option, the `details` opens and closes, the rows fade in, and the
experiments home lists the page as No. 4. Not checked at desktop width or in
Safari and Firefox. Typecheck, oxlint and Prettier pass.
