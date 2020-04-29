import Basekits from '../../base'

Basekits.prototype.isString = function isString(v) {
  return typeof v == 'string'
}

Basekits.prototype.isBoolean = function isBoolean(v) {
  return v === true || v === false
}

Basekits.prototype.isNull = function isNull(v) {
  return v === null
}

Basekits.prototype.isUndefined = function isUndefined(v) {
  return typeof v == 'undefined'
}

Basekits.prototype.isNumber = function isNumber(v) {
  return typeof v == 'number' && Number.isFinite(v) === true
}

Basekits.prototype.isInteger = function isInteger(v) {
  return Number.isInteger(v)
}

Basekits.prototype.isNan = function isNan(v) {
  return typeof v == 'number' && v != +v
}

Basekits.prototype.isObject = function isObject(v) {
  return Object.prototype.toString.call(v) === '[object Object]'
}

Basekits.prototype.isArray = function isArray(v) {
  return Array.isArray(v)
}

Basekits.prototype.isPromise = function isPromise(v) {
  return Boolean(v && typeof v.then === 'function')
}

Basekits.prototype.isError = function isError(v) {
  return v instanceof Error
}

Basekits.prototype.isDate = function isDate(v) {
  return v instanceof Date
}

Basekits.prototype.isFunction = function isFunction(v) {
  return typeof v == 'function'
}

Basekits.prototype.isRegExp = function isRegExp(v) {
  return v instanceof RegExp
}

Basekits.prototype.isBigInt = function isBigInt(v) {
  return typeof v === 'bigint'
}

Basekits.prototype.isSymbol = function isSymbol(v) {
  return typeof v === 'symbol'
}

Basekits.prototype.isDOMElement = function isDOMElement(v) {
  return !!(v && (v.nodeName || (v.prop && v.attr && v.find)))
}

Basekits.prototype.getType = function getType(v) {
  if (this.isObject(v)) return 'object'
  else if (this.isArray(v)) return 'array'
  else if (this.isPromise(v)) return 'promise'
  else if (this.isError(v)) return 'error'
  else if (this.isDate(v)) return 'date'
  else if (this.isNull(v)) return 'null'
  else if (this.isUndefined(v)) return 'undefined'
  else if (this.isFunction(v)) return 'function'
  else if (this.isNumber(v)) return 'number'
  else if (this.isNan(v)) return 'nan'
  else if (this.isRegExp(v)) return 'regexp'
  else if (this.isString(v)) return 'string'
  else if (this.isBoolean(v)) return 'boolean'
  else if (this.isBigInt(v)) return 'bigint'
  else if (this.isSymbol(v)) return 'symbol'
  else if (this.isDOMElement(v)) return 'domelement'
  else return 'none'
}

export default Basekits
