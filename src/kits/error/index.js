import Basekits from '../../base'

Basekits.prototype.objectifyError = function objectifyError(error) {
  const string = JSON.stringify(error, Object.getOwnPropertyNames(error))
  const object = JSON.parse(string)
  object.stack = object.stack.split(/[\n]/g)
  return object
}

Basekits.prototype.stringifyError = function stringifyError(error) {
  return JSON.stringify( this.objectifyError(error) )
}

export default Basekits
