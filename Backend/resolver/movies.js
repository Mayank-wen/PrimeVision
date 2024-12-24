module.exports = {
    author: async (Movie, args, { models }) => {
    return await models.User.findById(Movie.author);
    },
    favoritedBy: async (Movie, args, { models }) => {
    return await models.User.find({ _id: { $in: Movie.favoritedBy } });
    }
    };
