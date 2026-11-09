# Kinetic Light

`/experiments/kinetic-light` opens a file, and `/experiments/kinetic-light/<songId>`
plays a song. Open a music file and it plays on a piano while its score lies
on a dark floor as one long line of staves. Each staff has a ball of light for
each note of its biggest chord. The balls land on every notehead as it sounds
and arc to the next one, leaving a glowing trail that shows on the floor as a
soft reflection. The camera changes shots through the song, the way the
scorefollower videos do. A drum beat made from the song's own rhythm plays
along, on an acoustic kit or a drum machine, or not at all.

- **MIDI and MusicXML** (`.mxl` too) are read in the browser, so every note
  in the file plays as written. The file is then sent to the API and kept as a
  song, and the page moves to the song's link. If the API can't keep it, the
  home page shows why.
- **An image or a PDF of sheet music** is read by the API, in the
  background.
  - homr, an optical music recognition program, reads the notes.
  - A vision model reads the chord symbols, the title and the tempo.
  - The page plays the notes, with each chord softly underneath as a bass note
    and up to four chord tones, held until the next chord.
  - If homr can't read the sheet, only the chords play.
  - The visitor can leave the page while it reads. When it's done, a
    notification opens on whichever page they're on. Its title
    links to the song. Clear, or opening the song, only hides the message,
    and a song that's already on screen isn't announced at all.
  - The home page shows how many sheets the visitor can still read today, as
    a badge like Image Agent's. When none are left, the form is hidden and
    only the badge shows.
- Every song has a link that anyone can open, for 30 days.
- Six examples, songs the site owner made, are kept for good and listed for
  every visitor, above the visitor's own songs. Both lists are in the home
  page's Songs sheet and the player's title menu.

## How the pieces fit

- **`read/`** turns each kind of file into one `Piece`: notes with a pitch,
  a start and a length in seconds, and a velocity. `use-read.ts` picks the
  reader from the file's first bytes.
- **`read/musicxml.ts`** walks the score with `DOMParser`. A bar is as long
  as its time signature. It's longer only when a note starts after the time
  signature's end, and then it runs to the end of its notes. A note that runs
  past the bar is cut at the barline. Ties are joined, and so is a slur
  between two notes of the same pitch, which is how homr writes ties. It also
  returns when each bar starts, in seconds and in beats.
- **`read/repair.ts`** fixes one misread of homr's before the song is read
  or engraved: when a voice holds more than its bar and its longest note is
  exactly twice what fits, that note was read one value too long, so it's
  halved. Aerith's Theme had a dotted whole note in bar 16 where the sheet
  has a dotted half, which pushed the next two notes out of the bar.
- **`read/sheet.ts`** puts a sheet's two readings together. The model's
  tempo and title replace homr's, which has no tempo and took a chord symbol
  for the title. The chords go on homr's bars at half the loudness.
- **`read/beat.ts`** writes a drum part for a piece that has none, in one
  of two styles. Both play the hi-hat on eighth notes, or on triplets or
  sixteenths when nine in ten notes start on those, are as loud as the
  piece's notes on average, and start each round with a crash.
  - The acoustic beat plays the kick on each bar's first beat and wherever a
    bass note of a beat or longer starts, and the snare on every second beat.
  - The electronic beat is four on the floor, like the house tracks of
    Children's time: a kick on every beat, a clap on every second beat, and
    an open hi-hat off the beat with closed ones between.
  - A MIDI file's own drum part plays instead, in any style:
    `read/midi.ts` keeps it and plays each General MIDI drum on the closest
    sample.
