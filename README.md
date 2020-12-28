# basekits
Tree-shakable javascript utility package for browser and node.

![NPM](https://img.shields.io/npm/l/basekits)
[![npm version](https://badge.fury.io/js/basekits.svg)](https://badge.fury.io/js/basekits)
![npm bundle size](https://img.shields.io/bundlephobia/min/basekits)
![npm](https://img.shields.io/npm/dy/basekits)

## Install
```sh
npm install basekits
```

## Import
There are different types of distributions depending on your use case. Essentially, the package can be imported via require:

```js
const kit = require('basekits')
```

or via script tag:

```html
<script src="https://unpkg.com/basekits@1/dist/basekits.iife.js" crossorigin type="text/javascript"></script>
```

but there are lots of other options. See distribution report below.

## Use
Import the kit you would like to use:
```js
import {typekit} from 'basekits' // or const {typekit} = require('basekits')

typekit.isObject({sample: ''}) // true
```

A list of **kits** you can import:
```js
import {
  typekit, errorkit, hashkit,
  stringkit, objectkit,
  arraykit,
  functionkit,
  validationkit,
  domkit
} from 'basekits'
```
Either you use es module imports or commonjs imports, only the kit you specified will be in your bundle. Tree-shaking tested in [rollup.js](https://rollupjs.org) but it will work in other bundlers.

Some kits contain other ones to function correctly. Here is a map:
```js
import {
  // has no other kit
  typekit, errorkit, hashkit,

  // has typekit
  stringkit, objectkit,

  // has typekit, objectkit
  arraykit,

  // has typekit, errorkit
  functionkit,

  // has typekit, errorkit, arraykit
  validationkit,

  // has typekit, objectkit, functionkit
  domkit
} from 'basekits'
```
You are not going to need to import `typekit` if you import `stringkit`, for example.
```js
import {stringkit} from 'basekits'

stringkit.isObject({'itis': 'object'}) // true
stringkit.template('Hello {{name}}', {name: 'Murat'}) // Hello Murat
```

Time to show you the full api. 👇

## API

### basekits.typekit

```js
// Checks if the value is a string. Returns boolean.
typekit.isString(v)

// Checks if the value is a boolean. Returns boolean.
typekit.isBoolean(v)

// Checks if the value is null. Returns boolean.
typekit.isNull(v)

// Checks if the value is positive or negative finite number. Returns boolean.
typekit.isNumber(v)

// Checks if the value is positive or negative integer. Returns boolean.
typekit.isInteger(v)

// Checks if the value is NaN. Returns boolean.
typekit.isNan(v)

// Checks if the value is an object. Returns boolean.
typekit.isObject(v)

// Checks if the value is an array. Returns boolean.
typekit.isArray(v)

// Checks if the value is a promise. Returns boolean.
typekit.isPromise(v)

// Checks if the value is a native error object. Returns boolean.
typekit.isError(v)

// Checks if the value is a native date object. Returns boolean.
typekit.isDate(v)

// Checks if the value is a function. Returns boolean.
typekit.isFunction(v)

// Checks if the value is a regular expression. Returns boolean.
typekit.isRegExp(v)

// Checks if the value is a BigInt. Returns boolean.
typekit.isBigInt(v)

// Checks if the value is a Symbol. Returns boolean.
typekit.isSymbol(v)

// Checks if the value is a DOM element. Returns boolean.
typekit.isDOMElement(v)
```
```js
/*
* Finds the type of the value.
* Returns one of "object", "array", "promise", "error", "date", "null",
* "undefined", "function", "number", "nan", "regexp", "string", "boolean",
* "bigint", "symbol", "domelement" or "none"
*/
typekit.getType(v)
```

---

### basekits.errorkit

```js
// Converts native error object to an object.
errorkit.objectifyError(new Error('some error message'))

// Converts native error to a string
errorkit.stringifyError(new Error('some error message'))
```

---

### basekits.hashkit

```js
/*
* Java's hashcode implementation in javascript.
* Returns positive or negative number.
*/
hashkit.hashcode(str)

// Examples:
hashkit.hashcode('hello') // returns 99162322
hashkit.hashcode('lorem ipsum') // returns -2126368101
```

- Attribution for the method `hashcode` goes to [stackoverflow.com/a/7616484/502126](http://stackoverflow.com/a/7616484/502126)

---

### basekits.stringkit

```js
// Replaces %s expressions in the str string with given args in order.
stringkit.sprintf(str, args:String|Array)

// Examples:
stringkit.sprintf('Hey %s', 'Murat')
// Returns "Hey Murat"

stringkit.sprintf('Hey %s, you have %s items in your cart.', ['Murat', 4])
// Returns "Hey Murat, you have 4 items in your cart."
```
```js
// Replaces {{...}} expressions in a string with given props.
stringkit.template(str, props:Object)

// Examples:
stringkit.template('Hey {{name}}!', {name: 'Murat'})
// Returns "Hey Murat"
```
```js
/*
* Case convertion methods.
* They use native functions: toLocaleUpperCase and toLocaleLowerCase
* Specify locale (en-US, tr-TR etc.) for locale aware convertion.
*/

// Capitalize the whole str.
stringkit.uppercase(str, locale = 'en-US')

// Lowercase the whole str.
stringkit.lowercase(str, locale = 'en-US')

// Capitalizes only the first letter of the first word in given str.
// nouns are the list of words that will be excluded while converting. Useful for brand names.
stringkit.sentencecase(str, locale = 'en-US', nouns = [])

// Capitalizes the first letter of each word in given str.
// nouns are the list of words that will be excluded while converting. Useful for brand names.
stringkit.titlecase(str, locale = 'en-US', nouns = [])
```

---

### basekits.objectkit

```js
/*
* Flattens the nested object as key-value pairs
* - $sep is put between each nested parts of a key.
* - $roots keeps previous parent properties as they will be added as a prefix to each key
*/
objectkit.flatten(obj, sep = '.', roots = [])

// Example:
const obj1 = {
  a: null,
  b: 'b',
  d: {dd: null},
  e: {f: {g: 'g'}}
}
const flatten = objectkit.flatten(obj1)
{
  'a': null,
  'b': 'b',
  'd.dd': null,
  'e.f.g': 'g'
}

// or:
const obj5 = {
  name: 'Sample 1',
  fields: [
    {age: 7, country: 'TR'},
    {age: 9, country: 'AZ'}
  ]
}
const flatten5 = objectkit.flatten(obj5)
{
  name: 'Sample 1',
  'fields[0].age': 7,
  'fields[0].country': 'TR',
  'fields[1].age': 9,
  'fields[1].country': 'AZ',
}
```

```js
/*
* Reverse of the flatten. Unflattens, expands the key-value paired object.
*/

objectkit.unflatten(obj)

// Examples:
const obj3f = {
  'name': 'Sample 2',
  'family.since': '2020',
  'family.children[0].name': 'Child 1',
  'family.children[0].age': 7,
  'family.children[0].address.city': 'City 1',
  'family.children[1].name': 'Child 2',
  'family.children[1].age': 3,
  'family.children[1].address.city': 'City 2',
  'abc.def': 1
}
objectkit.unflatten(obj3f)
// Returns:
{
  "name": "Sample 2",
  "family": {
    "since": "2020",
    "children": [
      {
        "name": "Child 1",
        "age": 7,
        "address": {
          "city": "City 1"
        }
      },
      {
        "name": "Child 2",
        "age": 3,
        "address": {
          "city": "City 2"
        }
      }
    ]
  },
  "abc": {
    "def": 1
  }
}
```

```js
/*
* Merges objects and properties of objects, recursively.
* - $objects is the list of the objects you want to merge.
* - $opts is an options object:
    $opts = {
      concatArrays: false,
      discardNonObjectReplacements: false,
      ignoreKeys: []
    }
*/
objectkit.assignDeep(objects=[], opts={})

// Example:
const obj3 = {a: {b: {c: {d: '1', e: '2'}, f: '3'}}, g: ['4', '5']}
const obj3a = {h: '6', a: {b: {i: '7'}}, g: ['8']}
const obj3a2 = {h: '6', a: 'non-object', g: ['8']}
objectkit.assignDeep([obj3, obj3a, obj3a2])
// Returns:
{a: 'non-object', g: ['8'], h: '6'}

objectkit.assignDeep([obj3, obj3a, obj3a2], {discardNonObjectReplacements: true})
// Returns:
{a: {b: {c: {d: '1', e: '2'}, f: '3', i: '7'}}, g: ['8'], h: '6'}
```

```js
// Finds the value of the property specified in path inside an obj.
objectkit.getProp(obj, path, defaultValue = undefined)

// Examples:
const obj = {
  name: 'Murat',
  address: {
    country: 'TR'
  }
}
objectkit.getProp(obj, 'name') // returns 'Murat'
objectkit.getProp(obj, ['address', 'country']) // returns 'TR'
objectkit.getProp(obj, 'nonExistingProp', 'none') // returns 'none'
```
```js
/*
* Returns:
* - a new object by removing its prop.
* - input object if it doesn't have a prop.
* - undefined if obj is not an object.
*/
objectkit.removeProp(obj, prop)
```

---

### basekits.arraykit

```js
// Sorts array of objects according to a property specified in path.
arraykit.sortItemsBy(arr, paths, order = 'asc')

// Examples:
const arr = [
  {n: 'a', num: 2, props: {num: 3}},
  {n: 'b', num: 3, props: {num: 1}},
  {n: 'c', num: 1, props: {num: 2}},
]

arraykit.sortItemsBy(arr, 'num', 'asc')
arraykit.sortItemsBy(arr, ['props', 'num'], 'desc')
```
```js
// Removes duplicate items in the arr.
arraykit.removeDuplicates(arr, deep = false)
```
**About deep argument**: The function performs strict equality check by default. Set `deep` to true if you want to perform deep equality check which is useful if arr contains objects or other complex structured types. But in order of this option to work correctly, `validationkit` must be imported.

---

### basekits.functionkit

```js
// Stringifies the input. Input can be one of basekits types.
// It will give you the innerText property in the case of a domElement.
// Returns an empty string in the case of unrecognized types.
functionkit.stringify(value)

// Destringifies the input according to basekitType.
// Returns value as it is if basekitType left empty. basekitType is one of basekits type.
functionkit.destringify(value, basekitType = null)
```

```js
// Stringifies the url object created by the native js function new URL('...')
const obj = {
  protocol: 'http:',
  hostname: 'monodrom.org',
  port: 81,
  pathname: 'path'
}
functionkit.stringifyURLObject(obj)
// Returns http://monodrom.org:81/path

// Destringifies the input according to basekitType.
// Returns value as it is if basekitType left empty. basekitType is one of basekits type.
functionkit.destringify(value, basekitType = null)
```

```js
/*
* Runs condition function every interval miliseconds and runs callback if
* condition function returns true. The callback will also be run if condition
* doesn't return true after timeout miliseconds.
*/
functionkit.waitForIt(condition, callback, interval = 300, timeout = 10000)

// Examples:
// wait for library to be available
function checkLib() {
  return 'someLibrary' in window
}

function useLibrary() {
  window.someLibrary.someMethod.call()
}

functionkit.waitForIt(checkLib, useLibrary)
// interval is 0.3 and timeout is 10 seconds by default
```
[An article][2804530a] that explains what debounce and throttle does. Implementation of debounce and throttle taken from lodash.
```js
functionkit.debounce(func, wait, options)
functionkit.throttle(func, wait, options)
```

  [2804530a]: https://css-tricks.com/debouncing-throttling-explained-examples/ "Debaounce and Throttle"

---

### basekits.validationkit

```js
// Returns true if value is {}, [], '', 0, null or false. Returns false otherwise.
validationkit.isEmpty(v)

// Returns the opposite of what would isEmpty() returned.
validationkit.isNotEmpty(v)

// Returns true if the value is an email.
validationkit.isEmail(v)
```
```js
// Performs a deep and strict equality check. Returns a boolean.
validationkit.isEqual(value, otherValue)

// Examples:
validationkit.isEqual('hey', 'hey') // returns true
validationkit.isEqual(
  {a: {b: {c: 'hey', d: 'dey'}}, b: 'bey'},
  {a: {b: {c: 'hey', d: 'dey'}}, b: 'bey'}
) // returns true
validationkit.isEqual(
  {a: {b: {c: 'hey', d: 'dey'}}, b: 'bey'},
  {a: {b: {c: 'cey', d: 'dey'}}, b: 'bey'}
) // returns false
```
```js
// Returns true if the value is an RFC compliant UUID.
validationkit.isUUID(v)

// Examples:
validationkit.isUUID('109156be-c4fb-41ea-b1b4-efe1671c5836') // returns true
validationkit.isUUID('109156be-c4fb-41ea-b1b4-efe1671a') // returns false
```
```js
// Returns true if the value is a URL.
validationkit.isURL(value, opts)

// Examples:
const defaultOpts = {
  allowLocal: false,
  allowDataUrl: false,
  schemes: ['http', 'https']
}
validationkit.isURL('http://github.com') // returns true
validationkit.isURL('ftp://github.com') // returns false
validationkit.isURL('ftp://github.com', {schemes: ['ftp', 'https']}) // returns true
```
- Attribution for the method `isURL` goes to [validate.js](https://github.com/ansman/validate.js/blob/master/validate.js#L1097)

---

### basekits.domkit

```js
domkit.onOutsideClick(elements = [], fn, opts = {once: true})

// Example:
function closeDropdown() {
  // hide dropdown menu
}
domkit.onOutsideClick( document.getElementById('sample'), closeDropdown, {once: true} )
```
Executes a function when click event happens outside of one of the `elements`. `elements` can be:

1. Array of selector strings.
2. Array of DOM elements.
3. A selector string.
4. A DOM element.

```js
// Sets the caret position in the text and textarea inputs or
// selects some text in the input if start and end are different.
domkit.setCaretPos(element, start, end)

// Example:
const el = document.querySelector('input[type="text"]')
// move the caret to the 4th index
domkit.setCaretPos( el, 4, 4 )
// or shorter:
domkit.setCaretPos( el, 4 )
```
```js
// Returns the width and height of the current visible area in the browser.
domkit.getViewportDimensions() // returns {width: 800, height: 600}

// Returns element's absolute distance from top of the page in pixels.
domkit.getAbsoluteDistanceFromTop(element) // returns 3392 for example

// Returns element's relative distance from top of the viewport in pixels.
domkit.getViewportRelativeDistanceFromTop(element) // returns 9 for example

// Returns element's relative distance from bottom of the viewport in pixels.
domkit.getViewportRelativeDistanceFromBottom(element) // returns 584 for example

// Override window or document globals.
domkit.setDOMGlobal(name, value)
domkit.setDOMGlobal('window', window)
domkit.setDOMGlobal('document', document)
```

---

## Distributions Report
This is an auto-generated report that shows the type, name and size of the bundles available to use individually.

[comment]: # (DISTRIBUTIONS_REPORT_START)
```js
[
  "basekits.amd.js (18.14 KB)",
  "basekits.amd.polyfilled.js (47.88 KB)",
  "basekits.cjs.js (18.16 KB)",
  "basekits.cjs.polyfilled.js (47.98 KB)",
  "basekits.es.js (18.06 KB)",
  "basekits.es.polyfilled.js (47.87 KB)",
  "basekits.iife.js (18.14 KB)",
  "basekits.iife.polyfilled.js (47.88 KB)",
  "basekits.umd.js (18.33 KB)",
  "basekits.umd.polyfilled.js (48.07 KB)"
]
```
[comment]: # (DISTRIBUTIONS_REPORT_END)

## Babel Polyfills Report
This is an auto-generated report that shows the pollyfils added by core-js to the **pollyfilled** distributions based on the targets configuration described below.

[comment]: # (BABEL_POLYFILLS_REPORT_START)
```js
// polyfills:
[
  "es.object.get-prototype-of",
  "es.object.set-prototype-of",
  "es.array.filter",
  "es.array.index-of",
  "es.array.join",
  "es.array.map",
  "es.array.sort",
  "es.object.assign",
  "es.array.concat",
  "es.array.reduce",
  "es.array.slice",
  "es.object.keys",
  "es.parse-int",
  "es.regexp.exec",
  "es.string.replace",
  "es.string.split",
  "es.symbol",
  "es.symbol.description",
  "es.date.to-iso-string",
  "es.object.to-string",
  "es.parse-float",
  "es.regexp.constructor",
  "es.regexp.to-string",
  "web.timers",
  "es.object.get-own-property-names",
  "es.string.match",
  "es.array.find",
  "es.number.constructor",
  "es.number.is-finite",
  "es.number.is-integer"
]
// based on the targets:
{
  "android": "85",
  "chrome": "49",
  "edge": "18",
  "firefox": "78",
  "ie": "9",
  "ios": "9.3",
  "opera": "70",
  "safari": "5.1",
  "samsung": "4"
}
```
[comment]: # (BABEL_POLYFILLS_REPORT_END)

Thanks for watching 🐬

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F1RFO7)
