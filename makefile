build:
	@echo ⌛ building...
	yarn run build:client
	@echo done

server:
	@echo ⌛ building...
	yarn run build:server
	@echo done

clean:
	@echo ⌛ cleaning...
	rm -rf node_modules
	yarn cache clean
	rm yarn.lock
	@echo done

install:
	@echo ⌛ cleaning...
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