import TypeKit from './kits/type'
import ErrorKit from'./kits/error'
import HashKit from'./kits/hash'
import StringKit from './kits/string'
import ObjectKit from './kits/object'
import ArrayKit from './kits/array'
import FunctionKit from './kits/function'
import ValidationKit from './kits/validation'
import DOMKit from './kits/dom'

// has no other kit
export const typekit = new TypeKit()
export const errorkit = new ErrorKit()
export const hashkit = new HashKit()

// has typekit
export const stringkit = new StringKit()
export const objectkit = new ObjectKit()

// has type, object
export const arraykit = new ArrayKit()

// has type, error
export const functionkit = new FunctionKit()

// has type, error, array
export const validationkit = new ValidationKit()

// type, object, function
export const domkit = new DOMKit()