- **The model's arrangement.** Generate arranges a song before it's
  ready: a MIDI or MusicXML file right after it's saved, and a sheet once its
  read finishes, while the home page says "Choosing the sound and the beat…".
  The home page moves to the song when it's done. A sheet whose read finished
  after the visitor left, or a song made before arrangements, gets one the
  first time its owner opens it, and Play waits until it comes. `use-arrange.ts` asks once for each song, whichever of these
  gets there first. `read/outline.ts` turns the piece into an outline: the
  title, tempo, beats per bar, and for each bar where notes start on the
  beat's grid, with `b` for a bass note. `use-arrange.ts` sends it with
  `kineticLightArrange`, and the API asks a text model to choose the piano,
  the drums, zoom, colour and glow, and to write the drums in sections, each
  with a one-bar pattern, a fill on its last bar and a crash. The song keeps
  it, so a song is arranged once, and anyone with the link gets it.
  `read/arrangement.ts` plays the sections instead of the fixed beat, in
  any drum style. When an older song's arrangement
  arrives, the player starts again from it. Changing a setting afterwards
  only changes the page that's open.
- **`use-readings.ts`** asks the API for the visitor's sheets still being
  read, and subscribes to `kineticLightReadingUpdated` while one is. The home
  form shows its progress through `progress/`: the notes, then the bar and
  note counts, then the chords as the model writes them. The API tells the
  site's notifications (`App/views/notifications`) about the same steps.
- **`home/`** is the index route and **`song/`** is the `:id` route. Each
  folder's `index.tsx` is its `<Route>`. What belongs to one song is in
  `song/`: the player, the stage, the clock, the settings and the samples. The
  player renders the stage as its index route.
- **`backdrop/`** is behind the home page and the experiment's card on
  `/experiments`. It's the player's scene playing Interstellar's main theme
  with no sound, from 2:15.9, then round the whole song on a loop.
  - `interstellar.ts` holds the song's notes, copied from the song when its
    link only lasted 30 days. It's an example now, kept for good. Its
    MusicXML is 316 KB, too big to bundle, so the backdrop writes a score from
    the notes with `read/score.ts`.
  - The clock is the page's own time, not Tone's, so it plays without the
    click a browser needs before it allows audio.
  - `lens.tsx` shifts the picture a fifth of the width to the right on a wide
    canvas, so the balls play beside the words rather than behind them.
  - With reduced motion it stays on 2:15.9 and only redraws when the canvas
    changes size.
- **`song/use-song.ts`** loads a song by the id in the route and turns it into a `Piece`
  with `read/song.ts`: MIDI and MusicXML files as they were, a read sheet
  through `read/sheet.ts`.
- **`song/player/use-transport.ts`** schedules every note on Tone's `Transport`
  with a two-second lead-in, so the first notes can be seen coming. A
  `Tone.Sampler` plays them, through a high shelf, a delay and a reverb that
  only the 16′ piano turns up. Two more play the drum kit and the drum
  machine straight to the output, so the 16′ piano's delay and reverb stay
  off them. Both beats are scheduled, and each hit plays only if its style is
  the one chosen.
  The Transport loops from 1.2 seconds before the first note to five seconds
  after the last bar. A second after the music ends the player asks to play
  again, and just before the loop point the Transport pauses, unless replay
  was asked for, in which case it loops straight on. The scene counts each
  loop as the next round, so the music carries on into the next copy of the
  score.
  `song/clock.ts` is the Transport's position at the moment the audio is
  heard, which is what the scene draws from, so a note reaches the hit line as
  it sounds.
- **`read/score.ts`** gives each song the MusicXML its sheet is engraved
  from, with the time each bar starts. A MusicXML file and a read sheet use
  their own score. A sheet with chords gets one more staff, written by
  `read/write-score.ts`, with the bass and chord tones that play underneath
  and the chord symbols above them. A MIDI file has no score, so one is
  written from its ticks as a piano part, rounded to sixteenth notes. Every
  pitched track goes into one grand staff, treble from middle C up and bass
  below, or one staff when the notes fit a single clef. A note that several
  tracks play at the same moment is written once, and drums and sound effects
  stay off the sheet, though they still play. A band arrangement used to get
  a staff for every track: 22 tracks made a sheet two dozen staves tall, with
  a ball on each and the camera pulled far back to fit them.
