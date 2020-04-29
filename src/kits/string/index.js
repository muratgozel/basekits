import Basekits from '../../base'
import TypeKit from '../type'

Basekits.prototype = Object.assign(
  {},
  Basekits.prototype,
  TypeKit.prototype
)

Basekits.prototype.sprintf = function sprintf(m, args) {
  if (typeof args == 'number') args = args.toString()
  if (typeof args == 'string' && args.length > 0) args = [args]
  if (!Array.isArray(args)) return m

  const re = /(%s)/
  if (!re.test(m)) return m

  function rpl(str) {
    if (args.length === 0 || !re.test(str)) return str
    else {
      const newStr = str.replace(re, args[0])
      args.shift()
      return rpl(newStr)
    }
  }

  return rpl(m)
}

Basekits.prototype.template = function template(str, props = {}) {
  if (!this.isString(str)) return undefined

  const re = /({{)[^{}]+(}})/gm
  const matches = str.match(re)
  if (!matches || matches.length === 0) return str

  if (!this.isObject(props)) return str

  return matches
    .reduce(function(memo, exp) {
      const prop = exp.slice(2, -2)
      if (props.hasOwnProperty(prop)) {
        memo = memo.replace(exp, props[prop])
      }
      return memo
    }, str)
}

Basekits.prototype.uppercase = function uppercase(str, locale = undefined) {
  if (!this.isString(str)) return undefined

  const l = typeof locale == 'string' ? locale.replace('_', '-') : locale
  return str.toLocaleUpperCase(l)
}

Basekits.prototype.lowercase = function lowercase(str, locale = undefined) {
  if (!this.isString(str)) return undefined

  const l = typeof locale == 'string' ? locale.replace('_', '-') : locale
  return str.toLocaleLowerCase(l)
}

Basekits.prototype.sentencecase = function sentencecase(str, locale = undefined, nouns = []) {
  if (!this.isString(str)) return undefined

  let result = ''
  const words = str.split(' ')
  const len = words.length
  for (let i = 0; i < len; i++) {
    const word = words[i]
    const space = i + 1 !== len ? ' ' : ''
    if (nouns.indexOf(word) !== -1) result += word + space
    else if (i === 0) result += this.uppercase(word.slice(0, 1), locale) +
      this.lowercase(word.slice(1)) +
      space
    else result += word + space
  }

  return result
}

Basekits.prototype.titlecase = function titlecase(str, locale = undefined, nouns = []) {
  if (!this.isString(str)) return undefined

  let result = ''
  const words = str.split(' ')
  const len = words.length
  for (let i = 0; i < len; i++) {
    const word = words[i]
    const space = i + 1 !== len ? ' ' : ''
    if (nouns.indexOf(word) !== -1) result += word + space
    else {
      result += this.uppercase(word.slice(0, 1), locale) +
        this.lowercase(word.slice(1), locale) +
        space
    }
  }

  return result
}

export default Basekits
