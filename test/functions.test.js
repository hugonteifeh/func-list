import { l, toArray, map, filter } from '../src/index'

const list = l([1, 2, 6, 10, 12, 202])

test('l - Constructign a list from an array', () => {
    const ls1 = l([1, 2, 3])
    expect(toArray(ls1)).toEqual([1, 2, 3])
})

test('l - Constructign a list from seperate arguments', () => {
    const ls1 = l(1, 2, 3)
    expect(toArray(ls1)).toEqual([1, 2, 3])
})

test('map as a function', () => {
    const mList = map(x => x * 100)(list)
    expect(toArray(mList)).toEqual([100, 200, 600, 1000, 1200, 20200]);
})

test('calling filter as a function', () => {
    const fList = filter(x => x > 100)(list)
    expect(toArray(fList)).toEqual([202]);
})