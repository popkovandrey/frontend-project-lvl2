install:
	npm install

start:
	npx babel-node src/bin/gendiff.js ./test_files/before.json ./test_files/after.json

publish:
	npm publish --dry-run

lint:
	npx eslint .
