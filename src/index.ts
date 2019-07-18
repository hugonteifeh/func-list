export class List<A> {
    [Symbol.iterator]: () => IterableIterator<any>;
    length: number;
    npmPkg: string;
    constructor (generator: () => IterableIterator<any>, length: number) {
        this[Symbol.iterator] = generator;
        this.length = length;
        this.npmPkg = '@housecrow/func-list'
    }
}   

const isList = (val: any):boolean => val.npmPkg && val.npmPkg === '@housecrow/func-list'

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

const filter = <A>(predicate: (val: A) => boolean) => (list: List<A>) => {
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

const foldl = 
<A, B>
(fn: (acc: B) => (val: A) => B) => 
(acc: B) =>
(list: List<A>): B => {
    return isNull (list) 
    ? acc :
    foldl (fn) (fn (acc) (head (list))) (tail (list))
}

const take =
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

const drop =
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

const concat = 
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

const takeWhile = <A>(fn: (x: A) => boolean) => (ls: List<A>): List<A> => {
    if (ls.length === 0) return ls 
    const headEl = head (ls)
    return fn (headEl) 
        ? concat (l ([headEl])) (takeWhile (fn) (tail (ls))) 
        : l ([])
}

const dropWhile = <A>(fn: (x: A) => boolean) => (ls: List<A>): List<A> => {
    return ls.length === 0
        ? l ([])
        : fn (head (ls)) 
            ? dropWhile (fn) (tail (ls))
            : ls
}

const flip = <A, B, C>
(fn: (x: A) => (y: B) => C) =>
(x: B) => (y: A): C =>
fn (y) (x)

function sum (x: List<number>): number { return foldl ((x: number) => (y: number) => x + y) (0) (x) }

const product: (a: List<number>) => number =
foldl ((x: number) => (y: number) => x * y) (1)

const get = (index: number) => <A>(list: List<A>): A => {
    if (index >= list.length) throw new Error ("Index too large")
    const iterator = list[Symbol.iterator] ()
    let currentEl = iterator.next ()
    let targetEl = currentEl.value, currentIndex = 0
    while (!targetEl && currentIndex !== list.length) {
        if (currentIndex === index) targetEl = currentEl.value
        currentEl = iterator.next ()
        currentIndex = currentIndex + 1
    }

    const isArray = Array.isArray (targetEl)
    return isArray ? fromArray (targetEl) : targetEl
}
