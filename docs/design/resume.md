# Design: the resume on ki-cl.com

Status: built on `feat/resume`, with the print styles on `feat/print` in the design system. Not yet released. Written 7 October 2026, updated after the build on the 8th.

One typed content source in this repo renders the resume as a page in the site's design system, in five versions, and the same page produces the PDFs.

## 1. Problem and scope

### It must do

1. Show the resume at `/resume`, on a phone and a desktop, in the light and dark themes. Each role is a disclosure: its title, employer and dates are the summary, and what was done opens under it. The current role starts open.
2. Give a PDF two ways: the browser's own print has to come out right, and the page offers a real file to download.
3. Serve the four tailored versions (manager, front end and AI, React Native, architecture) from the same content, each at its own URL.
4. Export every version to PDF with one command, on Letter and A4, for applications.

### How well

| Quality | Target |
| --- | --- |
| Scale | 20 views a day. 5,000 in a day when a post is shared. |
| Read and write | All reads. Content changes about twice a month, by commit. |
| Latency | Content painted within 2.5 s on a cold load over 4G. First byte of the PDF within 500 ms. |
| Length | Every version fits two pages on Letter and on A4. |
| Freshness | The page and the PDF file never disagree. A file that is out of date is not offered. |
| Availability | The PDF file needs the host, the API and the static bucket, but no session. The page inherits the site: host, design remote and an API session. |
| Durability | Content lives in git. Nothing else can be lost. |
| Privacy | This repository is public. The phone number is in no commit, no bundle and no public file. |
| Cost | No new service, no new dependency. |

### Not doing

- A CMS or an editing UI. The editor is a text editor and a pull request.
- Rendering PDFs on the server on demand.
- Word files from the site. The plain Word files come from the earlier export.
- A Japanese version, and a link per recipient.
- Sign-in for the tailored versions.

### Assumptions

These carry weight. If one is wrong, the section named after it changes.

- `/resume` is public and linked from the navigation (section 6, row 8).
- The tailored versions may be read by anyone who has the URL (row 8).
- The phone number belongs on the PDFs sent with an application and nowhere public (row 7).
- A binary of about 150 KB may live in git, although site imagery lives in the bucket (row 5).
- Traffic numbers are estimates. `make gcp.analytics` has the real ones.

## 2. Scale estimates

| Quantity | Working | Result |
| --- | --- | --- |
| Requests for a cold view | shell, entries, chunks, two remotes, session, collect | about 25 |
| Ordinary day | 20 views × 25 | 500 requests, 0.006 a second |
| Spike day | 5,000 views × 25 | 125,000 requests, 1.5 a second on average |
| Spike peak | most of a spike lands in two hours, so 10 × average | 15 a second |
| Sessions at the API on a spike day | one exchange per new visitor | 5,000, under 1 a second at peak |
| Bytes for a cold view | brotli, without the 3D chunks this route never loads | about 1 MB |
| Egress on a spike day | 5,000 × 1 MB | 5 GB |
| One PDF | two pages, three weights of one family, no images. Measured | 80 KB |
| PDF in the static bucket | 80 KB, one object, overwritten by each export | nothing in git |
| Export run | 5 versions × 2 papers. Measured | 31 s on a laptop |

One Node process serving files does hundreds of requests a second, and the site already runs in two regions, so the peak sits two orders of magnitude under capacity. A single MongoDB primary takes about 1,000 simple writes a second, three orders above the session load.

The numbers force nothing. They rule things out: no CDN change, no render service, no queue, no database for content. What shapes the design is keeping the page and the PDF in step, what the page depends on, the phone number, and how much work an edit takes.

## 3. Interfaces

### URLs

| Request | Answer | Cache |
| --- | --- | --- |
| `GET /resume` | The shell, then the master version | `no-cache` on the shell |
| `GET /resume/:version` | One of `manager`, `frontend-ai`, `react-native`, `architecture`. Anything else renders the 404 page | as above, and `noindex` |
| `GET /assets/static/resume/keni-lam-resume.pdf` | The master PDF, streamed from the static bucket by the API | `public, max-age=0, must-revalidate`, with `ETag` |
| `POST /collect` | Existing analytics. Views by path, the PDF and print controls by `data-track` | n/a |

