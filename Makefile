install:
	npm install

start:
	npx babel-node src/bin/gendiff.js ./__fixtures__/after.json ./__fixtures__/before.json

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx jest .

cover:
	npx jest --coverage
