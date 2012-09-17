SHELL         = /bin/sh
NPM           = npm
GRUNT         = node_modules/grunt/bin/grunt

install:
	$(NPM) install

test:
	@echo "Running test suite..."
	@$(GRUNT)
.PHONY: test install