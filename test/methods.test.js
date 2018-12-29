import { l } from '../src/index'

const list = l([1, 2, 6, 10, 12, 202])

test('map', () => {
    expect(list.map(x => x * 100).equals(l([100, 200, 600, 1000, 1200, 20200]))).toBeTruthy()
})

test('filter', () => {
    expect(list.filter(x => x > 100).equals(l([202]))).toBeTruthy()
})

test('reduce', () => {
    const ls1 = l([1, 2, 3, 4, 6])
    expect(ls1.reduce(x => acc => x + acc, 0)).toEqual(16);
})

test('length', () => {
    expect(list.filter(x => x > 100).length).toEqual(1)
})

test('head', () => {
    expect(list.filter(x => x > 100).head()).toEqual(202)
})

test('tail', () => {
    expect(list.tail().equals(l(2, 6, 10, 12, 202))).toBeTruthy()
})

test('get', () => {
    expect(list.get(3)).toEqual(10)
})

test('take', () => {
    const ls1 = l([1, 2])
    expect(ls1.take(1).equals(l(1))).toBeTruthy()
})

test('drop', () => {
    const ls1 = l([1, 2])
    expect(ls1.drop(1).equals(l(2))).toBeTruthy()
})

test('takeWhile', () => {
    const ls1 = l([4, 5, 6])
    expect(ls1.takeWhile(x => x < 6).equals(l(4, 5))).toBeTruthy()
})

test('dropWhile', () => {
    const ls1 = l([4, 5, 6])
    expect(ls1.dropWhile(x => x < 6).equals(l(6))).toBeTruthy()
})

test('concat', () => {
    const ls1 = l([4, 5, 6])
    const ls2 = l([7, 8, 9])
    expect(ls1.concat(ls2).equals(l(4, 5, 6, 7, 8, 9))).toBeTruthy()
})