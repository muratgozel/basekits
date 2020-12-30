import Basekits from '../../base'
import TypeKit from '../type'

Basekits.prototype = Object.assign(
  {},
  Basekits.prototype,
  TypeKit.prototype
)

Basekits.prototype.assignDeep = function assignDeep(objects=[], useropts={}) {
  const opts = Object.assign({}, {
    concatArrays: false,
    discardNonObjectReplacements: false,
    ignoreKeys: []
  }, useropts || {})

  let result = {}

  for (let i = 0; i < objects.length; i++) {
    const keys = Object.keys(objects[i]).filter(k => opts.ignoreKeys.indexOf(k) === -1)
    for (let j = 0; j < keys.length; j++) {
      const key = keys[j]
      if (this.isObject(objects[i][key])) {
        const childObjects = objects
          .filter(o =>
            o.hasOwnProperty(key) &&
            (opts.discardNonObjectReplacements ? this.isObject(o[key]) : true)
          )
          .map(o => o[key])

        if (opts.discardNonObjectReplacements === true) opts.ignoreKeys.push(key)

        result[key] = this.assignDeep(childObjects, opts)
      }
      else if (this.isArray(objects[i][key]) && opts.concatArrays === true) {
        result[key] = objects
          .filter(o => o.hasOwnProperty(key) && this.isArray(o[key]))
          .reduce((memo, o) => memo.concat(o[key]), [])

        opts.ignoreKeys.push(key)
      }
      else {
        result[key] = objects[i][key]
      }
    }
  }

  return result
}

Basekits.prototype.unflatten = function unflatten(obj) {
  const self = this
  const re = /\[[0-9]+\]$/

  const items = []
  const propstrs = Object.keys(obj)
  for (let i = 0; i < propstrs.length; i++) {
    const propstr = propstrs[i]
    const finalValue = obj[propstr]
    const props = propstr.split('.')
    const lastProp = props.pop()
    let item = {}
    const itemref = item
    let prop = undefined
    while ((prop = props.shift()) !== undefined) {
      item[prop] = {}
      item = item[prop]
    }
    item[lastProp] = finalValue
    items.push(itemref)
  }

  function readobj(object) {
    if (!self.isObject(object)) return object
    return Object.keys(object).reduce(function(memo, prop) {
      if (re.test(prop)) {
        const ind = parseInt(prop.slice(prop.indexOf('[')+1, prop.indexOf(']')))
        const propWOInd = prop.replace(re, '')
        if (!memo.hasOwnProperty(propWOInd)) memo[propWOInd] = []
        memo[propWOInd].push(readobj(object[prop]))
      }
      else {
        memo[prop] = readobj(object[prop])
      }
      return memo
    }, {})
  }

  return readobj(self.assignDeep(items))
}

Basekits.prototype.flatten = function flatten(obj, sep = '.', roots = []) {
  const self = this

  if (self.isObject(obj)) {
    return Object
      .keys(obj)
      .reduce(function(memo, prop) {
        if (
          self.isObject(obj[prop]) ||
          (self.isArray(obj[prop]) && self.isObject(obj[prop][0]))
        ) {
          memo = Object.assign({}, memo, self.flatten(obj[prop], sep, roots.concat([prop])))
        }
        else {
          memo[roots.concat([prop]).join(sep)] = obj[prop]
        }
        return memo
      }, {})
  }
  else if (self.isArray(obj) && self.isObject(obj[0])) {
    const lastPropName = roots[roots.length-1]

    roots.pop()

    return obj
      .reduce(function(memo, o, i) {
        const lastProp = lastPropName + '[' + i + ']'
        memo = Object
          .keys(o)
          .reduce(function(m, p, j) {
            if (
              self.isObject(o[p]) ||
              (self.isArray(o[p]) && self.isObject(o[p][0]))
            ) {
              m = Object.assign({}, m, self.flatten(o[p], sep, roots.concat([lastProp, p])))
            }
            else {
              m[roots.concat([lastProp, p]).join(sep)] = o[p]
            }
            return m
          }, memo)

        return memo
      }, {})
  }
  else {
    return undefined
  }
}

Basekits.prototype.getProp = function getProp(obj, paths, defaultValue = undefined) {
  if (!this.isObject(obj)) return defaultValue

  if (this.isString(paths)) paths = paths.split('.')
  else if (this.isNumber(paths)) paths = [paths]
  else if (!this.isArray(paths)) return defaultValue
  else {}

  if (paths.length < 1) return defaultValue

  let index = 0
  const len = paths.length
  while (this.isObject(obj) && index < len) {
    obj = obj[paths[index]]
    index += 1
    if (index < len && !this.isObject(obj)) return defaultValue
  }

  return this.isUndefined(obj) ? defaultValue : obj
}

Basekits.prototype.removeProp = function removeProp(obj, prop) {
  if (!this.isObject(obj)) return undefined

  const props = Object.keys(obj)
  if (props.indexOf(prop) === -1) return obj

  return props.reduce(function(memo, key) {
    if (key != prop) memo[key] = obj[key]
    return memo
  }, {})
}

export default Basekits
