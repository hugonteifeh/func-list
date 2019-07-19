import { 
    l, 
    toArray,
    head,
    tail,
    isNull,
    map,
    List,
    filter,
    length,
    product,
    sum,
    concat,
    foldl,
    min,
    max,
    and,
    all,
    any,
    minimum,
    maximum,
    drop,
    take,
    foldr,
    get,
    takeWhile,
    dropWhile,
    equals
} from '../src/index'

test ('head - one dimensional list', () => {
    const ls = l (100, 200, 300)
    expect (head (ls)).toEqual (100)
})

test ('head - two dimensional list', () => {
    const ls = l (
        l (1, 2),
        l (3, 4),
        l (5, 6)
    )
    const ls2 = l (1, 2)

    expect (head (ls)).toEqual (ls2)
})

test ('head - three dimensional list', () => {
    const ls = l (
        l (
            l (1, 2),
            l (3, 4),
            l (5, 6)
        ),
    )
    const ls2 = l (
        l (1, 2),
        l (3, 4),
        l (5, 6)
    )

    expect (head (ls)).toEqual (ls2)
})


test ('toArray - one dimensional list', () => {
    const ls = l (100, 200, 300)
    expect (toArray (ls)).toEqual ([100, 200, 300])
})

test ('toArray - two dimensional list', () => {
    const ls = l (
        l (100),
        l (200),
        l (300)
        )
    expect (toArray (ls)).toEqual ([[100], [200], [300]])
})

test ('toArray - three dimensional list', () => {
    const ls = l (
        l (
            l (100)
        ),
        l (
            l (200)
        ),
        l (
            l (300)
        )
        )
    expect (toArray (ls)).toEqual ([[[100]], [[200]], [[300]]])
})

test ('tail - one dimensional list', () => {
    const ls = l (100, 200, 300)
    expect (tail (ls)).toEqual (l (200, 300))
})


test ('tail - two dimensional list', () => {
    const ls = l (
        l (100),
        l (200),
        l (300)
        )
    expect (tail (ls)).toEqual (l (
        l (200),
        l (300)
        )
    )
})

test ('isNull - one dimensional list', () => {
    const ls = l (1, 2, 3, 4)
    expect (isNull (ls)).toEqual (false)
})


test ('isNull - one dimensional list', () => {
    const ls = l ()
    expect (isNull (ls)).toEqual (true)
})

test ('map - one dimensional list', () => {
    const ls = l (1, 2, 3)
    const mapper = (x: number) => x * 100
    expect (map (mapper) (ls)).toEqual (l (100, 200, 300))
})

test ('map - two dimensional list', () => {
    const ls = l (l (1), l (2), l (3))
    const mapper = (x: List<number>) =>  head (x) * 100
    expect (map (mapper) (ls)).toEqual (l (100, 200, 300))
})

test ('filter - one dimensional list', () => {
    const ls = l (1, 2, 3)
    const predicate = (x: number) => x > 1
    expect (filter (predicate) (ls)).toEqual (l (2, 3))
})

test ('filter - one dimensional list', () => {
    const ls = l (l (1), l (2), l (3))
    const predicate = (x: List<number>) => head (x) > 1
    expect (filter (predicate) (ls)).toEqual (l (l (2), l (3)))
})

test ('length - one dimensional list', () => {
    const ls = l (1, 2, 3)
    expect (length (ls)).toEqual (3)
})

test ('length - two dimensional list', () => {
    const ls = l ( l (1), l (2), l (3))
    expect (length (ls)).toEqual (3)
})


test ('product - one dimensional list', () => {
    const ls = l (2, 5, 4)
    expect (product (ls)).toEqual (40)
})

test ('sum - one dimensional list', () => {
    const ls = l (2, 5, 4)
    expect (sum (ls)).toEqual (11)
})

test ('concat - one dimensional lists', () => {
    const ls1 = l (1, 2, 3)
    const ls2 = l (4, 5, 6)
    expect (concat (ls1) (ls2)).toEqual (l (1, 2, 3, 4, 5, 6))
})

