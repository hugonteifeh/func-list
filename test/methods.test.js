import { l } from '../src/index'

const list = l([1, 2, 6, 10, 12, 202])

test('map', () => {
    expect(list.map(x => x * 100).equals(l([100, 200, 600, 1000, 1200, 20200]))).toBeTruthy()
})

test('filter', () => {
    expect(list.filter(x => x > 100).equals(l([202]))).toBeTruthy()
})

test('foldl', () => {
    const ls1 = l([1, 2, 3, 4, 6])
    expect(ls1.reduce(x => acc => x + acc, 0)).toEqual(16);
})