- **`song/stage/`** is the scene. Its parts read a clock, the engraved sheet,
  the arrangement's sections and the zoom, colour and glow from
  `StageContext`. `Stage` builds that from the song itself: the score and its
  settings from `song/use-song.ts`, the clock from `song/clock.ts`. The start
  page's backdrop provides its own. The player passes the stage nothing, and
  the settings panel writes the song's cached arrangement as a slider moves.
  - `stage/engrave.ts` lays the score out with OpenSheetMusicDisplay on one
    line, in a `div` that never joins the page. OpenSheetMusicDisplay starts a
    new line past 32,767 pixels, a canvas limit the SVG it draws doesn't have,
    so `SheetMaximumWidth` is lifted. A seven-minute song used to wrap onto
    three lines, and the balls lost the music after the first. It reads back
    each notehead's position and start, and where each staff and bar is. A note's time is its bar's start plus its offset in beats,
    converted with the reader's own bar lengths, so it matches what Tone
    plays. The engraver's bar length can't be used for this: a bar that
    holds more than its time signature, which homr writes now and then, is
    longer in the engraving, and the first version squeezed its notes early,
    so balls landed on notes before they sounded. `stage/use-sheet.ts`
    engraves a score once.
  - `sheet/` turns the engraved SVG into one mesh on the floor with three's
    `SVGLoader`, so the lines stay sharp from any angle.
  - `balls/path.ts` works out where every ball is at any time, so the balls,
    their trails, pausing and the loop all come from the clock. A staff gets
    a ball for each note of its biggest chord. At each step the balls spread
    over that step's notes from top to bottom, and when there are fewer notes
    than balls, the spare ones land together on the nearest note and look
    like one. Between notes a ball arcs higher the further apart the two
    notes are, and moves sideways at a steady pace between its own two notes.
    It used to follow the scene's playhead, which jumps across barlines and
    other staves' notes, and that pulled the arc sideways. Over a rest, even a
    whole bar of one, the ball keeps flying to its next note. A staff that
    starts later doesn't fall in: its ball waits at the start with the others
    and arcs to its first note.
  - `balls/ball/` draws one ball: a white-hot sphere with a halo in its colour, a trail drawn as a glowing tube along the path it has covered in the last
    1.6 seconds of real time, so it pulls back into the ball while the music
    is paused and grows again as it moves, a faint copy of the trail under the floor and a soft vertical streak
    beneath it for the reflection.
  - The loop has no seam on screen. The next copy of the score lies a few bars'
    width of empty floor after this one's last barline (`widthOf`). A round in
    `stage/playhead.ts` is the 1.2 second lead, the song and the five-second
    hold. During the hold each ball rises off its last note toward a point in
    the air halfway across the gap, short of the next round's first note, and
    the camera moves forward with it. While "Play again?" is up the Transport is
    paused, so the balls drift in the air on the page's own clock. Pausing
    mid-song doesn't freeze them: `ease` keeps the scene's time running at a
    speed that dies away over about a third of a second, so the balls slow to a
    stop along their paths. Once they're down to half speed, a gentle drift a
    little above their notes fades in. On resume they speed up again while the music catches up to them, and the
    Transport pauses the hold early by the same amount so the slowdown ends
    before the next round. On replay they
    swoop forward and down onto their first notes on an eased curve as the music
    starts. `unwrap` keeps the clock counting through each round, and a jump
    back to the lead-in, from a stop or a new arrangement, starts again from the
    first round. The sheet draws this round's copy and the one before it. The
    next copy stays hidden while the balls fly toward it, and fades in under
    them as the next round starts.
  - `camera/shots.ts` picks a shot from the time: from above the staves, a
    sweep from the front, low along the floor, or down the staff lines. It
    changes at each of the arrangement's sections, or every eight bars
    without one. Before the first play it looks straight down on the sheet,
    with no balls. As the song starts, each ball falls from high above onto
    its first note, the same way a ball comes in after a whole-bar rest. The camera follows the music along the sheet and eases from
    one shot to the next. With reduced motion it stays above the staves.
