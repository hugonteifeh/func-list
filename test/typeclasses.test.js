import Z from 'sanctuary-type-classes'
import { l } from '../src/index'

const ls = l([1, 2, 3])
test('List is a Functor', () => {
    expect(Z.Functor.test(ls)).toBeTruthy()
})

test('List is a Semigroup', () => {
    expect(Z.Semigroup.test(ls)).toBeTruthy()
})

test('List is a Setoid', () => {
    expect(Z.Setoid.test(ls)).toBeTruthy()
})

test('List is a Foldable', () => {
    expect(Z.Foldable.test(ls)).toBeTruthy()
})

test('List is a Monoid', () => {
    expect(Z.Monoid.test(ls)).toBeTruthy()
})
