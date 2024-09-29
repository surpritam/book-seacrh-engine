const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Fetches the authenticated user's data
    me: async (parent, args, context) => {
      if (context.user) {
        // Populate 'savedBooks' to retrieve detailed book information
        const foundUser = await User.findById(context.user._id).populate('savedBooks');
        return foundUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    // Registers a new user and returns an Auth object containing the token and user data
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new AuthenticationError('Failed to create user. ' + error.message);
      }
    },
    // Authenticates a user and returns an Auth object containing the token and user data
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Can't find this user with the provided email.");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Wrong password!');
      }

      const token = signToken(user);
      return { token, user };
    },
    // Saves a book to the user's savedBooks array and returns the updated User
    saveBook: async (parent, { book }, context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            { $addToSet: { savedBooks: book } }, // Prevents duplicates
            { new: true, runValidators: true }
          ).populate('savedBooks'); // Populate to return detailed book info

          return updatedUser;
        } catch (error) {
          throw new AuthenticationError('Failed to save book. ' + error.message);
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // Removes a book from the user's savedBooks array and returns the updated User
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            { $pull: { savedBooks: { bookId } } }, // Removes the book by bookId
            { new: true }
          ).populate('savedBooks'); // Populate to return updated book info

          if (!updatedUser) {
            throw new AuthenticationError("Couldn't find user with this id!");
          }

          return updatedUser;
        } catch (error) {
          throw new AuthenticationError('Failed to remove book. ' + error.message);
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;