- **`song/player/prompt/`** blurs and darkens the scene and asks a question
  over it with one round button, which the question names: "Start playing?"
  before the song has started and "Play again?" a second after the music has
  ended, while the balls are still rising. Once the music starts or pauses,
  the play button in the player's bar takes focus, so Space or Enter pauses
  and resumes from the keyboard. The button names the key with
  `aria-keyshortcuts`. While the prompt is up, the bar's play button is hidden
  with CSS (the player `:has()` the prompt), so there is one Play on screen. It fades in with the design system's `Animation` and leaves
  at once when the music starts. The player's
  bar stays usable under it, so the sound and the beat can be picked first.
  The arrangement request lives in the player's context (`arranger`), so the
  prompt and the bar both wait for it.
- **Sound and Beat** are dropdowns in the player's bar, next to **Settings**,
  which changes zoom, colour and glow. Zoom sets how close the camera
  follows, so the sheet passes faster, colour moves where the balls start on
  the colour wheel, and glow is the bloom, at 0.3 of a unit of bloom for each
  unit of glow because the balls and trails are much brighter than the
  highway's notes were. All of them work while the piece
  plays. Zoom, colour and glow live in a ref the scene reads every
  frame, so moving a slider doesn't re-render the scene. The sound and the
  beat are state in `use-transport.ts`, and each note and drum reads them as
  it plays, so a switch is heard from the next one.

## Decisions

- **Notes from homr, chords from a model.** In the first version a model
  tried to read the notes off the page. On an Aerith's Theme lead sheet the
  best free Gemini model got 5 of the first 19 notes right; homr got all 19
  and all 35 bars. Chord symbols are text, which the model reads well, and
  homr doesn't read them at all. homr is AGPL-3.0, so it runs as its own
  service, `Omr/` in Ki.CL-back.
- **Bars without a chord symbol.** The model lists every bar with `%` where
  no symbol is printed, but it still leaves some out, which moved every later
  chord a bar early. homr reads first and says how many bars each line of
  music has; the model is told those counts, and its bars are numbered from
  the start of each line. A mistake now stays on its own line.
- **Tone as the clock.** The sound and the picture both read Tone's
  Transport. Hits are found by the scene, comparing each note's start with
  the clock every frame, rather than through `Tone.Draw`. That keeps one
  clock and works the same after a pause.
- **The piano** is the mf layer of Splendid Grand Piano, public domain
  samples by Akai: 26 notes, three to four semitones apart, cut to eight
  seconds. `song/player/samples/build-piano.sh` rebuilds them from a pinned commit and
  `song/player/samples/upload.sh <build> piano` puts them in the static bucket at
  `kinetic-light/piano/`. The files are renamed to scientific pitch with `s`
  for a sharp, because the source names notes an octave low and has spaces
  and `#` in its names. In some of the source's samples the right channel is
  close to the left turned upside down, so the build flips it back where the
  two pull against each other, and the piano doesn't cancel on a mono
  speaker.
- **The beat comes from the notes**, in the browser, not from the vision
  model. That way every song gets one: MIDI and MusicXML files, read sheets,
  and songs kept before the beat existed. It only follows the meter and the
  bass, with no fills and no change through the piece. A model could write a
  better part for a sheet later.
- **The model arranges a song when its owner first opens it.** The outline
  comes from the notes the browser has already read, so the page asks rather
  than the API, and it covers sheets read in the background and songs made
  before the arrangement existed. Each arrangement is a model call, so it's
  made once and kept. The fixed beat stays
  for a song with no arrangement, or when the model fails. The API gets an
  outline rather than the notes because a long piece's notes are too many to
  send, and a grid of where notes start is what the drums need.
- **The drum kit** is one hit of each drum from Virtuosity Drums, public
  domain (CC0) samples by Versilian Studios and Karoryfer Samples. Each comes
  from the mid mic, which records the whole kit, except the kick, which comes
  from the kick mic because the mid mic hears it 20 dB under the snare.
- **The drum machine** is Michael Fischer's 1994 TR-808 set, recorded from a
  real TR-808. Its notes call it "absolutely free" and the smpldsnds mirror
  it comes from calls it public domain, but there is no formal license like
  the kit's. Each sound has its knobs in the middle, with a shorter kick and
  open hi-hat so four kicks a bar don't run together. I don't know which
  machine Children used, so this is an 808 beat in that style, not a copy.
