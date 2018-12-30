# Bluelist

Bluelist provides lists with lazy, semi-lazy and strict evaluated functions inpsired by Haskell.

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
- The lazy functions are the functions that return

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
`v` A value 'v'.
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
`index` of type *Int*.\
`list` of type *List*.

#### Description

Takes an index and a list and returns the element at the specified index.