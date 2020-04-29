const {typekit} = require('../dist/basekits.cjs.js')

test('Types.', () => {
  expect(typekit.isString('')).toBe(true)
  expect(typekit.isString(undefined)).toBe(false)

  expect(typekit.isBoolean(true)).toBe(true)
  expect(typekit.isBoolean(false)).toBe(true)
  expect(typekit.isBoolean('true')).toBe(false)
  expect(typekit.isBoolean('false')).toBe(false)

  expect(typekit.isNull(null)).toBe(true)
  expect(typekit.isNull('null')).toBe(false)
  expect(typekit.isNull(undefined)).toBe(false)
  expect(typekit.isNull('')).toBe(false)

  expect(typekit.isUndefined(undefined)).toBe(true)
  expect(typekit.isUndefined('undefined')).toBe(false)
  expect(typekit.isUndefined(null)).toBe(false)
  expect(typekit.isUndefined('')).toBe(false)

  expect(typekit.isNumber(9.34)).toBe(true)
  expect(typekit.isNumber('9.34')).toBe(false)

  expect(typekit.isInteger(9)).toBe(true)
  expect(typekit.isInteger(-9)).toBe(true)
  expect(typekit.isInteger('9')).toBe(false)
  expect(typekit.isInteger(9.34)).toBe(false)

  expect(typekit.isNan(NaN)).toBe(true)
  expect(typekit.isNan(parseFloat('test'))).toBe(true)
  expect(typekit.isNan(0)).toBe(false)
  expect(typekit.isNan(null)).toBe(false)
  expect(typekit.isNan(undefined)).toBe(false)

  expect(typekit.isObject({})).toBe(true)
  expect(typekit.isObject([])).toBe(false)
  expect(typekit.isObject(null)).toBe(false)

  expect(typekit.isArray([])).toBe(true)
  expect(typekit.isArray(null)).toBe(false)
  expect(typekit.isArray({})).toBe(false)

  expect(typekit.isPromise(new Promise(function(){}, function(){}))).toBe(true)
  expect(typekit.isPromise(null)).toBe(false)
  expect(typekit.isPromise(function(){})).toBe(false)
  expect(typekit.isPromise({})).toBe(false)

  expect(typekit.isError(new Error('test'))).toBe(true)
  expect(typekit.isError('')).toBe(false)

  expect(typekit.isDate(new Date())).toBe(true)
  expect(typekit.isDate('')).toBe(false)

  expect(typekit.isFunction(function(){})).toBe(true)
  expect(typekit.isFunction('')).toBe(false)

  expect(typekit.isRegExp(/[\s]+/g)).toBe(true)
  expect(typekit.isRegExp(new RegExp('[\s]+', 'gm'))).toBe(true)
  expect(typekit.isRegExp('/[\s]+/')).toBe(false)
  expect(typekit.isRegExp(null)).toBe(false)

  expect(typekit.getType(true)).toBe('boolean')
  expect(typekit.getType(false)).toBe('boolean')
  expect(typekit.getType(null)).toBe('null')
  expect(typekit.getType(undefined)).toBe('undefined')
  expect(typekit.getType('')).toBe('string')
  expect(typekit.getType({})).toBe('object')
  expect(typekit.getType([])).toBe('array')
})