The PDF keeps one name for good, because the link ends up in emails and profiles. It is revalidated on every request, so a new export is what the next reader gets, and an unchanged file costs a 304.

### Content

```ts
/** Plain text, bold text, or a link. */
type Run = string | { strong: string } | { link: string; to: string };
type Line = string | readonly Run[];

type Role = {
  title: string;
  organisation: string;
  dates: string;
  points: readonly Line[];
};

type Version = {
  slug: 'master' | 'manager' | 'frontend-ai' | 'react-native' | 'architecture';
  name: string;
  headline: string;
  summary: Line;
  experience: readonly Role[];
  earlier: readonly Line[];
  projects: { intro?: Line; items?: readonly Line[] };
  skills: readonly Line[];
  mentoring: Line;
  education: readonly Line[];
  languages: Line;
  /** Section order. The manager version puts mentoring before projects. */
  order: readonly SectionId[];
};
```

A bullet that several versions share is one constant, imported by each. A version is a selection and an order, plus the lines only it has.

### The exported file's record

`App/views/resume/content/exported.json`, written by the export after the upload, and committed:

```json
{ "exported": "2026-10-08", "fingerprint": "c3701a9a", "pages": 2 }
```

`fingerprint` is a hash of the master version's content. The page computes the same hash from the content it is rendering and offers the file only when the two match.

### Export

```bash
make resume.pdf                       # the public master PDF into the static bucket, and its record
make resume.pdf.private OUT=~/Desktop/resume/designed   # all five, Letter and A4, with the phone number
```

Both need the site running locally. Both exit non-zero when a version runs past two pages, when the brand typeface did not load, or when the page did not render.

The private files go to `OUT/<version>/keni-lam-resume.pdf` and `keni-lam-resume-a4.pdf`. The name is the same in every folder, and so is the title inside the PDF, so a file sent to a company says nothing about which version it is.

## 4. High-level design

See `resume.html` beside this file for the diagram.

| Component | Why it is there |
| --- | --- |
| Content modules, `App/views/resume/content` | The single source. Pure data with relative imports only, so the view and the export script read the same thing. |
| Resume view, `App/views/resume` | Renders one version from `design/components`. Requirement 1 and 3. |
| Print styles, in the design system and the view | Paper is the second output of the same markup. Requirement 2. |
| Static PDF, in the static bucket | A real file at `/assets/static/resume`, streamed by the API. Not in git or the host image, so the address in it is in neither. |
| Fingerprint check, in the view | Hides a stale file. Freshness target. |
| Export script, `App/views/resume/export` | Drives the installed Chrome over the DevTools protocol. Requirement 4 and the two-page limit. |
| Host server, design remote, API, load balancer | Unchanged. The page is one more route. |
| `/collect` | Unchanged. Counts views and downloads. |

Reading the page: browser → load balancer → host (shell and chunks) → host proxy → design remote and API client remote → session exchange at the API → the view renders from content already in the bundle. No request is made for the resume's data.

Reading the PDF: browser → load balancer → host → API → bucket. No session is needed.

Exporting: content → the local site → Chrome → PDF → the static bucket (public, no phone) or a folder outside the repository (private, with phone).

## 5. Data model

There is no store. The content is TypeScript in git, and git is the history, the review and the rollback.

- Identity of a version: its slug, which is also its URL segment. Human-readable and never reused.
- Identity of a line: none. Shared lines are constants, referenced by name.
- Derived data: the PDF, identified by the fingerprint of the content it was made from.
- Private data: the phone number, in `KICL_RESUME_PHONE` in the local `.env`. The export puts it in the browser's local storage before the page loads, and the contact line shows it when it is there. It never reaches a commit or a deployed bundle.

## 6. Decisions and trade-offs

