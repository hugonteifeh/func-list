import type from 'sanctuary-type-identifiers'
import { isObject, isDeepStrictEqual } from 'util';

interface ListType<a> {
    [Symbol.iterator]: Iterator<a>;
    length: number; 
}

export function List<a, b> (generator: Iterator<b>, arr: a[], length: number): ListType<a, b> {
    return {
        [Symbol.iterator]: generator,
        value: arr,
        length
    }
}

const list = <a>(arr?: a[]): ListType<a> => {
    return List (function* (): IterableIterator<a> {
        yield* arr
    }, arr, arr.length)
}

List['@@type'] = 'housecrow/func-list'
List['fantasy-land/empty'] = <a> (): ListType<a> => list ()


const fromArray = <a>(array: a[]): ListType<a> => {
    return List (function* (): IterableIterator<a>  {
        yield* array
    }, array, array.length)
}

export const l = <a>(arr?: a[]): ListType<a> => list (arr)

export const length = dataType => dataType.length

const isNull = <a>(list: ListType<a>) : boolean => length (list) === 0

//export const toArray = <a>(list: ListType<a>): a[] => [...list]

export const map = <a, b>(fn: (val: a) => b) => (list: ListType<a>): ListType<b> => {
    const gen = list[Symbol.iterator]
    return List (function* () {
        for (const val of gen ()) {
            yield fn (val)
        }
    }, list.value, list.length)
}

export const filter = 
<a>(predicate: (val: a) => boolean) => (list: ListType<a>) => {
    const iterator = list[Symbol.iterator] ()
    const newArray = []
    let currentEl = iterator.next ()
    while (!currentEl.done) {
        if (predicate (currentEl.value)) 
            newArray.push (currentEl.value)
            currentEl = iterator.next()
    }
    return fromArray (newArray)
}

export const head = <A>(list: ListType<A>) : A => {
    const head = (list[Symbol.iterator] ()).next()
    if (head.done) throw new Error ("Calling head on an empty list")
    return head.value
}

function test(): void {
}

export const tail = <A>(list: ListType<A>): ListType<A> => {
    if (isNull (list)) throw new Error ("Calling tail on an empty list")
    const gen = list[Symbol.iterator]
    return List (function* () {
        const iterator = gen ();
        iterator.next ();
        yield* iterator;
    }, list.value, list.length - 1);
}


export const foldl = <a, b>
(fn: (acc: b) => (val: a) => b) => 
(acc: b) =>
(list: ListType<a>): b => {
    return isNull (list) ?
                     acc :
                     foldl (fn) (fn (acc) (head (list))) (tail (list))
}

export const foldr = fn => acc => list => {
    return isNull (list)
        ? acc
        : fn(head (list))
             (foldr (fn) (acc) (tail (list) ))
}

export const get = index => list => {
    if (index >= list.length) throw new Error ("Index too large")
    const iterator = list[Symbol.iterator] ()
    let targetEl, currentIndex = 0
    let currentEl = iterator.next ()
    while (!targetEl && currentIndex !== list.length) {
        if (currentIndex === index) targetEl = currentEl.value
        currentEl = iterator.next ()
        currentIndex = currentIndex + 1
    }
    return Array.isArray (targetEl) ? fromArray (targetEl) : targetEl
}

export const take = num => list => {
        if (num > list.length) return list
        const gen = list[Symbol.iterator]
        const newList =  List (function* () {  
            let index = 0
            const iterator = gen ();
            let el = iterator.next ()
            while (!el.done && index < num) {
                yield el.value
                index++
                el = iterator.next ()
            }
        }, list.value, num);
        return newList
}

export const drop = num => list => {
        if (num > list.length) return list
        const gen = list[Symbol.iterator]
        const newList =  List(function* () {  
            let index = 0
            const iterator = gen ();
            let el = iterator.next ()
            while (!el.done) {
                if (index > num - 1) yield el.value
                el = iterator.next ()
                index = index + 1
            }
        }, list.value, list.length - num);
        return newList
}

export const concat = list1 => list2 => {
    const gen = list1[Symbol.iterator]
    const totalLength = list1.length + list2.length
    return List (function* () {
        yield* gen ()
        yield* list2
    }, list1.value, totalLength)
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
