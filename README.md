# Bluelist

Bluelist provides lists with lazy, semi-lazy and strict evaluated functions.

## Implemented algebraic structures

Bluelist currently implements the following algebraic structures:

- Functor
- Semigroup
- Setoid
- Foldable
- Monoid

## API Documentation

For every function a haskellish signature as well as a javascript signature(with a further explanation) will be provided.

## Functions

Some points that are worth mentioning:

- All the functions and their function-arguements are curried.
- Most of the functions that return another list are lazy.
- Generally speaking the functions that result into a new list that has another length than the list that has been provided as an argument are not lazy.
- Every function has a 'laziness' indicator showing the level of laziness, the levels are 'lazy', 'semi-lazy' and 'none'(strict).

### map

Laziness: *lazy*

`map :: (a -> b) -> [a] -> [b]`

#### JS signature

`map (x => y) (list)`

#### Parameters

`x => y` A function that takes a value 'x' and returns a value 'y'.\
`list` of type *List* A list to operate on.

#### Description

Returns a new list that is the result of applying the function that is passed as the first argument
to all items in the list passed as the second argument.

### filter

Laziness: *none*

`filter :: (a -> Bool) [a] -> [a]`

#### JS signature

`filter (x => bool) (list)`

#### Parameters

`x => bool` A function that takes a value 'x' and returns a value of type *Boolean*.\
`list` of type *List*.

#### Description

Takes a predicate(boolean function) and a list and returns a new list whose elements fulfuill the condition in the predicate.

### foldl

Laziness: *semi-lazy*

`foldl :: (b -> a -> b) -> b -> [a] -> b`

#### JS signature

`foldl (x => y => z) (v) (List)`

#### Parameters

`x => y => z` A function that takes a value 'x' and a value 'y' and returns a value 'z'.\
`v` A value 'v'.\
`List` A list to operate on.

#### Description

Takes the first item of the list and and the second argument and applies the function to them, then calls the function with this result and the second item in the list and so on.

### head

Laziness: *none*

`head :: [a] -> a`

#### JS signature

`head (list)`

#### Parameters

`list` of type *List*.

#### Description

Returns the first element in the list. Throws an error when called on an empty list.

### tail

Laziness: *lazy*

`tail :: [a] -> [a]`

#### JS signature

`tail (list)`

#### Parameters

`List` of type *List*.

#### Description

Returns a list with all the elements in the list provided as the argument except for the first element.
When called on an empty list it throws an error.
When called on a singelton-list it returns an empty list.

### get

Laziness: *none*

`get :: (Num a) -> a -> [b] -> b`

#### JS signature

`get (index) (list)`

#### Parameters
`index` of type *Number*.\
`list` of type *List*.

#### Description

Takes an index and a list and returns the element at the specified index.

### take

Laziness: *lazy*

`take :: Int -> [a] -> [a]`

#### JS signature

`take (num) (list)`

#### Parameters
`num` of type *Number*.\
`list` of type *List*.

#### Description

Returns a new list, the first argument speicifies how many items will be taken from the list passed as the second argument.

### drop

Laziness: *lazy*

`drop :: Int -> [a] -> [a]`

#### JS signature

`drop (num) (list)`

#### Parameters
`num` of type *Number*.\
`list` of type *List*.

#### Description

Returns a subllist constructed from the list provided as the second argument, the first argument speicifies how many items will be ignored.

### concat

Laziness: *lazy*

`concat :: [a] -> [a] -> [a]`

#### JS signature

`concat (list1) (list2)`

#### Parameters
`list1` of type *List*.\
`list2` of type *List*.

#### Description

Returns a new list that is constrcuted from the concatenation of the two provided lists.

### last

Laziness: *none*

`last :: [a] -> a`

#### JS signature

`last (list1) (list2)`

#### Parameters
`list` of type *List*.\

#### Description

Returns the last element in the list.Throws an error when called on an empty list.

### cons

Laziness: *lazt*

`cons :: a -> [a] -> [a]`

#### JS signature

`cons (x) (list)`

#### Parameters
`x` a value 'x'.\
`list` of type *List*.

#### Description

Returns a new list that is the result of preapending 'x' to the provided list.

### reverse

Laziness: *lazy*

`reverse :: [a] -> [a]`

#### JS signature

`reverse (list)`

#### Parameters
`list` of type *List*.

#### Description

Returns a new list containg the elements in the provided list in the reverse order.

### sum

Laziness: *semi-lazy*

`sum :: [a] -> a`

#### JS signature

`sum (list)`

#### Parameters
`list` of type *List*.

#### Description

Returns the sum of  all the elements in the provided list. when called on an empty list the result is 0.

### product

Laziness: *semi-lazy*

`product :: [a] -> a`

#### JS signature

`product (list)`

#### Parameters
`list` of type *List*.

#### Description

Returns the product of all the elements in the provided list. when called on an empty list the result is 1.