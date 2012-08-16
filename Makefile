all: lint test
test:
	./node_modules/.bin/mocha --require should --recursive --reporter spec --timeout 10000
lint:
	grunt lint
.PHONY: all test lint