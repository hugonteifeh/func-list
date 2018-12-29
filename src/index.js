import Sanctuary from 'sanctuary'
import type from 'sanctuary-type-identifiers'
import $ from 'sanctuary-def'
import { isObject, isDeepStrictEqual } from 'util';

const ListType = $.UnaryType
    ('Uprising/List')
    ('http://example.com/my-package#Integer')
    (x => (type(x) === 'Uprising/List'))
    (list => list.value)

const env = Sanctuary.env.concat([ListType($.Unknown)])

const S = Sanctuary.create ({
    checkTypes: true,
    env,
});

function List(generator, arr, length) {
    this[Symbol.iterator] = generator
    this.value = arr || this.value
    this.length = length
}

List['@@type'] = 'Uprising/List'
List['fantasy-land/empty'] = function() {
    return list()
}

const list = (...args) => {
    return new List(function* () {
        yield* args
    }, args, args.length)
}

const fromArray = array => {
    return new List(function* () {
        yield* array
    }, array, array.length)
}

const l = (...args) => {
    return args.length === 1 && Array.isArray(args[0])
        ? fromArray(args[0])
        : (args === undefined 
            ? list () 
            : list (...args) )
}

const isNull = list => list.length === 0

const toArray = list => [...list]

export {
    l,
    toArray
}