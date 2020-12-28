import Basekits from '../../base'

Basekits.prototype.hashcode = function hashcode(str) {
  let hash = 0

  if (typeof str != 'string') return hash

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }

  return hash
}

export default Basekits
