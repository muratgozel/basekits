const {objectkit} = require('../dist/basekits.cjs.js')

test('getProp', () => {
  const obj1 = {a: '1', b: {c: '2'}, d: {e: {f: '3'}}}
  expect(objectkit.getProp(obj1, 'a')).toEqual('1')
  expect(objectkit.getProp(obj1, ['b'])).toStrictEqual({c: '2'})
  expect(objectkit.getProp(obj1, ['b', 'c'])).toStrictEqual('2')
  expect(objectkit.getProp(obj1, ['d', 'e', 'f', 'v'])).toStrictEqual(undefined)
  expect(objectkit.getProp(obj1, 'd.e.f')).toStrictEqual('3')
})

test('assignDeep', () => {
  const obj1 = {a: '1', b: 'b', c: 'c'}
  const obj1a = {a: '1', b: 'b', c: 'c'}
  const obj1e = {a: '1', b: 'b', c: 'c'}
  expect(objectkit.assignDeep([obj1, obj1a])).toStrictEqual(obj1e)

  const obj2 = {a: '1', b: {c: '2', d: '3'}, e: '4'}
  const obj2a = {b: {f: '5', g: '6'}}
  const obj2e = {a: '1', b: {c: '2', d: '3', f: '5', g: '6'}, e: '4'}
  expect(objectkit.assignDeep([obj2, obj2a])).toStrictEqual(obj2e)

  const obj3 = {a: {b: {c: {d: '1', e: '2'}, f: '3'}}, g: ['4', '5']}
  const obj3a = {h: '6', a: {b: {i: '7'}}, g: ['8']}
  const obj3e = {a: {b: {c: {d: '1', e: '2'}, f: '3', i: '7'}}, g: ['8'], h: '6'}
  expect(objectkit.assignDeep([obj3, obj3a])).toStrictEqual(obj3e)

  const obj3e2 = {a: {b: {c: {d: '1', e: '2'}, f: '3', i: '7'}}, g: ['4', '5', '8'], h: '6'}
  expect(objectkit.assignDeep([obj3, obj3a], {concatArrays: true})).toStrictEqual(obj3e2)

  const obj3a2 = {h: '6', a: 'non-object', g: ['8']}
  const obj3e3 = {a: 'non-object', g: ['8'], h: '6'}
  expect(objectkit.assignDeep([obj3, obj3a, obj3a2])).toStrictEqual(obj3e3)

  const obj3e4 = {a: {b: {c: {d: '1', e: '2'}, f: '3', i: '7'}}, g: ['8'], h: '6'}
  expect(objectkit.assignDeep([obj3, obj3a, obj3a2], {discardNonObjectReplacements: true})).toStrictEqual(obj3e4)
})

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

  const obj5 = {
    name: 'Sample 1',
    fields: [
      {age: 7, country: 'TR'},
      {age: 9, country: 'AZ'}
    ]
  }
  const obj5f = {
    name: 'Sample 1',
    'fields[0].age': 7,
    'fields[0].country': 'TR',
    'fields[1].age': 9,
    'fields[1].country': 'AZ',
  }
  expect(objectkit.flatten(obj5)).toStrictEqual(obj5f)

  const obj6 = {
    name: 'Sample 2',
    fields: [
      {address: {country: 'TR'}, age: 10},
      {address: {country: 'AZ'}, age: 12},
    ]
  }
  const obj6f = {
    name: 'Sample 2',
    'fields[0].address.country': 'TR',
    'fields[0].age': 10,
    'fields[1].address.country': 'AZ',
    'fields[1].age': 12,
  }
  expect(objectkit.flatten(obj6)).toStrictEqual(obj6f)
})

test('unflatten', () => {
  const obj1f = {a: null, b: 'b', 'd.dd': null, 'e.f.g': 'g'}
  const obj1 = {a: null, b: 'b', d: {dd: null}, e: {f: {g: 'g'}}}
  expect(objectkit.unflatten(obj1f)).toStrictEqual(obj1)

  const obj2f = {
    title: 'Sample 1',
    'address.city.code': '41',
    'address.city.name': 'Kocaeli',
    'address.country': 'TR'
  }
  const obj2 = {
    "title": "Sample 1",
    "address": {
      "city": {
        "code": "41",
        "name": "Kocaeli"
      },
      "country": "TR"
    }
  }
  expect(objectkit.unflatten(obj2f)).toStrictEqual(obj2)

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
  const obj3 = {
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
  expect(objectkit.unflatten(obj3f)).toStrictEqual(obj3)
})