| # | Decision | Solves | Worsens | Change it when |
| --- | --- | --- | --- | --- |
| 1 | A view in the host, not a federated module and not a separate static page | One deployable, the site's shell and navigation for free, no new proxy route or remote entry | A content edit is a host release. The page shares the host's dependencies | The resume has to stay up when the API is down (see 7), or someone else needs to release it |
| 2 | Content as typed data in git, not in MongoDB | Review, history and rollback come free. No runtime dependency, no admin UI | No edit without a deploy. Not editable from a phone | Edits become weekly, or someone who does not use git has to edit |
| 3 | Versions composed from shared constants, not five documents and not flags on each line | A shared line is fixed once. A version reads top to bottom as the document it is | A line that differs slightly between versions is a separate constant, so near-duplicates can drift | Versions pass about ten. Then lines get ids and a version becomes a list of ids with overrides |
| 4 | PDFs printed from the page by a local script, not rendered on the server, in CI, or by a second renderer | One renderer, so the PDF is the page. No Chromium in an image, no service | The export needs the local stack, and only the owner can run it. Layout changes do not change the fingerprint | PDFs are needed without a laptop, or the matrix passes about 100 files. Then a Cloud Run job |
| 5 | The public PDF in the static bucket, behind the API's `/assets/static`, not in the host image | The file carries the email address, which is no longer published on the site, so it stays out of a public repository. Binaries live in the bucket | The PDF needs the API as well as the host. It no longer ships or rolls back with a release: a rollback keeps the newest PDF, and the fingerprint hides the link when they disagree | More than one file is published, or rollbacks matter. Then fingerprinted names |
| 6 | A stale file is hidden by the page, not blocked in CI | Nothing can ship a file that disagrees with the page. No check to keep green, no stack needed to commit a typo fix | Until the next export the page offers print only. The fingerprint is not secure, only a change detector | The download matters enough that losing it for a day is a problem. Then the export runs in the release |
| 7 | The phone number supplied at export from the local environment | It is in no commit of a public repository and in no bundle | Private PDFs can only be made on a machine that has the variable. One more thing in `.env` | The repository goes private, or the number should be public |
| 8 | Tailored versions unlisted and `noindex`, not behind the portfolio sign-in | A link can be sent to a recruiter and it opens. No account needed | Anyone with the URL, or the source, can read all five | A version says something that must not be public. Then it leaves the repository |
| 9 | Print support in the design system, not in this view | Every page prints without the header and in the light theme. The view keeps to its own layout | Two repositories change. The host needs the design system released first | Never back into the view. More print rules go to the design system |
| 10 | Paper size left to the reader. The export asks for Letter and A4 | A reader in London prints on A4 and one in San Jose on Letter, from the same page | Two sizes to check for the two-page limit | A fixed size is ever required. Then `@page { size }` per export |
| 11 | A small DevTools-protocol client on Node's own WebSocket, not Playwright or Puppeteer | No dependency, no browser download, nothing for Renovate to update | A client of about 200 lines that is ours to maintain. It needs Chrome installed | It needs a second browser, or grows retries and tracing. Then `playwright-core` |

The breaking point of the whole design is decision 1. The page is a route in a shell that will not render without the API client remote and a session, so the resume is exactly as available as the least available of three services.

## 7. Failure modes and degradation

Availability in series multiplies. If the host, the design remote and the API were each 99.9%, the page would be about 99.7%, which is over two hours a month. The file depends on one of them.

| What fails | What the reader sees | What limits the damage |
| --- | --- | --- |
| The API, or the session exchange | The site's 500 page. No resume | The PDF URL answers while the API is up, without a session. Applications carry the PDF itself |
| The primary database region | The same in both regions, since sessions are written to the primary | As above. The file is served by the surviving region's host |
| The design remote | No page. Components come from it | As above |
| Turnstile turns a real visitor away | The 403 page | As above. This is the case most likely to hit a recruiter behind a corporate proxy |
| Typekit blocked or slow | The page in the system sans-serif, same layout | Nothing breaks. The export refuses to write a PDF in the fallback face |
| Content edited, PDF not re-exported | The download control is gone, print remains | Decision 6. The next export restores it |
| A version grows past two pages | Nothing on the site | The export fails and names the version and the page count |
| The dark theme when printing | Light paper | The design system switches to the light theme for the print |
| A role left closed when printing | Every role, open | Each role is a disclosure, and the design system prints every disclosure open |
| An unknown version in the URL | The 404 page | The slug is checked against the list |
| A release while a tab is open | The old page, and the file link still works | The PDF name does not change between releases |
| JavaScript off | "Ki.CL needs JavaScript to run." | Not handled. See section 8 |

### What the build found

Four things only showed up once a real PDF came out of the real page. Each is fixed where it belongs, and each would come back if its fix were removed.

