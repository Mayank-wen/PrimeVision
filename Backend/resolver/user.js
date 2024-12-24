module.exports = {
  Movies: async (user, args, { models }) => {
    return await models.Movie.find({ author: user.id })
      .sort({ _id: -1 })
      .limit(20)
  },
  favorites: async (user, args, { models }) => {
    return await models.Movie.find({ favoritedBy: user.id });
  }
};