- **The other drum sets and keyboards**: the lo-fi kit is the same
  Virtuosity kit from its lo-fi mic, and the LinnDrum an LM-2 from the
  smpldsnds mirror. Hand percussion (congas, bongos and a shaker) and the
  upright piano are VSCO 2 Community Edition by Versilian Studios, public
  domain (CC0). The
  Wurlitzer is Greg Sullivan's EP200, CC BY 3.0, credited under the song
  while it plays. The synth is Tone's FM synth set up like a DX7 electric
  piano, with no samples.
- Every drum file peaks at -1 dBFS and a keyboard note keeps its own level,
  so the volumes in `song/player/sounds.ts` set the balance. They were measured
  in LUFS on real songs: every sound sits with the grand and every drum set
  with the kit, 8 to 12 LU under it. `song/player/samples/build-samples.sh` rebuilds
  every set but the piano from pinned commits, a folder each, and
  `song/player/samples/upload.sh <build>/<folder> <folder>` puts one at
  `kinetic-light/<folder>/`. A sound or a drum set loads the first time it's
  chosen.
- **The output** goes through a soft clipper, which leaves everything under
  -3 dBFS alone and bends louder peaks toward -1 dBFS. `Tone.Limiter` let
  peaks through and raised the level, because Web Audio's compressor reacts
  after 3 ms and adds makeup gain.
- **The 16′ piano** aims at the piano on Robert Miles' Children, the house
  piano that Korg's M1 and 01/W made famous as Piano 16'. Korg's samples
  can't be put on the site, so it's built from the same grand. Each note also
  plays an octave lower at 0.7 of its velocity, which is what 16′ means on
  Korg's oscillators, and everything above 1 kHz is 8 dB louder. People who
  have recreated the Children piano say most of it is delay and reverb, so it
  also goes through a ping-pong delay of a dotted eighth note at the piece's
  tempo, with 0.35 feedback, and a 4 second reverb. The first version had a
  chorus, a shorter release and evened-out velocities, and it sounded too
  artificial. The second had only the octave and 3 dB more above 2.5 kHz, and
  it sounded almost the same as the grand, because this piano has little
  sound above 2.5 kHz. I couldn't find the original patch's settings, so
  these numbers are a starting point, not a copy. Its volume is set so a
  passage measures the same as on the grand. The grand goes through the same
  filter, delay and reverb with all three set to nothing, so it sounds as it
  did.
- **Settings use the design system's controls**, a `Popover` and range
  inputs, not lil-gui.
- **Reduced motion** keeps the camera above the staves. The balls still move,
  because they are the music.
- **The sheet comes from OpenSheetMusicDisplay** (BSD-3-Clause), which is the
  engraver, not the player. I picked it over Verovio, which engraves as well
  but is LGPL and ships as WebAssembly. It's loaded the first time a stage
  engraves, so other pages don't download it. Its optional `gl` dependency is
  for rendering in Node, and Yarn doesn't build it here.
- **The first sheet version** ran the floor through drei's
  `MeshReflectorMaterial`. It multiplies the reflection by the floor's colour,
  so a black floor reflected nothing, and once it did, the blur left blocky
  bands and the staves reflected as a grey haze. The reflections are now drawn
  with the balls, which looks closer to the video and saves rendering the
  scene twice.
- **Speed became zoom.** On the sheet nothing travels at a speed, so the
  setting now sets how close the camera follows. The arrangement's field is
  `zoom` in the API too, the model's prompt describes it that way, and
  `make kinetic-light.migrate` in Ki.CL-back renames `speed` on stored songs.
- **Balls land on the notes you hear.** Each notehead is matched with a
  played note of the same pitch starting at the same moment, and only those
  are landings. A tied or slurred continuation has no new attack, so the
  ball glides over it while the note rings on. Landing on every notehead was
  tried and made held notes look silent.
- **Bars that hold more than their time signature** used to be cut at the
  barline, so the notes past it never played while the sheet still showed
  them. From bar 76 Interstellar is written in 6/8 with six beats in every
  bar, and half of each of those bars was silent. The reader now lets a bar
  run as long as its notes when one of them starts past the time signature,
  so what's drawn is what plays. The first version of that fix counted how
  long notes last, not where they start. homr writes a note held across a
  barline as one long note, and a whole-bar rest as four beats in any
  metre, so bars with those doubled in length and Fable played 22 seconds
  slower than written.
