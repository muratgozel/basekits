const {functionkit} = require('../dist/basekits.cjs.js')

test('stringify.', () => {
  expect(functionkit.stringify(null)).toBe('null')

  const obj = {a: {b: 1}, c: undefined}
  expect(functionkit.stringify(obj)).toBe(JSON.stringify(obj))

  const arr = ['hey', obj, 8999, undefined, false]
  expect(functionkit.stringify(arr)).toBe(JSON.stringify(arr))
})

test('destringify.', () => {
  expect(functionkit.destringify('true')).toBe('true')
  expect(functionkit.destringify('true', 'boolean')).toBe(true)

  const obj = {hey: 'you'}
  const objstr = JSON.stringify(obj)
  expect(functionkit.destringify(objstr)).toBe(objstr)
  expect(functionkit.destringify(objstr, 'object')).toStrictEqual(obj)

  expect(functionkit.destringify('9.99')).toBe('9.99')
  expect(functionkit.destringify('9.99', 'number')).toBe(9.99)
})

test('stringify URL Object', () => {
  const obj = {
    protocol: 'http:',
    hostname: 'monodrom.org',
    port: 81
  }
  expect(functionkit.stringifyURLObject(obj)).toBe('http://monodrom.org:81')
})
