# Bluelist

Bluelist provides lazy lists inpsired by Haskell.

## Implemented algebraic structures

Bluelist currently implements the following algebraic structures:

- Functor
- Semigroup
- Setoid
- Foldable
- Monoid

## Functions
Noitce! All the functions and their function-arguemnts are curried.

### map

`map :: (a -> b) -> [a] -> [b]`

#### JS signature

`map (x => y) (List)`

#### Parameters

`x => y` A function that takes a value 'x' and returns a value 'y'.\
`List` A list to operate on.

#### Description

Returns a new list that is the result of applying the function that is passed as the first argument
to all items in the list passed as the second argument.

### filter

`filter :: (a -> Bool) [a] -> [a]`

#### JS signature

`filter (x => Boolean) (List) (List)`

#### Parameters

`x => Boolean` A function that takes a value 'x' and returns a boolean.\
`List` A list to operate on.

#### Description

Takes a predicate(boolean function) and a list and returns a new list whose elements fulfuill the condition in the predicate.

### foldl

`foldl :: (b -> a -> b) -> b -> [a] -> b`

#### JS signature

`foldl (x => y => z) (v) (List)`

#### Parameters

`x => y => z` A function that takes a value 'x' and a value 'y' and returns a value 'z'.\
`v` A value 'v'.
`List` A list to operate on.

#### Description

Takes the first item of the list and and the second argument and applies the function to them, then calls the function with this result and the second item in the list and so on.

Parameters:
`(b -> a -> b)`
a function that takes two arguemnts and returns a new value.
`b`
A value that is going to be provided as a second argument to the function the first time foldl is called.
`[a]`
A list that foldr is going to operatre on its values in order.

### head

`head :: [a] -> a`

#### JS signature

`head (List)`

#### Parameters

`List` A list.

#### Description

Returns the first element in the list. Throws an error when called on an empty list.

### tail

`tail :: [a] -> [a]`

#### JS signature

`tail (List)`

#### Parameters

`List` A list.

#### Description

Returns a list with all the elements in the list provided as the argument except for the first element.
When called on an empty list it throws an error.
When called on a singelton-list it returns an empty list.

### get

`get :: (Num a) -> a -> [b] -> b`

#### JS signature

`get (index) (list)`

#### Parameters
`index` of type Int.
`list` of type List.

#### Description

Takes an index and a list and returns the element at the specified index.