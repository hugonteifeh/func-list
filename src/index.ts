

const { isObject, isDeepStrictEqual } = require ('util')

export class List<A> {
    [Symbol.iterator]: () => IterableIterator<any>;
    length: number;
    npmPkg: string;
    constructor (generator: () => IterableIterator<any>, length: number) {
        this[Symbol.iterator] = generator;
        this.length = length;
        this.npmPkg = '@housecrow/func-list@0.2.0'
    }
}   
 
function isList <A> (val: any): val is List<A> {
    return /^@housecrow\/func-list/.test (val.npmPkg)
}

export const l = <A>(...arr: A[]): List<A> => fromArray (arr)

const fromArray = <A>(array: A[]): List<A> => {
    return new List (function* (): IterableIterator<A>  {
        yield* array
    }, array.length)
}

export const length = (dataType: any): number => dataType.length

export const isNull = <A>(list: List<A>) : boolean => length (list) === 0

export const toArray = <A>(list: List<A>): A[] => {
    return [...list].map (val => {
        return isList (val)
        ? toArray (val)
        : val
    })
}

export const head = <A>(list: List<A>): A =>   {
    const head = (list[Symbol.iterator] ()).next ()
    if (head.done) throw new Error ("Calling head on an empty list")
    return head.value
}

export const tail = <A>(list: List<A>): List<A> => {
    if (isNull (list)) throw new Error ("Calling tail on an empty list")
    const gen = list[Symbol.iterator]
    return new List (function* () {
        const iterator = gen ();
        iterator.next ();
        yield* iterator;
    }, list.length - 1);
}

export const map = <A, B>(fn: (val: A) => B) => (list: List<A>): List<B> => {
    const gen = list[Symbol.iterator]
    return new List (function* () {
        for (const val of gen ()) {
            yield fn (val)
        }
    }, list.length)
}

export const filter = <A>(predicate: (val: A) => boolean) => (list: List<A>) => {
    const iterator = list[Symbol.iterator] ()
    const newArray = []
    let currentEl = iterator.next ()
    while (!currentEl.done) {
        if (predicate (currentEl.value)) 
            newArray.push (currentEl.value)
            currentEl = iterator.next ()
    }
    return fromArray (newArray)
}

export const foldl = 
<A, B>
(fn: (acc: B) => (val: A) => B) => 
(acc: B) =>
(list: List<A>): B => {
    return isNull (list) 
    ? acc 
    : foldl (fn) (fn (acc) (head (list))) (tail (list))
}

export const foldr =  <A, B>
(fn: (acc: A) => (val: B) => B) => 
(acc: B) =>
(list: List<A>): B => {
    return isNull (list)
        ? acc
        : fn (head (list)) (foldr (fn) (acc) (tail (list) ))
}

export const take =
<A>
(num: number) =>
(list: List<A>):
List<A> => {
    if (num > list.length) return list
    const gen = list[Symbol.iterator]
    const newList =  new List (function* () {  
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

export const drop =
<A>
(num: number) =>
(list: List<A>):
List<A> => {
    if (num > list.length) return list
    const gen = list[Symbol.iterator]
    const newList =  new List (function* () {  
        let index = 0
        const iterator = gen ();
        let el = iterator.next ()
        while (!el.done) {
            if (index > num - 1) yield el.value
            el = iterator.next ()
            index = index + 1
        }
    }, list.length - num);
    
    return newList
}

export const concat = 
<A>
(list1: List<A>) =>
(list2: List<A>):
List<A> => {
    const gen = list1[Symbol.iterator]
    const totalLength = list1.length + list2.length
    return new List (function* () {
        yield* gen ()
        yield* list2
    }, totalLength)
}

export const takeWhile = <A>(fn: (x: A) => boolean) => (ls: List<A>): List<A> => {
    if (ls.length === 0) return ls 
    const headEl = head (ls)
    return fn (headEl) 
        ? concat (l (headEl)) (takeWhile (fn) (tail (ls))) 
        : l ()
}

export const dropWhile = <A>(fn: (x: A) => boolean) => (ls: List<A>): List<A> => {
    return ls.length === 0
        ? l ()
        : fn (head (ls)) 
            ? dropWhile (fn) (tail (ls))
            : ls
}

export const sum : (x: List<number>) => number =  
foldl ((x: number) => (y: number) => x + y) (0)

export const product: (a: List<number>) => number =
foldl ((x: number) => (y: number) => x * y) (1)

export const get = (index: number) => <A>(list: List<A>): A => {
    if (index >= list.length) throw new Error ("Index too large")
    const iterator = list[Symbol.iterator] ()
    let currentEl = iterator.next ()
    let targetEl, currentIndex = 0
    while (!targetEl && currentIndex !== list.length) {
        if (currentIndex === index) targetEl = currentEl.value
        currentEl = iterator.next ()
        currentIndex = currentIndex + 1
    }
    
    return targetEl
}

export const min = (x: number) => (y: number): number => x > y ? y : x
export const max = (x: number) => (y: number): number => min (x) (y) === x ? y : x

export const and = (list: List<boolean>): boolean => {
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

export const all = <A>(fn: (x: A) => boolean) => (list: List<A>): boolean => {
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

export const any = <A>(fn: (x: A) => boolean) => (list: List<A>): boolean => {
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

export const minimum = (ls: List<number>): number => {
    if (length (ls) === 0) throw new Error ("Cannot call minimum on an empty list")
    return length (ls) === 1
        ?  head (ls)
        :  foldl (min) (head (ls)) (tail (ls)) 
}

export const maximum = (ls: List<number>): number => {
    if (length (ls) === 0) throw new Error ("Cannot call maximum on an empty list")
    return length (ls) === 1
        ?  head (ls)
        :  foldl (max) (head (ls)) (tail (ls)) 
}

export const equals = <A>(dt1: A) => (dt2: A): boolean => {
    if (isList (dt1) && isList (dt2)) {
        if (dt1.length !== dt2.length) return false
        if (dt1.length === 0) return true
        else 
            return equals (head (dt1)) (head (dt2)) 
                && (isNull (dt1) ? true : equals (tail (dt1)) (tail (dt2)))
    }
    return isDeepStrictEqual (dt1, dt2)
}

export const last = <A>(list: List<A>): A => {
    if (isNull (list)) throw new Error ("Empty list")
    return get (list.length - 1) (list)
}