- **Held notes** get a quiet sine tone underneath, at the same pitch, once
  they're two seconds or longer. It swells in over 2.5 seconds as the piano
  fades and stops when the note ends. The piano samples are eight seconds
  with a fade from 6.5, and a grand dies away sooner at the top, so a note
  held across two bars used to fade out before it ended. The tone goes
  straight to the output, dry: through the 16′ piano's delay it repeated
  over and over, and through its reverb it smeared into an echo.

## Verified

2 November 2026, Chrome on macOS, against a local API and sheet reader.

- The Aerith's Theme PNG played its first nine bars as written: F#5 A5 D6
  over a held A4, then C6 A5 E5, the eighth-note run in bar 3, and Dadd9,
  A-/E, D, A-, Bb, G- and D underneath, each on its bar. The tempo was 72 in
  4/4.
- Over the whole sheet, two reads put the right chord on 32 of 35 bars. The
  wrong bars were on one line each time, and different lines in the two
  reads. Before the line counts, only the first nine bars were right.
- The same sheet as a PDF gave the same notes from homr.
- `read/chords.test.ts` passes with
  `npx tsx --tsconfig App/tsconfig.json --test <file>`.
- Links: a MIDI file opened from the page moved to its link and played, and
  the link played again on a fresh load. A read sheet's Play in the drawer
  went to its link, which still played after the drawer was closed. An
  unknown or expired id shows the site's 404 page, with a link back to
  Kinetic Light (checked 4 November 2026).
- Reading in the background: the home page showed "Reading the notes",
  then "121 notes in 35 bars". After a move to the experiments page, the
  drawer opened there with Play, and Play opened the piece and cleared it.
  A second read while one was running was refused, and closing the drawer
  cleared the reading. A picture with no music ended as "No music was found
  in this file."
- 3 November 2026: the sound switch worked before and during playback,
  from a click and from the arrow keys, and kept its choice when the panel
  closed. An A minor 7 chord rendered offline measured -20.2 dB RMS on the
  grand and -20.0 dB on the 16′ piano, and the same 0.2 dB apart played
  softly. The
  panel opens from the button's start, so it has room at 500 px wide, with
  Chinese labels on one line.
- 4 November 2026: the first 24 seconds of Interstellar, recorded from
  Tone's output, measured -20.1 dB RMS on the grand and -19.7 dB on the 16′
  piano, so its volume went from -8 to -8.5 dB. The 16′ piano was 7 to 8 dB
  louder from 800 Hz to 6.4 kHz and 12 dB louder from 100 to 200 Hz. The
  version before it was within 2 dB of the grand above 400 Hz. Switching
  sounds during playback still worked, with no errors.
- 4 November 2026, the beat: Interstellar, at 100 in 3/4, got sixteenth-note
  hi-hats, a snare on the second beat, and a kick on every first beat plus
  ten more where a held bass note starts. Over its first 24 seconds the
  drums measured about 8 dB under the grand, with the loudest peak at
  -2.2 dBFS. Turning the beat off mid-song brought the kick and hi-hat bands
  back to the piano's own level from the next hit, and the piece kept
  playing.
- 4 November 2026, the drum machine: at the kit's volume it was 3 dB louder
  than the kit, with peaks at -1.1 dBFS, so its volume went from -6 to -9 dB.
  It then measured the same as the kit, about 8 dB under the grand, with
  peaks at -2.0 dBFS. Off, Acoustic and Electronic each took over from the
  next hit mid-song. "Drum kit" and "Drum machine" didn't fit on one line in
  the panel, so the choices are Off, Acoustic and Electronic.
