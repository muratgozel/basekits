import Basekits from '../../base'
import TypeKit from '../type'
import ErrorKit from '../error'
import ArrayKit from '../array'

Basekits.prototype = Object.assign(
  {},
  Basekits.prototype,
  TypeKit.prototype,
  ErrorKit.prototype,
  ArrayKit.prototype,
)

Basekits.prototype.isEmpty = function isEmpty(v) {
  if (this.isObject(v)) return this.isEqual({}, v)
  else if (this.isArray(v)) return v.length === 0
  else if (this.isNull(v)) return true
  else if (this.isUndefined(v)) return true
  else if (this.isNumber(v)) return this.isEqual(0, v)
  else if (this.isNan(v)) return true
  else if (this.isString(v)) return this.isEqual('', v)
  else if (this.isBoolean(v)) return this.isEqual(false, v)
  else return false
}

Basekits.prototype.isNotEmpty = function isNotEmpty(v) {
  return this.isEmpty(v) === true ? false : true
}

Basekits.prototype.isEqual = function isEqual(value, otherValue) {
  if (value === otherValue) return true;
  if (value === null || otherValue === null) return false;

  const type = this.getType(value)
  const otherType = this.getType(otherValue)

  if (type != otherType) return false;

  switch (type) {
    case 'object':
      const keys = Object.keys(value)
      const otherKeys = Object.keys(otherValue)
      const keyLength = keys.length
      if (keyLength !== otherKeys.length) return false

      for (let i = 0; i < keyLength; i++) {
        const k = keys[i]
        if (otherKeys.indexOf(k) === -1) return false
        if (!this.isEqual(value[k], otherValue[k])) return false
      }

      return true
      break;

    case 'array':
      const length = value.length
      if (length !== otherValue.length) return false

      for (let i = 0; i < length; i++) {
        if (!this.isEqual(value[i], otherValue[i])) return false
      }

      return true
      break;

    case 'error':
      const obj = this.objectifyError(value)
      const otherObj = this.objectifyError(otherValue)

      return this.isEqual(obj, otherObj)
      break;

    case 'date':
      return value.getTime() === otherValue.getTime()
      break;

    case 'undefined':
      return true
      break;

    case 'number':
    case 'nan':
    case 'string':
    case 'boolean':
    case 'domelement':
      return value === otherValue
      break;

    case 'regexp':
      return value.toString() === otherValue.toString()
      break;

    default:
      return false
  }
}

Basekits.prototype.isUUID = function isUUID(v) {
  return this.regexes.uuid.test(v)
}

Basekits.prototype.isEmail = function isEmail(v) {
  return this.regexes.email.test(v)
}

Basekits.prototype.isPhoneNum = function isPhoneNum(string, countryCode, lib = null) {
  const library = this.isObject(lib) && lib.hasOwnProperty('parsePhoneNumber')
    ? lib
    : this.isObject(window.libphonenumber) && window.libphonenumber.hasOwnProperty('parsePhoneNumber')
      ? window.libphonenumber
      : null
  if (this.isNull(library)) throw new Error('PHONE_NUM_LIB_NOT_FOUND')

  try {
    library.parsePhoneNumber(string, countryCode)
    return true
  } catch (e) {
    return false
  }
}

Basekits.prototype.isURL = function isURL(value, options = {}) {
  if (typeof value != 'string') {
    return false
  }

  const defaultOptions = {
    allowLocal: false,
    allowDataUrl: false,
    schemes: ['http', 'https']
  }
  options = Object.assign({}, defaultOptions, options)

  const {allowLocal, allowDataUrl, schemes} = options

  // https://gist.github.com/dperini/729294
  let regex =
    "^" +
    // protocol identifier
    "(?:(?:" + schemes.join("|") + ")://)" +
    // user:pass authentication
    "(?:\\S+(?::\\S*)?@)?" +
    "(?:";

  let tld = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";

  if (allowLocal) {
    tld += "?";
  }
  else {
    regex +=
      // IP address exclusion
      // private & local networks
      "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
      "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
      "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})";
  }

  regex +=
      // IP address dotted notation octets
      // excludes loopback network 0.0.0.0
      // excludes reserved space >= 224.0.0.0
      // excludes network & broacast addresses
      // (first & last IP address of each class)
      "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
      "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
      "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
    "|" +
      // host name
      "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
      // domain name
      "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
      tld +
    ")" +
    // port number
    "(?::\\d{2,5})?" +
    // resource path
    "(?:[/?#]\\S*)?" +
  "$";

  if (allowDataUrl) {
    // RFC 2397
    const mediaType = "\\w+\\/[-+.\\w]+(?:;[\\w=]+)*";
    const urlchar = "[A-Za-z0-9-_.!~\\*'();\\/?:@&=+$,%]*";
    const dataurl = "data:(?:" + mediaType + ")?(?:;base64)?," + urlchar;
    regex = "(?:" + regex + ")|(?:^" + dataurl + "$)";
  }

  const re = new RegExp(regex, 'i')
  if (!re.test(value)) return false

  return true
}

export default Basekits
