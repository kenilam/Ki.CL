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

## FTP Deploy (Temporary)
We will migrate to Github auto-deployment
```BASH
make deploy
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

## Analytics
The site records page views, clicks, scroll depth and time on page. It sets no cookies and skips browsers that send Global Privacy Control. The browser sends events in batches to `/collect`, and the server writes each one as a JSON log line. Visitors are identified by a hash of their address and user agent that changes every day.

Clicks on links, buttons and `summary` are recorded by their text. Add `data-track='Name'` to name an element in reports or to track something else.

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
