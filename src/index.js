import type from 'sanctuary-type-identifiers'
import { isObject, isDeepStrictEqual } from 'util';

const isArray = Array.isArray

function List(generator, length) {
    this[Symbol.iterator] = generator
    this.length = length
}

List['@@type'] = 'housecrow/func-list'

List['fantasy-land/empty'] = function() {
    return list ()
}

const list = (...args) => {
    return new List (function* () {
        yield* args
    }, args.length)
}

const fromArray = array => {
    return new List (function* () {
        yield* array
    }, array.length)
}

const w = x => isArray (x) ? fromArray (x) : x

export const l = (...args) => {
    return args.length === 1 && Array.isArray (args[0])
        ? fromArray (args[0])
        : (args === undefined 
            ? list () 
            : list (...args))
}

export const length = dataType => dataType.length
const isNull = list => length (list) === 0

export const toArray = list => [...list]

export const map = fn => list => {
    const ls = w (list)
    const gen = ls[Symbol.iterator]
    return new List (function* () {
        for (const val of gen ()) {
            yield fn (w(val))
        }
    }, ls.length)
}

export const filter = predicate => list => {
    const ls = w (list)
    const iterator = ls[Symbol.iterator] ()
    const newArray = []
    let currentEl = iterator.next ()
    while (!currentEl.done) {
        if (predicate (w (currentEl.value))) 
            newArray.push (currentEl.value)
            currentEl = iterator.next ()
    }
    return fromArray (newArray)
}

export const head = list => {
    const ls = w (list)
    const head = ls[Symbol.iterator]().next ()
    if (head.done) throw new Error ("Calling head on an a headless list, not a wise move :p")
    return isArray (head.value) ? fromArray (head.value) : head.value
}

export const tail = list => {
    const ls = w (list)
    if (isNull (ls)) throw new Error ("Calling tail on an empty list")
    const gen = ls[Symbol.iterator]
    return new List (function* () {
        const iterator = gen ();
        iterator.next ();
        yield* iterator;
    }, ls.length - 1);
}

export const foldl = fn => acc => list => {
    const ls = w (list)
    return isNull (ls)
        ? acc
        : foldl (fn)
                (fn (acc) (head (ls)) )
                (tail (ls))
}

export const foldr = fn => acc => list => {
    const ls = w (list)
    return isNull (ls)
        ? acc
        : fn (head (ls))
             (foldr (fn) (acc) (tail (ls) ))
}

export const get = index => list => {
    const ls = w (list)
    if (index >= ls.length) throw new Error ("Index too large")
    const iterator = ls[Symbol.iterator] ()
    let targetEl, currentIndex = 0
    let currentEl = iterator.next ()
    while (!targetEl && currentIndex !== ls.length) {
        if (currentIndex === index) targetEl = currentEl.value
        currentEl = iterator.next ()
        currentIndex = currentIndex + 1
    }
    return Array.isArray (targetEl) ? fromArray (targetEl) : targetEl
}

export const take = num => list => {
    const ls = w (list)
    if (num > ls.length) return ls
    const gen = ls[Symbol.iterator]
    const newList = new List (function* () {  
        let index = 0
        const iterator = gen ();
        let el = iterator.next ()
        while (!el.done && index < num) {
            yield el.value
            index++
            el = iterator.next ()
        }
    }, num);
    return newList
}

export const drop = num => list => {
  const ls = w (list)
  if (num > ls.length) return ls
  const gen = ls[Symbol.iterator]
  const newList = new List(function* () {  
    let index = 0
    const iterator = gen ();
    let el = iterator.next ()
    while (!el.done) {
      if (index > num - 1) yield el.value
      el = iterator.next ()
      index = index + 1
    }
  }, ls.length - num);
  return newList
}

export const concat = list1 => list2 => {
  const ls1 = w (list);
  const ls2 = w (list2)
  const gen = ls1[Symbol.iterator]
  const totalLength = ls1.length + ls2.length
  return new List (function* () {
    yield* gen ()
    yield* ls2
  }, totalLength)
}

export const takeWhile = fn => ls => {
    if (ls.length === 0) return ls 
    const headEl = head (ls)
    return fn (headEl)
        ? concat (list (headEl)) (takeWhile (fn) (tail (ls) )) 
        : list ()
}

export const dropWhile = fn => ls => {
    return ls.length === 0
        ? list ()
        : fn (head (ls)) 
            ? dropWhile (fn) (tail (ls))
            : ls
}

export const last = list => {
    if (isNull (list)) throw new Error ("Empty list")
    return get (list.length - 1) (list)
}

export const cons = el => ls => {
    const elList = fromArray ([el])
    return concat (elList) (ls)
}

export const flip = fn => x => y => fn (y) (x)
export const reverse = foldl (flip (cons)) (list ())
export const sum = foldl (x => y => x + y) (0)
export const product = foldl (x => y => x * y) (1)

export const and = list => {
    const gen = list[Symbol.iterator]
        const iterator = gen ();
        let el = iterator.next ()
        let result = true
        while (!el.done) {
            if (el.value === false) {
                result = false
                break
            }
            el = iterator.next ()
        }
    return result
}

