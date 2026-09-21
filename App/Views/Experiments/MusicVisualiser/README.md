# Music Visualiser

A radio for slow music, drawn as it plays. 166 public-domain lo-fi tracks,
chosen at random one after another; the whole viewport is a generative
picture that answers the sound and reshapes itself as a track moves through
its sections.

Route: `/experiments/music-visualiser/:group/:type/:track/play`, wired in
`App/Views/Experiments/index.tsx`. There is one group, `open-lofi`; a type
is one of its ten categories; a track is one file.

- the view's index links to a track drawn at random;
- a group's index goes to its first type, and a type's index to one of its
  tracks, drawn at random;
- a track's route is its gate: title, category, and a link to its `/play`;
- `/play` renders nothing of its own. The track reads it with `useMatch`
  and sounds while it matches.

The URL is the source of truth for what is playing. Pause is a link to the
gate, skip a link to the next track's `/play`, and the end of a track goes
to the same place, so back and forward move between tracks and the address
bar is always a link to the piece. A `/play` link opened cold, before any
interaction, goes back to the gate, whose play link is the gesture the
browser needs.

## What is built

```
MusicVisualiser/
  index.tsx            the view's route; index is Home
  Contents.tsx         the view's root, sized to the viewport; an outlet
  constants.ts         route params and patterns, paths, class root
  Styles.scss          the root's size and inset
  Catalog/
    index.ts           the station: find a track, draw one at random
    catalog.ts         the collection's catalog.json as data; regenerate with it
    upload.sh          puts the release in the bucket at music/open-lofi/
  Home/                title, lede, a link to a random track
  Groups/
    index.tsx          /:group; index goes to the first type
    Contents.tsx       any group but open-lofi goes back to the view
    Types/
      index.tsx        /:type; index goes to a random track of it
      Contents.tsx     an unknown type goes back to the group
      Track/
        index.tsx      /:track, with Play beneath
        Contents.tsx   the picture, and the gate or the player over it
        useAudio.ts    the audio, driven by the URL; returns the controls
        Play/          /play: an outlet, matched by the track
        Gate/          title, category, attribution, play link
        Chrome/        the player: now playing, controls, idle fade
        Visualiser/    the canvas and everything that draws it
          useStage.ts  the frame loop; the per-track seed and warmth
          director.ts  which scene, and when to move to the next
          features.ts  energy, bands, centroid, flux, onsets, smoothed
          shader.ts    twelve scenes in one fragment shader
          renderer.ts  program, quad, uniforms
          palette.ts   inks and paper read off the canvas's custom properties
```

### How the pieces fit

- **useAudio.** Two effects follow the URL. `:track` makes an `<audio>`
  element for the file at `/assets/static/music/open-lofi/<id>.mp3`, so it
  starts loading on the gate. `/play` builds the graph on first use
  (element, then a gain per track, the analyser, the master volume), lets
  the context run, and plays; leaving `/play` pauses. The controls it
  returns - `play`, `stop`, `skip`, `loading`, `playing`, `value` for the
  volume - only navigate or read state. The next track is drawn when this
  one is named, so skip can be a plain link.
- **Crossfade.** On a skip the old track plays on at full volume while the
  new one buffers. When the new one fires `playing`, the two cross over
  three seconds and the old one is dropped.
- **Open Lo-Fi.** 166 lo-fi tracks in ten categories, released to the
  public domain (CC0) by Bilal Tahir at <https://github.com/btahir/open-lofi>,
  generated with Suno. The files are streamed from the static bucket through
  the same-origin `/assets/static/music/open-lofi/` route, so the analyser
  may read them. `upload.sh` puts the release in the bucket; `catalog.ts`
  is compiled in from the collection's `catalog.json`.
- **Visualiser.** Knows nothing about the track but when it changes. It
  makes its own randomness: the director draws each scene from any not
  shown lately, and each track gets a new camera seed and warmth.
- **Features.** Per frame from the analyser, then smoothed three ways. Fast
  drives motion, medium sets the onset threshold, slow describes the section.
- **Director.** Cuts to a new scene when a track starts, when the slow
  features drift far enough from where the scene began (a new section), or
  after a maximum dwell of 38 seconds. Never before 24 seconds, so a scene
  lasts about thirty on average, and it waits a couple of seconds for an
  onset so the cut lands on a note. Crossfade is six seconds, and the last
  four scenes shown are not drawn again.
- **Scenes.** Twelve, all in one shader: `pools` (drifting ellipses of ink, bass swells them),
  `clouds` (billowing masses on a slow wind, lit edges and shaded bellies),
  `rings` (each onset starts a ring from the centre), `bars` (the spectrum
  as mirrored columns), `halo` (the spectrum around a circle), `wave` (lines
  summed from six bands, so they swell without jitter), `tunnel` (rings
  receding to a wandering point, walls lit by the spectrum), `kaleidoscope`
  (six mirrored wedges of warped noise), `stars` (three drifting layers of
  points, each listening to one band), `terrain` (ridges one behind another,
  raised by the spectrum), `hive` (a hexagonal tiling of nested hexagons,
  the inks spiralling out in arms) and `orb` (a sphere in three
  dimensions, ray-marched, its surface crumpled by 3D noise and drawn as a
  mesh that rides the bumps, the camera orbiting it in perspective with
  the far side showing through; it breathes with the bass and glows with
  the energy). Every scene but pools and rings sits under a slow camera - a
  spin, a sway, a breathing zoom and a drift, each scene taking as much of
  each as it can bear - phased by a seed drawn per track, so no two tracks
  move alike. The spectrum reaches them as a 128-band texture, each band
  eased and shown against its own recent peak. Colour is inks over paper in Oklab with a light ordered
  dither, matching the home background. The palette comes from custom
  properties in `Visualiser/Styles.scss`, per theme.
