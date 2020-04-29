import Basekits from '../../base'
import TypeKit from '../type'

Basekits.prototype = Object.assign(
  {},
  Basekits.prototype,
  TypeKit.prototype
)

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
