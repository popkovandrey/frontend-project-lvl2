install:
	npm install

json:
	npx babel-node src/bin/gendiff.js ./__tests__/__fixtures__/before.json ./__tests__/__fixtures__/after.json -f json

yaml:
	npx babel-node src/bin/gendiff.js ./__tests__/__fixtures__/before.yml ./__tests__/__fixtures__/after.yml -f plain

ini:
	npx babel-node src/bin/gendiff.js ./__tests__/__fixtures__/before.ini ./__tests__/__fixtures__/after.ini


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

check:
	npx eslint .
	npx jest .