- **Gate and controls.** The gate's play link is the one gesture the
  browser needs before audio may start. On `/play`: title, category,
  attribution, pause, skip, copy link, volume; the first three are links.
  Space pauses, `n` or right arrow skips. The chrome fades after four idle
  seconds once the track sounds, returns on any movement, and stays up
  while a track loads; the controls stay hittable while faded. Volume
  persists through the local storage provider. Reduced motion holds the
  field still and draws a couple of frames a second.

### Verified

In Chrome against a local dev server, 20 September 2026: the index links to
a random track's gate, whose play link starts it on `/play`; skip keeps the
old track at full volume until the new one sounds, both play for about three
seconds, and the old one is dropped; pause holds the track on its gate and
play resumes the same element from where it stopped; a track's `ended` goes
to the same `/play` the skip link shows; a refreshed `/play` plays. The
static route answers range requests with a plain `200`, so a track cannot
be seeked. Typecheck, oxlint, stylelint and Prettier pass.

## Next

1. **Backend Music module** in `Ki.CL-back`: an Audius adapter, a
   `MusicTracks` collection, a `MusicNext` query returning a track and
   a same-origin stream path, and an Express stream route with
   range support. The host proxies `/music` the way it proxies
   `/assets/taxon-visual`. Blocked until the network policy actually lets a
   session reach `*.audius.co`; see below.
2. **Audius tracks** beside `Catalog/`, reading `MusicNext` through the
   federated `api` client.
3. **Storage cache** for audio and artwork, with expiry and re-verify.
4. **Jamendo** behind the same adapter.

## Where the music comes from

Research done in September 2026. The constraint that decides everything: an
`<audio>` element plays almost anything, but the Web Audio analyser can only
read a stream whose server sends `Access-Control-Allow-Origin`, or one
proxied through our own origin.

Recommended, in order:

1. **Audius**. Free, open API, no key needed to read or stream. Base
   `https://api.audius.co/v1`, pass `app_name`. Endpoints for search,
   trending, playlists, and a stream endpoint that redirects to an MP3 with
   range support. Catalogue is independent artists, not Creative Commons;
   fine for playback. Hosting is decentralised, so expect the odd slow node.
2. **Jamendo**. Free for non-commercial use, needs a `client_id` from the
   developer portal, 35,000 requests a month. Returns MP3 URLs per track and
   the licence field. The terms require showing attribution and the licence
   in the UI. CORS on the audio host is undocumented.

Usable but second tier: Internet Archive (huge free catalogue, hotlinking
allowed, but no CORS on search and inconsistent on downloads), Openverse
(discovery only, files live elsewhere), ccMixter (CORS undocumented).

Ruled out: SomaFM (terms forbid third-party embedding, even non-commercial),
Free Music Archive (API shut down, hotlinking prohibited), radio-browser.info
streams (third-party Icecast, no CORS), Spotify, Deezer and Apple (previews
only, terms).

## Blocked: egress to Audius and Jamendo

Attempted in cloud sessions on 20 September 2026. No headers were read.

- Every request to `api.audius.co`, `discoveryprovider.audius.co`,
  `api.jamendo.com` and `prod-1.storage.jamendo.com` failed at the egress
  proxy with a 403 on the CONNECT tunnel. The providers never answered.
- The proxy itself was healthy: `registry.npmjs.org` returned 200 through
  it, and WebFetch reported `EGRESS_BLOCKED` for `api.audius.co`.
- Later the same day the environment's "Additional allowed domains" list
  showed `*.audius.co`, `*.jamendo.com`, `docs.audius.org` and
  `devportal.jamendo.com`, yet a session spawned fresh into that environment
  still got a 403 on CONNECT for all of them, the explicitly named hosts
  included. So the list as displayed was not what the proxy enforced. Check
  that the environment form was actually saved, and that the session is
  created in that environment, before spending another session on it.

When it works, the check is a few curls, sending an `Origin` header and
reading `Access-Control-Allow-Origin` from the response, one on the API and
one on a stream URL after following its redirect.

## Running the app in a cloud session

A SessionStart hook (`.claude/hooks/session-start.sh`, in both repos) does
the environment setup when a web session opens, and the `cloud-session`
skill (`.claude/skills/cloud-session/`) has the run, stand-in-backend and
screenshot recipes, including `serve-remote.mjs`, which serves the backend's
built Client package so the site renders without Mongo.

## What shipped just before this

PR #358, merged into `develop`: the home page background is a WebGL
dither-gradient shader at `App/Views/Home/Background/`. Palette, cell size
and tone count are custom properties on the canvas, set per theme in its
stylesheet.

Noted and not fixed: React 19 warns that the `commandFor` prop on invoker
buttons should be lowercase `commandfor`. It appears in `Dialog`, the
mobile `GlobalHeader` navigation, the Portfolio SystemDesign sections and
the TreeOfLife `Figure`.
