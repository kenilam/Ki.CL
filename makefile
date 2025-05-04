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

run:
	@echo ⌛ running development...
	yarn run development

run.production:
	@echo ⌛ running production...
	yarn run production

start:
	@echo ⌛ starting...
	yarn run start
	@echo ✅ done

test:
	@echo ⌛ running testing...
	yarn run test
	@echo ✅ done