build:
	@echo ⌛ building...
	yarn run build:client
	@echo done

server:
	@echo ⌛ building...
	yarn run build:server
	@echo done

clean.build:
	@echo ⌛ cleaning build...
	yarn run clean:build
	@echo done

clean.remotes.renovate:
	@echo ⌛ cleaning remotes renovate...
	yarn run clean:remotes.renovate
	@echo done

clean.remote.branches:
	@echo ⌛ cleaning build...
	@IGNORE_BRANCHES="$(IGNORE_BRANCHES)" yarn run clean:remote:branches
	@echo done

clean.yarn:
	@echo ⌛ cleaning yarn...
	yarn run clean:yarn
	@echo done

install:
	@echo ⌛ installing...
	yarn
	@echo done

codegen:
	@echo ⌛ generating...
	yarn run codegen
	@echo done

# The dev server's port, from .env; whatever already holds it is stopped first.
DEV_PORT := $(or $(shell grep -E '^PORT=' .env 2>/dev/null | cut -d= -f2),3001)

run:
	@scripts/free-port.sh $(DEV_PORT)
	@echo ⌛ running development...
	yarn run development

run.production:
	@echo ⌛ running production...
	yarn run production

start:
	@echo ⌛ starting...
	yarn run start
	@echo ✅ done

# Client tokens for running a federated module against a deployment from
# localhost. The private key stays in ~/.kicl; only the public key is deployed.
client-token.keys:
	@yarn workspace app.server exec tsx client-token/cli.ts keys

client-token:
	@yarn workspace app.server exec tsx client-token/cli.ts mint --sub "$(SUB)" --days "$(or $(DAYS),14)"

test:
	@echo ⌛ running testing...
	yarn run test
	@echo ✅ done

# Copies the production services into the second region (gcp/.env).
gcp.region:
	gcp/region.sh

# Analytics events from the site's logs, newest first.
# `make gcp.analytics TYPE=click SINCE=7d LIMIT=500 REGION=<region>`; TYPE is pageview, click, scroll or duration.
gcp.analytics:
	@gcloud logging read 'resource.type="cloud_run_revision" AND jsonPayload.analytics.type="$(or $(TYPE),pageview)"$(if $(REGION), AND resource.labels.location="$(REGION)")' \
		--freshness="$(or $(SINCE),1d)" --limit="$(or $(LIMIT),200)" \
		--format='table(timestamp.date(tz=LOCAL):label=TIME, resource.labels.location:label=REGION, jsonPayload.analytics.path:label=PATH, jsonPayload.analytics.target:label=TARGET, jsonPayload.analytics.value:label=VALUE, jsonPayload.analytics.referrer:label=REFERRER, jsonPayload.analytics.session:label=SESSION)'

# The same, for one of the two production regions. The region names come from gcp/.env.
gcp-env = $(shell sed -n 's/^$(1)=//p' gcp/.env 2>/dev/null)

gcp.analytics.source:
	@[ -n "$(call gcp-env,SOURCE_REGION)" ] || { echo "gcp/.env has no SOURCE_REGION" >&2; exit 1; }
	@$(MAKE) --no-print-directory gcp.analytics REGION="$(call gcp-env,SOURCE_REGION)"

gcp.analytics.second:
	@[ -n "$(call gcp-env,REGION)" ] || { echo "gcp/.env has no REGION" >&2; exit 1; }
	@$(MAKE) --no-print-directory gcp.analytics REGION="$(call gcp-env,REGION)"