test ('concat - two dimensional lists', () => {
    const ls1 = l (l (1), l (2), l (3))
    const ls2 = l (l (4), l (5), l (6))
    expect (concat (ls1) (ls2)).toEqual (l ( l (1), l (2), l (3), l (4), l (5), l (6)))
})

test ('foldl - one dimensional lists', () => {
    const ls = l (1, 2, 3)
    const reducer = (x: number) => (y: number) => product (l (x, y))
    expect (foldl (reducer) (1) (ls)).toEqual (6)
})

test ('foldl - two dimensional lists', () => {
    const ls = l (l (1), l (2), l (3))
    const reducer = (x: number) => (y: List<number>): number => product (l ( x, head (y)))
    expect (foldl (reducer) (1) (ls)).toEqual (6)
})


test ('min', () => {
    expect (min (2) (1)).toEqual (1)
})

test ('max', () => {
    expect (max (2) (1)).toEqual (2)
})

test ('and - one dimensional lists', () => {
    const ls = l (true, true, false)
    expect (and (ls)).toEqual (false)
})

test ('and - one dimensional lists', () => {
    const ls = l (true, true, true)
    expect (and (ls)).toEqual (true)
})

test ('all - one dimensional lists', () => {
    const ls = l (1, 2, 3)
    expect (all ((x: number) => x > 2 ) (ls)).toEqual (false)
})

test ('all - one dimensional lists', () => {
    const ls = l (1, 2, 3)
    expect (all ((x: number) => x < 4 ) (ls)).toEqual (true)
})

test ('any - one dimensional lists', () => {
    const ls = l (1, 2, 3)
    expect (any ((x: number) => x > 2 ) (ls)).toEqual (true)
})

test ('any - one dimensional lists', () => {
    const ls = l (1, 2, 3)
    expect (any ((x: number) => x > 3 ) (ls)).toEqual (false)
})

test ('minimum - one dimensional lists', () => {
    const ls = l (1, 2, 3)
    expect (minimum (ls)).toEqual (1)
})

test ('maximum - one dimensional lists', () => {
    const ls = l (1, 2, 3)
    expect (maximum (ls)).toEqual (3)
})

test ('drop - one dimensional lists', () => {
    const ls = l (1, 2, 3)
    expect (drop (2) (ls)).toEqual (l (3))
})

test ('drop - two dimensional lists', () => {
    const ls = l ( l (1), l (2), l (3))
    expect (drop (2) (ls)).toEqual (l ( l (3)))
})

test ('take - one dimensional lists', () => {
    const ls = l (1, 2, 3)
    expect (take (2) (ls)).toEqual (l (1, 2))
})

test ('take - two dimensional lists', () => {
    const ls = l ( l (1), l (2), l (3))
    expect (take (2) (ls)).toEqual (l ( l (1), l (2)))
})

test ('foldr', () => {
    const ls = l (1, 2, 3)
    expect (foldr ((x: number) => (acc: number) => x - acc) (0) (ls)).toEqual (2);
})

test ('get - one dimensional list', () => {
    const ls = l (1, 2, 3)
    expect (get (2) (ls)).toEqual (3);
})

test ('get - two dimensional list', () => {
    const ls = l ( l (1), l (2), l (3))
    expect (get (2) (ls)).toEqual (l (3));
})

test ('takeWhile - one dimensional list', () => {
    const ls = l (3, 4, 6)
    expect (takeWhile ((x: number) => x < 5) (ls)).toEqual (l (3, 4));
})

test ('dropWhile - one dimensional list', () => {
    const ls = l (3, 4, 6, 8)
    expect (dropWhile ((x: number) => x < 5) (ls)).toEqual (l (6, 8));
})

test ('equals - one dimensional list', () => {
    const result = equals (l (l (2, 3))) (l (l (2, 3)))
    expect (result).toBeTruthy;
})