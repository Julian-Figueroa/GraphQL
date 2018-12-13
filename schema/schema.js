const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

//Dummy Data
let books = [
    {
        name: 'El Otoño del Patriarca', 
        genre: 'Novela, Ficción', 
        id: '1',
        authorId: '1'
    },
    {
        name: 'La Bruja', 
        genre: 'Esotérico', 
        id: '2',
        authorId: '2'
    },
    {
        name: 'Farewell To Arms', 
        genre: 'Realismo Literario', 
        id: '3',
        authorId: '3'
    },
    {
        name: 'El Coronel No Tiene Quien Le Escriba', 
        genre: 'Novela, Ficción', 
        id: '4',
        authorId: '1'
    },
    {
        name: 'Cien Años de Soledad', 
        genre: 'Novela, Ficción', 
        id: '5',
        authorId: '1'
    },
    {
        name: 'The Oldman And The Sea', 
        genre: 'Realismo Literario', 
        id: '6',
        authorId: '3'
    }
];

let authors = [
    {
        name: 'Gabriel García Márquez', 
        age: 48, 
        id: '1'
    },
    {
        name: 'German Castro Caycedo', 
        age: 54, 
        id: '2'
    },
    {
        name: 'Ernest Hemingway', 
        age: 28, 
        id: '3'
    }
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, {
                    id: parent.authorId
                });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args){                              
                return _.filter(books, {
                    authorId: parent.id 
                });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args){                              
                return _.find(books, {
                    id: args.id
                });
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args){
                return _.find(authors, {
                    id: args.id
                });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});