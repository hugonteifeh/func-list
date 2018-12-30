# Bluelist

Bluelist provides lazy lists inpsired by Haskell.

## Api

## Functions

`map :: (a -> b) -> [a] -> [b]`\
**JS signature** \
`map (x => y) (List) (List)`\
**Parameters**:\
`(x => y)`: A function that takes a value 'x' and returns a value 'y'.\
`List`: A list to operate on.\
`List`: A new list produced by map.

`filter :: (a -> Bool) [a] -> [a]`
Takes a predicate(boolean function) and a list and returns a new list whose elements fulfuill the condition in the predicate.

`foldl :: (b -> a -> b) -> b -> [a] -> b`
Parameters:
`(b -> a -> b)`
a function that takes two arguemnts and returns a new value.
`b`
A value that is going to be provided as a second argument to the function the first time foldl is called.
`[a]`
A list that foldr is going to operatre on its values in order.

`foldr :: (b -> a -> b) -> b -> [a] -> b`

`head :: [a] -> a`
Returns the first element in the list.If called on an empty list it throws an error.

`tail :: [a] -> [a]`
Returns all th elements except for the first element in the list.
If called on an empty list it throws an error.
If called on a singelton-list it returns an empty list.