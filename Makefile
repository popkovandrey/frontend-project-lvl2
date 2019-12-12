install:
	npm install

start:
	npx babel-node src/bin/run.js

publish:
	npm publish --dry-run

lint:
	npx eslint .