export const or = list => {
    const gen = list[Symbol.iterator]
        const iterator = gen ();
        let el = iterator.next ()
        let result = false
        while (!el.done) {
            if (el.value === true) {
                result = true
                break
            }
            el = iterator.next ()
        }
    return result
}

export const all = fn => list => {
    const gen = list[Symbol.iterator]
    const iterator = gen ();
    let el = iterator.next ()
    let result = true
    while (!el.done) {
        if (fn (el.value) === false) {
            result = false
            break
        }
        el = iterator.next ()
    }
    return result
}

export const any = fn => list => {
    const gen = list[Symbol.iterator]
        const iterator = gen ();
        let el = iterator.next ()
        let result = false
        while (!el.done) {
            if (fn (el.value) === true) {
                result = true
                break
            }
            el = iterator.next ()
        }
    return result
}

export const equals = dt1 => dt2 => {
    if (type (dt1) !== type (dt2))
        throw new Error("At least one of the provided arguments is not a list")
    if (type (dt1) === 'housecrow/func-list') {
        if (dt1.length !== dt2.length) return false
        if (dt1.length === 0) return true
        else 
            return equals (head (dt1)) (head (dt2)) 
                && (isNull (dt1) ? true : equals (tail (dt1)) (tail (dt2)))
    }
    if (isObject (dt1) && dt1['fantasy-land/equals']) return dt1['fantasy-land/equals'](dt2)
    return isDeepStrictEqual (dt1, dt2)
}

export const min = x => y => x > y ? y : x
export const max = x => y => min (x) (y) === x ? y : x

export const minimum = ls => {
    if (length (ls) === 0) throw new Error("Cannot call minimum on an empty list")
    return length (ls) === 1
        ?  head (ls)
        :  foldl (min) (head (ls)) (tail (ls)) 
}

export const maximum = ls => {
    if (length (ls) === 0) throw new Error("Cannot call maximum on an empty list")
    return length (ls) === 1
        ?  head (ls)
        :  foldl (max) (head (ls)) (tail (ls)) 
}

export const splitAt = num => ls => {
    return ls.length === 0
        ? [ls, ls]
        : [take (num) (ls), drop (num) (ls)]
}

const flatten = (list) => {
    if (list.length === 0) return list
    return list.length === 1
        ? head (list)
        : concat (head (list)) (flatten (tail (list)))
}

export const chain = ls => fn => flatten (map (fn) (ls))

export const zipWith = fn => list1 => list2 => {
    return any (isNull) (list (list1, list2))
        ? list ()
        : cons (fn (head (list1)) (head (list2)))
                  (zipWith (fn) (tail (list1)) (tail (list2)))
}

const mapMathod = function (fn) {
    return map (fn) (this)
}
const filterMethod = function (predicate) {
    return filter (predicate) (this)
}
const reduceMethod = function (fn, acc) {
    return foldl (fn) (acc) (this)
}

List['fantasy-land/empty'] = function() {
    return list()
}
List.prototype['fantasy-land/map'] = mapMathod
List.prototype.map = mapMathod
List.prototype['fantasy-land/filter'] = filterMethod
List.prototype.filter = filterMethod
List.prototype['fantasy-land/reduce'] = reduceMethod
List.prototype.reduce = reduceMethod
List.prototype['fantasy-land/equals'] = function(ls2) {
    return equals (this) (ls2)
}
List.prototype['fantasy-land/concat'] = function(ls2) {
    return concat (this) (ls2)
}
List.prototype.equals = function(ls2) {
    return equals (this) (ls2)
}
List.prototype.length = function() {
    return length (this)
}
List.prototype.head = function () {
    return head (this)
}
List.prototype.tail = function () {
    return tail (this)
}
List.prototype.get = function (index) {
    return get (index) (this)
}
List.prototype.take = function (num) {
    return take (num) (this)
}
List.prototype.drop = function (num) {
    return drop (num) (this)
}
List.prototype.takeWhile = function (fn) {
    return takeWhile (fn) (this)
}
List.prototype.dropWhile = function (fn) {
    return dropWhile (fn) (this)
}
List.prototype.concat = function (list2) {
    return concat (this) (list2)
}
List.prototype.last = function () {
    return last (this)
}
List.prototype.cons = function (el) {
    return cons (el) (this)
}
List.prototype.reverse = function () {
    return reverse (this)
}
List.prototype.sum = function () {
    return sum (this)
}
List.prototype.product = function () {
    return product (this)
}
List.prototype.and = function () {
    return and (this)
}
List.prototype.or = function () {
    return or (this)
}
List.prototype.all = function (fn) {
    return all (fn) (this)
}
List.prototype.any = function (fn) {
    return any (fn) (this)
}
List.prototype.minimum = function () {
    return minimum (this)
}
List.prototype.maximum = function () {
    return maximum (this)
}
List.prototype.splitAt = function (index) {
    return splitAt (index) (this)
}
List.prototype.chain = function (fn) {
    return chain (this) (fn)
}
List.prototype.zipWith = function (list2, fn) {
    return zipWith (fn) (this) (list2)
}
