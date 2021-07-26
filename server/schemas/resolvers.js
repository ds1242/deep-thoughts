const { User, Thought } = require('../models');
const { AuthenticationError } = require('apollo-server-express');


const resolvers = {
    Query: {
        users: async() => {
            return User.find()
                .select('-__v -password')
                .populate('thoughts')
                .populate('friends');
        },
        // get single user
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1});
        },
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },
        // get all users
        
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            
            return user;
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw new AuthenticationError('Incorrect Credentials');
            }

            const correctPW = await user.isCorrectPassword(password);

            if(!correctPW) {
                throw new AuthenticationError('Incorrect Credentials');
            }

            return user;
        }
    }
};

module.exports = resolvers;