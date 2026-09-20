# Music Visualiser

A radio for slow music, drawn as it plays. Chill, lo-fi and piano, chosen at
random one after another; the whole viewport is a generative picture that
answers the sound and reshapes itself as a track moves through its sections.

Route: `/experiments/music-visualiser/:group/:type/:trackId`, wired in
`App/Views/Experiments/index.tsx`. A group is a station (a provider), a
type one of its families, a track one piece. Each level is its own route in
its own folder, like TreeOfLife's versions, and every index redirects to its
first child: the view to the first group, a group to its first type, a type
to the track the station would play next. Unknown segments fall back the
same way. The shell - stage, chrome, playback - is the top route's element
and renders an outlet, so the URL can descend and change beneath it without
the player remounting.

The URL is the source of truth for what is playing, as it is for the focused
node in TreeOfLife. Every track that starts is written to it with `replace`,
so the address bar is always a link to the piece; arriving on a track's URL
shows its name on the gate, whose play control is an anchor to it, and plays
it on the first press; a track id the station cannot resolve falls back to
the next choice with a message; and back or forward through the history
move between tracks. The built-in station's ids
(`self-composed/piano/1234`) name the seed, so a link plays the same piece
every time. A copy-link control sits beside skip.

## What is built

```
MusicVisualiser/
  Spec.ts            the shared vocabulary: Track, Source, Vibe, Features, Provider
  constants.ts       route segments and params, toPath, class root, storage key
  index.tsx          the route; index redirects to the first group
  Groups/
    index.tsx        /:group - a station; index redirects to its first type
    Types/
      index.tsx      /:type - a family; index redirects to a track of it
      Tracks/
        index.tsx    /:trackId - a piece; the leaf, drawn by the shell above
  Contents.tsx       Stage + Chrome around one useRadio(), plus the outlet
  useRadio.ts        playback state: engine, queue, play/pause/skip, volume
  Chrome.tsx         the gate, now-playing card and controls; fades when idle
  Stage.tsx          the canvas: reads the palette off CSS, runs the frame loop
  Styles.scss        palette per theme as custom properties, layout, chrome
  Audio/
    engine.ts        one AudioContext: source → input → analyser → master
    features.ts      energy, three bands, centroid, flux, onsets; smoothed at
                     0.08 s, 2 s and 15 s
    compose.ts       the composer: tonal harmony, scribbletune rhythms, seeded
    instruments.ts   the sampled piano (smplr), loaded once per engine
    synth.ts         the renderer: voices, bus, reverb, scheduling
    random.ts        the seeded generator
  Providers/
    index.ts         asks each provider in turn; the built-in one never fails
    builtIn.ts       "Self composed Radio": recipes for the synth, with names and vibes
  Scenes/
    shader.ts        three scenes in one fragment shader, blended by u_mix
    renderer.ts      program, quad, uniforms
  Director/
    index.ts         which scene, and when to move to the next
```

### How the pieces fit

- **Provider seam.** `Providers/Spec` is `next(played) → Track`. A track's
  `source` is either `{ kind: 'stream', url }`, which the engine plays through
  a media element, or `{ kind: 'synth', seed, style }`, which it synthesises.
  The rest of the view cannot tell them apart. The catalogue provider (Audius
  through the backend, see below) goes in front of the built-in one in
  `Providers/index.ts` once it exists.
- **Built-in station.** Exists so the visualiser works with no network and so
  the visuals can be checked against a known signal. Three styles: `piano`
  (keys over held chords, pentatonic melody, bass, the lightest pulse),
  `lofi` (the same through a low-pass with a kick, a rim, a brushed hat and
  crackle), `ambient` (detuned pads, a drone and sparse keys, long reverb).
  Deterministic per seed.