| Found | Cause | Fix |
| --- | --- | --- |
| A line split between two sheets, its second half printed over the next heading | Chrome breaking nested grids across pages | On paper the page's stacks are blocks, and each gap is a margin of the same size. `App/views/resume/styles.scss` |
| Every link's text at the end of its page in the PDF's own order, and the name after the body | `will-change` on `opacity` and `filter` makes a stacking context, which is painted last. So does a positioned header | `will-change: auto` for print, in the design system. The rule over the name is in the flow, not positioned |
| "S U M M A R Y" when a PDF reader extracted the section labels | The body's tracking on a smaller label is a tenth of its size, which reads as a space | The label's tracking scales with its size |
| The PDF titled "Ki.CL \| resume" | Printing changes the media queries `useResponsive` listens to, and the render that followed put the route's title back | The route's title is set once per route, in `App/views/element.tsx` |

The second and third matter more than they look. An applicant tracking system reads a PDF in its own order and by its own idea of a word, and it has to find the name first and the headings whole.

One limit stays. Typekit serves Mic 32 New with PostScript outlines, and Chrome embeds those as Type 3 fonts. The text is still selectable and extracts correctly: every line of every version was checked on the first export, on both paper sizes. The plain export from the earlier step uses TrueType and is the safer file for a strict upload form.

Recovery needs no care. There is no cache to warm and no queue to drain, and every visitor after the fix simply gets the page.

How would anyone know it broke? Today they would not, short of a message from a reader. Two uptime checks in Cloud Monitoring, on `/health` and on the PDF URL, cover the host and the API's path to the bucket for nothing. They do not cover rendering, which needs a browser. That is the largest gap in this design, and it is the site's gap, not the resume's.

## 8. Scale evolution

The bottleneck is not load. It is the dependency chain in front of a page that makes no API calls, and after that the owner's time.

| Change | What gives first | The next step, and only that one |
| --- | --- | --- |
| The resume has to outlast the API | Decision 1 | A second entry point for this route that loads the design remote and nothing else. The view does not change, only its shell |
| 10 × the versions, a link per company | Decision 3, and the export at 100 files in five minutes | Lines get ids, a version becomes ids and overrides, and each version is its own lazy chunk |
| 100 × the traffic, 500,000 views a day | Still under 100 requests a second, so the host holds. The session per visitor and Turnstile are the first to hurt | Serve the page without a session, then put Cloud CDN in front of the hashed assets |
| PDFs without a laptop | Decision 4 | A Cloud Run job with Chromium that prints the released site, writing to the bucket under fingerprinted names |

Signals to watch: views of `/resume` and clicks on `Resume PDF` in `/collect`, the 5xx rate of the session exchange, and how often an export is needed.

## 9. Coverage

- Media: one PDF, in the static bucket. Fonts from Typekit. No images.
- Ids: slugs for versions, a content fingerprint for the file. No generator needed.
- Search: none inside the site. `/resume` is indexable, the versions are not.
- Logs: analytics events as JSON log lines, already in place.
- SLOs: stated in section 1. Not measured. See the end of section 7.

## 10. Open questions

1. Should the tailored versions be public at all, or exist only for export?
2. Should the navigation link to the resume now, or after the home page has more on it?
3. Is one Letter PDF enough for the public file, or should A4 be offered beside it?
4. Should the uptime checks be set up with this, or with the next piece of site work?

## Score

Scored against the plugin's quality bar, 0 to 5 each.

| Dimension | Score | What would raise it |
| --- | --- | --- |
| Fundamentals | 4 | Little here tests them. The one consistency problem, a derived file, is handled by a fingerprint |
| Building blocks | 4 | Measure the real cold load instead of estimating it from the build. Three of the four build findings were behaviours of blocks I had treated as known: grid, `will-change`, a media query hook |
| Requirements | 4 | Traffic is assumed. Read a month of `/collect` and replace the estimates |
| Trade-offs | 5 | n/a |
| Numbers | 4 | As for requirements |
| Failure | 4 | The page still fails with the API. An uptime check and the separate entry point would close it |
| Collaboration | 3 | The assumptions in section 1 were made without their owner's answers. Section 10 is the list to confirm |

Weakest: confirmation of the assumptions, then observability. Current bottleneck: the dependency chain of decision 1. At the next order of magnitude nothing about capacity changes, and the first thing to move is the page's shell.
