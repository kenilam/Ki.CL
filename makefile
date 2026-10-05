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

deploy:
	@echo ⌛ deploying...
	yarn run deploy
	@echo ✅ deployed

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
