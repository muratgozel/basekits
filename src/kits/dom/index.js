import Basekits from '../../base'
import TypeKit from '../type'
import ObjectKit from '../object'
import FunctionKit from '../function'

Basekits.prototype = Object.assign(
  {},
  Basekits.prototype,
  TypeKit.prototype,
  ObjectKit.prototype,
  FunctionKit.prototype,
)

Basekits.prototype.setDOMGlobal = function setDOMGlobal(name, value) {
  const validGlobals = ['window', 'document']
  if (validGlobals.indexOf(name) === -1) return undefined

  const nameUpFirst = name.slice(0, 1).toUpperCase() + name.slice(1)
  const prefix = 'DOMGlobal'

  this[prefix + nameUpFirst] = value
  return true
}

Basekits.prototype.checkDOMGlobals = function checkDOMGlobals() {
  const validGlobals = ['window', 'document']
  const prefix = 'DOMGlobal'
  for (let i = 0; i < validGlobals.length; i++) {
    const name = validGlobals[i]
    const nameUpFirst = name.slice(0, 1).toUpperCase() + name.slice(1)
    if (typeof this[prefix + nameUpFirst] == 'undefined') {
      this[prefix + nameUpFirst] = name == 'window' ? window
        : name == 'document' ? document
        : undefined
    }
  }
  return true
}

Basekits.prototype.getDOMGlobals = function getDOMGlobals() {
  this.checkDOMGlobals()

  const prefix = 'DOMGlobal'
  return {
    win: this[prefix + 'Window'],
    doc: this[prefix + 'Document']
  }
}

Basekits.prototype.getViewportDimensions = function getViewportDimensions() {
  const {win, doc} = this.getDOMGlobals()

  const hasInnerWidth = !('innerWidth' in win)
  const e = hasInnerWidth ? win : (doc.documentElement || doc.body)
  const a = hasInnerWidth ? 'inner' : 'client'

  return {
    width: e[ a + 'Width' ],
    height: e[ a + 'Height' ]
  }
}

Basekits.prototype.getScrollPos = function getScrollPos() {
  if (window.pageYOffset != undefined) {
    return [pageXOffset, pageYOffset]
  } else {
    var sx, sy, d = document,
        r = d.documentElement,
        b = d.body
    sx = r.scrollLeft || b.scrollLeft || 0
    sy = r.scrollTop || b.scrollTop || 0
    return [sx, sy]
  }
}

Basekits.prototype.getAbsoluteDistanceFromTop = function getAbsoluteDistanceFromTop(element) {
  let t = null;
  const scrollY = (((t = document.documentElement) || (t = document.body.parentNode)) && typeof t.scrollTop == 'number' ? t : document.body).scrollTop
  return scrollY + element.getBoundingClientRect().top
}

Basekits.prototype.getAbsoluteDistanceFromLeft = function getAbsoluteDistanceFromLeft(element) {
  let t = null;
  const scrollX = (((t = document.documentElement) || (t = document.body.parentNode)) && typeof t.scrollLeft == 'number' ? t : document.body).scrollLeft
  return scrollX + element.getBoundingClientRect().left
}

Basekits.prototype.getViewportRelativeDistanceFromTop = function getViewportRelativeDistanceFromTop(element) {
  return element.getBoundingClientRect().top
}

Basekits.prototype.getViewportRelativeDistanceFromBottom = function getViewportRelativeDistanceFromBottom(element) {
  const relTop = this.getViewportRelativeDistanceFromTop(element)
  const viewport = this.getViewportDimensions()
  return viewport.height - relTop
}

Basekits.prototype.getCaretPos = function getCaretPos(el) {
  let start = 0, end = 0, normalizedValue, range, textInputRange, len, endRange

  if (typeof el.selectionStart == 'number' && typeof el.selectionEnd == 'number') {
    start = el.selectionStart
    end = el.selectionEnd
  }
  else {
    range = document.selection.createRange()
    if (range && range.parentElement() == el) {
      len = el.value.length
      normalizedValue = el.value.replace(/\r\n/g, "\n")

      textInputRange = el.createTextRange()
      textInputRange.moveToBookmark( range.getBookmark() )

      endRange = el.createTextRange()
      endRange.collapse(false)

      if (textInputRange.compareEndPoints('StartToEnd', endRange) > -1) {
        start = end = len
      }
      else {
        start = -textInputRange.moveStart('character', -len)
        start += normalizedValue.slice(0, start).split("\n").length - 1

        if (textInputRange.compareEndPoints('EndToEnd', endRange) > -1) {
          end = len
        }
        else {
          end = -textInputRange.moveEnd('character', -len)
          end += normalizedValue.slice(0, end).split("\n").length - 1
        }
      }
    }
  }

  return {
    start: start,
    end: end
  }
}

