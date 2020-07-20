const {objectkit} = require('../dist/basekits.cjs.js')

test('flatten', () => {
  const obj1 = {a: '1', b: 'b', c: 'c'}
  const obj1f = {a: '1', b: 'b', c: 'c'}
  expect(objectkit.flatten(obj1)).toStrictEqual(obj1f)

  const obj2 = {a: 1, b: 'b', c: 'c', d: {dd: 'Y'}}
  const obj2f = {a: 1, b: 'b', c: 'c', 'd.dd': 'Y'}
  expect(objectkit.flatten(obj2)).toStrictEqual(obj2f)

  const obj3 = {a: 1, b: 'b', d: {dd: 'Y'}, e: {f: {g: 'g'}}}
  const obj3f = {a: 1, b: 'b', 'd.dd': 'Y', 'e.f.g': 'g'}
  expect(objectkit.flatten(obj3)).toStrictEqual(obj3f)

  const obj4 = {a: null, b: 'b', d: {dd: null}, e: {f: {g: 'g'}}}
  const obj4f = {a: null, b: 'b', 'd.dd': null, 'e.f.g': 'g'}
  expect(objectkit.flatten(obj4)).toStrictEqual(obj4f)
})