- 4 November 2026, the arrangement: Interstellar came back as the grand,
  the drum kit, speed 8, hue 0.6 and glow 1.8, with seven sections that go
  from a kick and ride, to a snare from bar 27, to the full kit with a crash
  and fill at bar 35, a drop at bar 51 and a build to the end. Children came
  back as the 16′ piano and the drum machine, speed 12, hue 0.75 and glow
  2.2: a bar of rest, half-time, then four on the floor with open hi-hats
  from bar 18. The first request took about 70 seconds; a direct call took
  11 seconds on `gemini-3.6-flash`, with OpenAI out of credit. The page
  didn't show the first arrangement until a reload, because the API client's
  mutations default to `no-cache`; `use-arrange.ts` now asks for
  `network-only`, and Children's arrangement showed without a reload. A
  reloaded song opened with the model's settings, and its drums played with
  no errors.
- 4 November 2026, the orchestra: the retuned timpani measured within a cent
  of F2, B2, C#3 and E3. The first try didn't play at all: the player made
  hit lists for the kit and the drum machine but not the orchestra, so
  loading threw halfway through scheduling. The hit lists are now typed as
  one for each style, so a missing one fails the typecheck. Interstellar's
  arrangement on the orchestra then measured about 8 dB under the piano, with
  peaks at -1.4 dBFS, so its volume went from -6 to -8 dB.
- 4 November 2026, choosing drums: told "orchestra for classical and film
  music", the model put the orchestra on the re-read Interstellar, which
  should stay solo piano. The prompt now starts from no drums and asks for a
  steady pulse before adding any, and the temperature went from 0.7 to 0.4.
  On Interstellar's outline, three runs at 0.7 gave no drums twice and the
  orchestra once; three at 0.4 gave no drums each time.
- 4 November 2026, levels: each sound played the same eight bars of
  chords, bass and melody, and each drum set its own beat over them,
  rendered offline and measured in LUFS. The new sounds' samples aren't
  normalised, so they were far apart: the organ 24 LU under the grand, the
  upright 17, the synth 15.5, and the Wurlitzer 2.3 over it, peaking above
  0 dBFS. Hand percussion and the orchestra were 6 LU under the kit. The
  volumes were then set from 30 seconds each of Fable, Interstellar and
  Final Fantasy Eternity, so every sound averages within about 0.5 LU of
  the grand and every drum set the kit, which sits 8 to 12 LU under the
  grand. One song still differs from the next by up to 2.5 LU, as the organ
  holds its notes and the piano lets them fade.
- 5 November 2026, mono and peaks: played live, the grand measured 5 dB
  quieter than offline. A Web Audio analyser mixes to mono, and several
  Splendid Grand samples have the right channel close to the left turned
  upside down: G5 and G6 lost 11 dB in mono. `build-piano.sh` now flips the
  right channel back where the two pull against each other, and the piano
  lost 1.0 dB in mono instead of 4.8, with its stereo level unchanged. On
  dense music the upright and synth peaked about 2 dB over full scale, and
  `Tone.Limiter` made it worse, because Web Audio's compressor adds makeup
  gain and reacts after 3 ms. The output now goes through a soft clipper
  that leaves everything under -3 dBFS alone and bends peaks toward
  -1 dBFS: the loudest peaks came out at -1.0 dBFS, and the grand with the
  kit measured as before.
- 5 November 2026: the church organ and the orchestral percussion were
  removed. The organ's reverb sounded too heavy and the orchestra's triangle
  rang over the other drums. The songs the model had arranged with either
  were arranged again.
- 8 November 2026, the sheet: Children, Fable and Interstellar engraved and
  played. Fable has one ball, Children's chords fan out into a ball for each
  note, and Interstellar's bass ball, after four whole-bar rests, waits at
  the start and arcs to its first note in bar 5.
  Interstellar's 88 bars on two staves ran at 60 frames a second in Chrome on
  macOS at 1458 × 1007. `stage/balls/path.test.ts` and
  `read/write-score.test.ts` pass.
- Not checked: a MIDI file through the new score writer, phone width for the
  sheet, the sheet reader's Docker image, a PDF of more than one page,
  iOS, phone width, a long piece for frame rate, how the 16′ piano sounds
  next to Children or the real Piano 16', a MIDI file with its own drum
  part, and how either beat sounds to a listener.
