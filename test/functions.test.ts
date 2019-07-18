import { l, toArray, head, tail, isNull, map, List, filter } from '../src/index'

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
