# frontend-project-lvl2

[![Maintainability](https://api.codeclimate.com/v1/badges/a4920490021475b7f668/maintainability)](https://codeclimate.com/github/popkovandrey/frontend-project-lvl2/maintainability)
[![Build Status](https://travis-ci.org/popkovandrey/frontend-project-lvl2.svg?branch=master)](https://travis-ci.org/popkovandrey/frontend-project-lvl2)

## Описание пакета

Проект "Вычислитель отличий". 
Реализует поиск отличий между двумя файлами. На вход принимает файлы:
* *.json;
* *.yml;
* *.ini;

Формат возвращаемого результат сравнения задается через параметр -f(--format):
* tree - возврат в виде дерева;
* plain - построчный вывод разницы между файлами;
* json - возврат в формате json.

## Установка пакета:
```sh
user:~$ npm install frontend-project-lvl2-paa --save
```

## Запуск
```sh
user:~$ gendiff before.json after.json -f plain 
```

## Вызов справки
```sh
user:~$ gendiff -h
```

### Пример работы (-f plain|tree)
[![asciicast](https://asciinema.org/a/289149.svg)](https://asciinema.org/a/289149)

### Пример работы (-f tree | plain | json)
[![asciicast](https://asciinema.org/a/289420.svg)](https://asciinema.org/a/289420)
