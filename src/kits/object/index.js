import Basekits from '../../base'
import TypeKit from '../type'

Basekits.prototype = Object.assign(
  {},
  Basekits.prototype,
  TypeKit.prototype
)

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
    const lastItem = roots[roots.length-1]
    return obj
      .reduce(function(memo, o, i) {
        roots.pop()
        const updatedLastItem = lastItem + '[' + i + ']'
        memo = Object
          .keys(o)
          .reduce(function(m, p, j) {
            if (
              self.isObject(o[p]) ||
              (self.isArray(o[p]) && self.isObject(o[p][0]))
            ) {
              m = Object.assign({}, m, self.flatten(o[p], sep, roots.concat([updatedLastItem, p])))
            }
            else {
              m[roots.concat([updatedLastItem, p]).join(sep)] = o[p]
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

  if (this.isString(paths)) paths = [paths]
  else if (!this.isArray(paths)) return defaultValue

  if (paths.length < 1) return defaultValue

  let index = 0
  const len = paths.length
  while (this.isObject(obj) && index < len) {
    obj = obj[paths[index]]
    index += 1
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
