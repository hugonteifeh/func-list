import { l, toArray, map, filter, head, tail, foldl, foldr } from '../src/index'

const list = l([1, 2, 6, 10, 12, 202])

test('l - Constructign a list from an array', () => {
    const ls1 = l([1, 2, 3])
    expect(toArray(ls1)).toEqual([1, 2, 3])
})

test('l - Constructign a list from seperate arguments', () => {
    const ls1 = l(1, 2, 3)
    expect(toArray(ls1)).toEqual([1, 2, 3])
})

test('map', () => {
    const mList = map(x => x * 100)(list)
    expect(toArray(mList)).toEqual([100, 200, 600, 1000, 1200, 20200]);
})

test('filter', () => {
    const fList = filter(x => x > 100)(list)
    expect(toArray(fList)).toEqual([202]);
})

test('head - on an empty list - error', () => {
    const ls1 = l([])
    expect(() => head (ls1)).toThrow()
})

test('head - on a list', () => {
    const ls1 = l([1])
    expect(head (ls1)).toEqual(1)
})


test('tail - on an empty list - error', () => {
    const ls1 = l([])
    expect(() => tail (ls1)).toThrow()
})

test('tail - on a singelton list - returns empty list', () => {
    const ls1 = l([1])
    expect(tail (ls1)).toEqual(l())
})

test('tail - on a multi-element list', () => {
    const ls1 = l([1, 2, 3])
    expect(tail (ls1)).toEqual(l(2, 3))
})

test('foldl', () => {
    const ls1 = l([1, 2, 3, 4, 6])
    expect(foldl(x => acc => x + acc) (0) (ls1)).toEqual(16);
})

test('foldr', () => {
    const ls1 = l([1, 2, 3])
    expect(foldr (x => acc => x - acc) (0) (ls1)).toEqual(2);
})