- **Composer.** `compose.ts` is pure: seed and style in, a piece out, and the
  piece hands back any bar's events on request. Harmony comes from
  [tonal](https://github.com/tonaljs/tonal): the key's seventh chords, a
  progression chosen by degree, and voicings that lead from chord to chord
  with the least movement. Rhythm comes from
  [scribbletune](https://scribbletune.com) pattern strings, where `x` is a
  hit, `-` a rest, `_` a tie and `[xx]` a subdivision, so a bar of comping is
  a short readable string. Only scribbletune's `clip` is used, as a pattern
  reader; its Tone.js playback is not. Half the pieces are minor. Form is
  sixteen bars, eight on one progression and eight on another, busier, which
  is what gives the director sections to notice.
- **Sampled piano.** `instruments.ts` loads the Splendid Grand Piano, a
  Steinway sampled by Akai and released as public domain, through
  [smplr](https://github.com/danigb/smplr): about a hundred Opus samples for
  the keys and layers the station uses, cached in the browser's Cache API.
  Until it has loaded, and wherever it cannot, the synthesised keys carry
  the station. The reverb on both is smplr's packaged Dattorro plate, an
  audio worklet, with the old noise tail as the fallback.
- **Hosting the samples.** They are fetched from
  `KICL_MUSIC_SAMPLES_URL`, a template with `{repo}` standing for the
  upstream repository name, defaulting to `/assets/static/music/{repo}`, the
  static bucket through the same-origin route. To host them, mirror
  `https://github.com/smpldsnds/sfzinstruments-splendid-grand-piano` into the
  `ki-cl-static` bucket as `music/sfzinstruments-splendid-grand-piano/`, so
  the files sit at `music/sfzinstruments-splendid-grand-piano/samples/*.ogg`
  beside `samples/files.json`. A developer can point the variable at
  `https://raw.githubusercontent.com/smpldsnds/{repo}/main` to try the set
  before uploading it; that is how it was verified here.
- **Vibe.** Decided before a note plays: family, energy, warmth and scene
  weights. The built-in station sets it per style. For catalogue tracks it
  will come from metadata and, later, the backend's text-model chain.
- **Features.** Per frame from the analyser, then smoothed three ways. Fast
  drives motion, medium sets the onset threshold, slow describes the section.
- **Director.** Cuts to a new scene when a track starts, when the slow
  features drift far enough from where the scene began (a new section), or
  after a maximum dwell. Never before a minimum dwell, and it waits a couple
  of seconds for an onset so the cut lands on a note. Crossfade is four
  seconds.
- **Scenes.** `pools` (drifting ellipses of ink, bass swells them), `ribbons`
  (domain-warped bands, mids push the flow, brightness tightens them),
  `rings` (each onset starts a ring from the centre). Colour is inks over
  paper in Oklab with a light ordered dither, matching the home background.
  The palette comes from custom properties in `Styles.scss`, per theme.
- **Chrome.** The opening gate is the one gesture the browser needs before
  audio may start. After that: station badge, title, artist, attribution,
  play/pause, skip, volume. Space toggles, `n` or right arrow skips. The
  chrome fades after four idle seconds and returns on any movement. Volume
  persists through the local storage provider. Reduced motion holds the
  field still and draws a couple of frames a second.

### Tuned against references

Two thirty-second previews of tracks the listener likes were decoded and
measured (PyAV, numpy; tempo by onset-envelope autocorrelation, key by
Krumhansl-Schmuckler on a chroma from the STFT). The station was recorded
through the same analysis and brought into the same envelope:

| measure               | references       | station, before | station, after |
| --------------------- | ---------------- | --------------- | -------------- |
| RMS                   | 0.17 – 0.25      | 0.02 – 0.04     | 0.15           |
| energy below 200 Hz   | 55 – 87 %        | 26 – 73 %       | 67 – 80 %      |
| energy 200 Hz – 2 kHz | 12 – 45 %        | 26 – 74 %       | 20 – 33 %      |
| spectral centroid     | 180 – 310 Hz     | 360 – 1760 Hz   | 185 – 510 Hz   |
| tempo                 | 68, 89 BPM       | 68, 76          | 68, 83         |
| onsets per second     | 2.4 – 3.5        | 0.2 – 1.9       | 0.2 – 2.4      |
| dynamic range         | 11 – 18 dB       | 15 – 39 dB      | 7 – 24 dB      |
| key                   | D minor, D major | always major    | half minor     |

What that took: a bass voice under every station, a minor mode chosen per
seed, a soft backbeat under piano and a rim under lo-fi, melody notes that
ring past their slot, a glue compressor after the reverb, and station levels
set so the compressor works rather than idles. The scripts live outside the
repo; the method is in the session notes.

### Verified

In a cloud session with Playwright and SwiftShader: the gate renders, play
starts a piano piece, rings fire on onsets, skip moves to a lo-fi piece and
the director crossfades to ribbons, the chrome fades on idle. Console is
clean apart from the blocked Typekit host. Typecheck, oxlint, stylelint and
Prettier pass.

## Next

1. **Backend Music module** in `Ki.CL-back`: an Audius adapter, a
   `MusicTracks` collection, a `MusicNext` query returning a track with its
   vibe and a same-origin stream path, and an Express stream route with
   range support. The host proxies `/music` the way it proxies
   `/assets/taxon-visual`. Blocked until the network policy actually lets a
   session reach `*.audius.co`; see below.
2. **Catalogue provider** in `Providers/`, in front of the built-in station,
   reading `MusicNext` through the federated `api` client.
3. **Vibe from the text chain** on the backend, stored on the track record,
   with a rule-based fallback.
4. **Storage cache** for audio and artwork, with expiry and re-verify.
5. **Jamendo** behind the same adapter.

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
