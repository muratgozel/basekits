import Basekits from '../../base'
import TypeKit from '../type'
import ObjectKit from '../object'

Basekits.prototype = Object.assign(
  {},
  Basekits.prototype,
  TypeKit.prototype,
  ObjectKit.prototype
)

Basekits.prototype.removeDuplicates = function removeDuplicates(arr, deep = false) {
  const self = this
  if (!deep) {
    return arr.filter(function(v, i) {
      return arr.indexOf(v) === i
    })
  }
  else {
    return arr.filter(function(v, i) {
      const indexes = arr
        .map(function(item, ind) {
          return (self.hasOwnProperty('isEqual') ? self.isEqual(item, v) : item === v) ? ind : false
        })
        .filter(function(result) {
          return result !== false
        })
      if (self.isArray(indexes)) return indexes[0] === i
      else return false
    })
  }
}

Basekits.prototype.sortItemsBy = function sortItemsBy(arr, paths, order = 'asc') {
  let prop = null
  if (this.isArray(paths)) {
    prop = '__' + paths.join('_')
    arr = arr.map(function(obj) {
      obj[prop] = this.getProp(obj, paths)
      return obj
    }.bind(this))
  }
  else if (this.isString(paths)) {
    prop = paths
  }
  else {
    return arr
  }

  return arr.sort(function(a, b) {
    const av = a[prop]
    const bv = b[prop]
    if (order == 'desc') return av > bv ? -1 : bv > av ? 1 : 0
    else if (order = 'asc') return av > bv ? 1 : bv > av ? -1 : 0
    else return av > bv ? 1 : bv > av ? -1 : 0
  })
}

export default Basekits
