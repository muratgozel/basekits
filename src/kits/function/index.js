import Basekits from '../../base'
import TypeKit from '../type'
import ErrorKit from '../error'

Basekits.prototype = Object.assign(
  {},
  Basekits.prototype,
  TypeKit.prototype,
  ErrorKit.prototype
)

Basekits.prototype.stringifyURLObject = function stringifyURLObject(obj) {
  return obj.protocol + '//' +
    (obj.username && obj.password ? obj.username + ':' + obj.password + '@' : '') +
    obj.hostname +
    (obj.port != 80 ? ':' + obj.port : '') +
    (typeof obj.pathname == 'string' ? obj.pathname : '')
}

Basekits.prototype.waitForIt = function waitForIt(condition, cb, interval = 300, timeout = 10000) {
  let timer = setInterval(function() {
    if (condition.call() === true) {
      clearInterval(timer)
      timer = null
      cb.call()
    }
  }, interval)

  setTimeout(function() {
    if (timer) {
      clearInterval(timer)
      cb.call(null, false)
    }
  }, timeout)
}

Basekits.prototype.throttle = function throttle(func, wait, options) {
  let leading = true
  let trailing = true

  if (typeof func != 'function') {
    throw new TypeError('Invalid debounce function.')
  }

  if (Object.prototype.toString.call(options) === '[object Object]') {
    leading = 'leading' in options ? !!options.leading : leading
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  return this.debounce(func, wait, {
    leading: leading,
    maxWait: wait,
    trailing: trailing
  })
}

Basekits.prototype.debounce = function debounce(func, wait, options) {
  let lastArgs, lastThis, maxWait, result, timerId, lastCallTime;
  let lastInvokeTime = 0
  let leading = false
  let maxing = false
  let trailing = true

  if (typeof func != 'function') {
    throw new TypeError('Invalid debounce function.')
  }

  wait = parseFloat(wait) || 0
  if (Object.prototype.toString.call(options) === '[object Object]') {
    leading = !!options.leading
    maxing = 'maxWait' in options
    maxWait = maxing ? Math.max(parseFloat(options.maxWait) || 0, wait) : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  function invokeFunc(time) {
    let args = lastArgs
    let thisArg = lastThis

    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait)
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result
  }

  function remainingWait(time) {
    let timeSinceLastCall = time - lastCallTime
    let timeSinceLastInvoke = time - lastInvokeTime
    let timeWaiting = wait - timeSinceLastCall

    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting
  }

  function shouldInvoke(time) {
    let timeSinceLastCall = time - lastCallTime
    let timeSinceLastInvoke = time - lastInvokeTime

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (
      lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait)
    )
  }

  function timerExpired() {
    let time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time))
  }

  function trailingEdge(time) {
    timerId = undefined

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now())
  }

  function debounced() {
    let time = Date.now()
    let isInvoking = shouldInvoke(time)

    lastArgs = arguments
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait)
    }
    return result;
  }

  debounced.cancel = cancel
  debounced.flush = flush

  return debounced
}

Basekits.prototype.stringify = function stringify(v) {
  if (this.isObject(v) || this.isArray(v)) return JSON.stringify(v)
  else if (this.isString(v)) return v
  else if (this.isNumber(v) || this.isInteger(v)) return v.toString()
  else if (this.isBoolean(v)) return v.toString()
  else if (this.isNull(v)) return 'null'
  else if (this.isUndefined(v)) return 'undefined'
  else if (this.isDate(v)) return v.toISOString()
  else if (this.isError(v)) return this.stringifyError(v)
  else if (this.isNan(v)) return 'NaN'
  else if (this.isDOMElement(v) && v.innerText) return v.innerText
  else if (this.isFunction(v) || this.isRegExp(v)) return v.toString()
  else if (this.isBigInt(v) || this.isSymbol(v)) return v.toString()
  else return ''
}

Basekits.prototype.destringify = function destringify(v, type = null) {
  if (this.isString(type)) {
    if (type == 'object' || type == 'array') {
      try {
        return JSON.parse(v)
      } catch (e) {
        return type == 'object' ? {} : type == 'array' ? [] : {}
      }
    }
    else if (type == 'string') return v
    else if (type == 'number') return parseFloat(v)
    else if (type == 'boolean') return v == 'true' ? true : false
    else if (type == 'null') return null
    else if (type == 'undefined') return undefined
    else if (type == 'data') return new Date(v)
    else if (type == 'error') return this.objectifyError(v)
    else if (type == 'nan') return NaN
    else if (type == 'regexp') return new RegExp(v)
    else if (type == 'bigint') return BigInt(v)
    else if (type == 'symbol') return Symbol(v)
    else return v // unable to convert domelement, function and others
  }
  else {
    return v
  }
}

export default Basekits
