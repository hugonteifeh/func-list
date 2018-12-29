import { l,
    toArray,
    map,
    filter,
    head,
    tail,
    foldl,
    foldr, 
    get,
    take,
    drop,
    concat,
    takeWhile,
    dropWhile,
    last,
    cons,
    flip,
    reverse
} from '../src/index'

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

test('get - large index', () => {
    const ls1 = l([2, 3])
    expect(() => get (2) (ls1)).toThrow("Index too large")
})

test('get - large index', () => {
    const ls1 = l([2, 3])
    expect(() => get (2) (ls1)).toThrow("Index too large")
})
test('take - When the length of the list is bigger than num', () => {
    const ls1 = l([1, 2, 3, 4, 6])
    expect(toArray (take (3) (ls1))).toEqual([1, 2, 3]);
})

test('take - When the length of the list is smaller than num', () => {
    const ls1 = l([1, 2])
    expect(toArray (take (3) (ls1))).toEqual([1, 2]);
})

test('drop - When the length of the list is bigger than num', () => {
    const ls1 = l([1, 2, 3, 4])
    expect(toArray (drop (5) (ls1))).toEqual([1, 2, 3, 4])
})

test('drop - When the length of the list is smaller than num', () => {
    const ls1 = l([1, 2, 3, 4])
    expect(toArray (take (10) (ls1))).toEqual([1, 2, 3, 4]);
})

test('concat - two empty lists - returns an empty list', () => {
    const ls1 = l([])
    const ls2 = l([])
    expect(toArray (concat (ls1) (ls2))).toEqual([]);
})

test('concat - two non-empty lists', () => {
    const ls1 = l([1, 2, 3])
    const ls2 = l([4, 5, 6])
    expect(toArray (concat (ls1) (ls2))).toEqual([1, 2, 3, 4, 5, 6]);
})

test('takeWhile - on an empty list', () => {
    const ls1 = l([])
    expect( toArray( takeWhile ( x => x < 3 ) (ls1) ) ).toEqual([])
})

test('takeWhile - on an one-element list', () => {
    const ls1 = l([4])
    expect( toArray( takeWhile ( x => x < 6 ) (ls1) ) ).toEqual([4])
})

test('takeWhile - on a none-empty list', () => {
    const ls1 = l([4, 5, 6])
    expect( toArray( takeWhile ( x => x < 6 ) (ls1) ) ).toEqual([4, 5])
})

test('dropWhile - on an empty list', () => {
    const ls1 = l([])
    expect( toArray( dropWhile ( x => x < 3 ) (ls1) ) ).toEqual([])
})

test('dropWhile - on a non-empty list', () => {
    expect( toArray( dropWhile ( x => x < 3 ) (list) ) ).toEqual([6, 10, 12, 202])
})

test('last - on an empty list', () => {
    const ls1 = l([])
    expect(() => last (ls1)).toThrow()
})

test('last - on a non-empty list', () => {
    const ls1 = l([1, 2, 3, 4])
    expect( (last (ls1)) ).toEqual(4)
})

test('cons', () => {
    expect(toArray (cons (100) (list))).toEqual([100, 1, 2, 6, 10, 12, 202])
})

test('flip', () => {
    const fn = x => y => x - y
    expect(flip (fn) (3) (5) ).toEqual(2);
})

test('reverse', () => {
    const reversed = reverse(list)
    expect(toArray (reversed)).toEqual([202, 12, 10, 6, 2, 1])
})
