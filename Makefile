BIN = ./node_modules/.bin

all: browser test coverage

browser:
	browserify lib/index.js -s GearLib -o build/gear-lib.js
	node ../gear/bin/gear.js # npm link gear-lib

test:
	npm test

coverage: lib-cov
	-@GEARLIB_COVER=1 $(BIN)/mocha --require should --reporter mocha-istanbul

lib-cov:
	@$(BIN)/istanbul instrument --output lib-cov --no-compact --variable global.__coverage__ lib

clean: clean-coverage

clean-coverage:
	-rm -rf lib-cov
	-rm -rf html-report

.PHONY: test
