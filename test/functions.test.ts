import { l, toArray, head} from '../src/index'

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
