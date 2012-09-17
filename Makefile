SHELL         = /bin/sh
INSTALL_FLAGS = -g
NPM           = npm
GRUNT         = node_modules/grunt/bin/grunt

install:
	$(NPM) install

test:
	@echo "Running test suite..."
	@$(GRUNT)