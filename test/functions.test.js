import { l, toArray } from '../src/index'

test('l - Constructign a list from an array', () => {
    const ls1 = l([1, 2, 3])
    expect(toArray(ls1)).toEqual([1, 2, 3])
})

test('l - Constructign a list from seperate arguments', () => {
    const ls1 = l(1, 2, 3)
    expect(toArray(ls1)).toEqual([1, 2, 3])
})