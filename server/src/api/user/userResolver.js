const User = require("./userModel");
const bcrypt = require("bcryptjs");

module.exports = {
  Query: {
    user: async function(parent, { email }) {
      try {
        const user = await User.findOne({ email });
        if (user) {
          return user;
        }
        return null;
      } catch (error) {
        // handle error
        throw new Error(`${error}`);
      }
    },
    users: async function() {
      try {
        const users = await User.find({});
        if (users) {
          return users;
        }
        return [];
      } catch (error) {
        // handle error
        throw new Error(`${error}`);
      }
    }
  },
  Mutation: {
    createUser: async (parent, { input: { email, password } }, context) => {
      // prepare our response payload
      let response = {
        user: null,
        error: {}
      };
      // mongoose: see if an user already exists with the same email
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          response.error = {
            message: `User with email ${email} already exists.`
          };
          return response;
        }
        // bcrypt: hash the password with 12 rounds
        try {
          const hashedPassword = await bcrypt.hash(password, 12);
          // mongoose: create our user from model
          const user = new User({
            email,
            password: hashedPassword
          });
          // mongoose: save the user (promise-like object)
          try {
            const newUser = await user.save();
            // destructure the newUser object; override password with null to avoid exposing it
            response.user = {
              ...newUser._doc,
              password: null,
              _id: newUser.id
            };
          } catch (error) {
            response.error = {
              message: `Error during save operation: ${error.message}`
            };
          }
        } catch (error) {
          // error during hashing operation
          response.error = {
            message: `Error during hashing: ${error.message}`
          };
        }
      } catch (error) {
        // error during the initial find
        response.error = {
          message: `Error during findOne operation: ${error.message}`
        };
      }
      return response;
    }
  }
};
