SHELL         = /bin/sh
NPM           = npm
GRUNT         = node_modules/grunt/bin/grunt

install:
	$(NPM) install 
test: lint mocha
fulltest: clean install test
clean:
	rm -rf node_modules
lint:
	./node_modules/.bin/jshint \
		ftpm.js \
		lib/**/*
mocha:
	@echo "Running test suite..."
	./node_modules/.bin/mocha \
		--require should \
		--recursive \
		--ui bdd \
		--reporter spec \
		--timeout 10000
.PHONY: all test fulltest clean lint mocha
