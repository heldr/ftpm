SHELL         = /bin/sh
NPM           = npm
GRUNT         = node_modules/grunt/bin/grunt

test:
	@echo "Running test suite..."
	./node_modules/.bin/mocha --require should --recursive --reporter spec --timeout 10000
lint:
	grunt lint
.PHONY: all test lint