Basekits.prototype.setCaretPos = function setCaretPos(el, start, end = null) {
  if (this.isNull(end)) end = start

  if (el.setSelectionRange) {
    el.focus()
    el.setSelectionRange(start, end)
  }
  else if (el.createTextRange) {
    const range = el.createTextRange()
    range.collapse(true)
    range.moveEnd('character', end)
    range.moveStart('character', start)
    range.select()
  }
}

Basekits.prototype.onDocumentClick = function onDocumentClick(event) {
  const self = this

  // get window and document globals
  const {win, doc} = self.getDOMGlobals()

  const removeRecipes = []
  for (let i = 0; i < self.documentClickListenerRecipes.length; i++) {
    const recipe = self.documentClickListenerRecipes[i]

    if (recipe.status == 'SKIP_THIS_TIME') {
      self.documentClickListenerRecipes[i].status = 'READY'
      continue;
    }

    if (recipe.type == 'outsideClick') {
      // will remove recipe if 'once' set in 'opts'
      if (self.getProp(recipe, ['opts', 'once']) === true) {
        removeRecipes.push(i)
      }

      // format elements
      if (self.isFunction(recipe.elements)) recipe.elements = recipe.elements()
      const elements = []
      if (self.isArray(recipe.elements)) {
        recipe.elements.map(function(el) {
          if (self.isString(el)) {
            const node = doc.querySelector(el)
            if (self.isDOMElement(node)) elements.push(node)
          }
          else if (self.isDOMElement(el)) elements.push(el)
          else {}
        })
      }
      else if (self.isString(recipe.elements)) {
        const node = doc.querySelector(recipe.elements)
        if (self.isDOMElement(node)) elements.push(node)
      }
      else if (self.isDOMElement(recipe.elements)) {
        elements.push(recipe.elements)
      }
      else {}

      // fire function if clicked element is
      //not one of the excluded elements and
      //not contained by one of the excluded elements
      const inside = elements.filter(el => event.target == el || el.contains(event.target))
      if (!inside || inside.length < 1) {
        recipe.fn()
      }
    }
  }

  if (removeRecipes.length > 0) {
    self.documentClickListenerRecipes = self.documentClickListenerRecipes
      .filter((r, i) => removeRecipes.indexOf(i) === -1)
  }
}

Basekits.prototype.onOutsideClick = function onOutsideClick(_elements = [], fn, opts = {once: true}) {
  const self = this

  // check initial properties
  if (!self.hasOwnProperty('documentClickListenerRegistered')) {
    self.documentClickListenerRegistered = false
  }
  if (!self.hasOwnProperty('documentClickListenerRecipes')) {
    self.documentClickListenerRecipes = []
  }

  // get window and document globals
  const {win, doc} = self.getDOMGlobals()

  // save this recipe
  self.documentClickListenerRecipes.push({
    type: 'outsideClick',
    status: 'SKIP_THIS_TIME',
    elements: _elements,
    fn: fn,
    opts: opts,
    id: self.getProp(opts, 'id', 'global')
  })

  // register document click listener if it hasn't been registered
  if (self.documentClickListenerRegistered === false) {
    self.documentClickListenerRegistered = true

    doc.addEventListener(
      'click',
      self.debounce(self.onDocumentClick.bind(self), 300, {trailing: true}),
      false
    )
  }

  return {
    remove: function() {
      self.removeOutsideClickListener(self.getProp(opts, 'id', 'global'))
    }
  }
}

Basekits.prototype.removeOutsideClickListener = function removeOutsideClickListener(id) {
  this.documentClickListenerRecipes = this.documentClickListenerRecipes
    .filter(r => r.id != id)
}

Basekits.prototype.onOutsideClick2 = function onOutsideClick2(_elements = [], fn, opts = {once: true}) {
  const self = this


}

export default Basekits
