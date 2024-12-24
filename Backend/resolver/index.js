const Query = require('./query');
const Mutation = require('./mutation');
const Movie = require('./movies');
const User = require('./user');
const { DateTimeResolver } = require('graphql-scalars');
module.exports = {
Query,
Mutation,
Movie,
User,
DateTime: DateTimeResolver
};
