# Setup

## Preparation
Make sure you have [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), you can install it with: the following
```BASH
npm install --global yarn
```

Install Dependencies
```BASH
make install
```

## To run the app, simply do:
```BASH
make start
```

## To run the app in development mode:
```BASH
make run
```

## To run the app in production mode:
```BASH
make run:production
```

## To run test
```BASH
make test
```

## Regions
Production runs in two regions behind one global load balancer, which sends each visitor to the nearer one. The site's service only accepts traffic from the load balancer, and the dev services run in one region.

One region is the source: deploy and configure services there. Each main trigger deploys the same image to both regions, but settings such as env vars, memory or secrets don't copy across. After changing one, copy the services again:
```BASH
cp gcp/.env.template gcp/.env   # once, then fill in the project and resource names
make gcp.region
```
The load balancer has a serverless NEG per region, Google-managed certificates through DNS authorization, a `www` → apex redirect and an HTTP → HTTPS redirect. DNS is managed by hand. Keep the `_acme-challenge` CNAMEs, which renew the certificates.

The database has a read-only replica in the second region. The API reads tree of life data from the nearest node. Sessions, and anything read straight after a write, stay on the primary.

## Resume
`/resume` is the master version, and each tailored version is at `/resume/<version>`: `manager`, `frontend-ai`, `react-native` and `architecture`. The content is typed data in `App/views/resume/content`. A line several versions share is one constant in `shared.ts`, and each version's file picks its lines and their order.

The PDFs are the page, printed by the Chrome on this machine. Run the site locally first, with the API and the design system up.
```BASH
make resume.pdf                                         # the public master PDF, uploaded to the static bucket
make resume.pdf.private OUT=~/Desktop/resume/designed   # every version, Letter and A4, with the phone number
```
The public PDF is not in the repository. `make resume.pdf` uploads it to the static bucket, where the site serves it at `/assets/static/resume/keni-lam-resume.pdf` through the API. It needs `gcloud`, signed in, and `STATIC_BUCKET` in `gcp/.env`.

It also writes `content/exported.json`, a fingerprint of the content the PDF was made from. Commit it. The page offers the file only while the fingerprint matches, so after a content edit the download is hidden until the next export, and print still works.

The phone number is `KICL_RESUME_PHONE` in `.env`. It goes into the private PDFs only. This repository is public, so the number is in no commit, no bundle and not in the public PDF.

Every version has to fit two pages on Letter and on A4, and the export fails when one does not. The type size on paper is `--kicl-print-font-size` in `App/views/resume/styles.scss`.

The design is written up in `docs/design/resume.md`.

## Analytics
The site records page views, clicks, scroll depth and time on page. It sets no cookies and skips browsers that send Global Privacy Control. The browser sends events in batches to `/collect`, and the server writes each one as a JSON log line. Visitors are identified by a hash of their address and user agent that changes every day.

Clicks on links, buttons and `summary` are recorded by their text. Add `data-track='Name'` to name an element in reports or to track something else.

To read the events from the logs:
```BASH
make gcp.analytics                        # the last day's page views
make gcp.analytics TYPE=click SINCE=7d    # pageview, click, scroll or duration
make gcp.analytics REGION=<region>        # one region only
make gcp.analytics.source                 # the source region from gcp/.env
make gcp.analytics.second                 # the second region
```

To keep the events in BigQuery, set a salt so every instance hashes visitors the same way, then send the logs to a dataset:
```BASH
gcloud run services update <service> --update-env-vars KICL_ANALYTICS_SALT=$(openssl rand -hex 16)

bq mk --dataset <project>:analytics

gcloud logging sinks create kicl-analytics \
  bigquery.googleapis.com/projects/<project>/datasets/analytics \
  --use-partitioned-tables \
  --log-filter='resource.type="cloud_run_revision" AND jsonPayload.analytics.type:*'

# The last command prints a writer identity. Let it write to the dataset:
gcloud projects add-iam-policy-binding <project> \
  --member=<writer identity> --role=roles/bigquery.dataEditor
```
A page can send more than one `duration` and `scroll` row, one each time the tab is hidden. Sum `duration` and take the largest `scroll` per session and path.
