install:
	npm install

start:
	npx babel-node src/bin/gendiff.js ./__tests__/__fixtures__/before.json ./__tests__/__fixtures__/after.json

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx jest .

cover:
	npx jest --coverage

watch:
	npx jest --watch
