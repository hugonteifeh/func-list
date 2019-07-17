import { product, l, map, toArray, head } from './index'

test ('product of a list', () => {
    const list1 = l ([1, 2, 3])
    expect (product (list1)).toEqual (6)
})

test ('map', () => {
    const list1 = l ([10, 20, 30])
    const list2 = l ([100, 200, 300])
    const arr2 = toArray (list2)
    expect (toArray (map ((x:number) => x * 10) (list1))).toEqual (arr2)
})




test ('Testing nested lists', () => {
    const l2 = head (l ([[2]]))
    console.log ("l2: ", l2)
})

