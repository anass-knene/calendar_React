const { UserInputError } = require("apollo-server");

const Joi = require("@hapi/joi");
const UserCollection = require("../models/userSchema");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    async getOneUser(_, { id }, { req }) {
      const getUser = await UserCollection.findById({ id });
      if (getUser) {
        return getUser;
      } else {
        throw new Error("user not found");
      }
    },
    async getVerify(_, __, { req }) {
      const token = req.headers["token"];
      if (token) {
        const decode = jwt.verify(token, "secret-key");
        if (decode) {
          const user = await UserCollection.findById(decode.userId);

          return { user: user };
        } else {
          throw new Error("you have to login");
        }
      }
    },
  },
  Mutation: {
    async loginUser(_, { email, password }, { req }) {
      const user = await UserCollection.findOne({ email: email });
      if (!user) {
        throw new Error("Account not found , please sign up");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Password is incorrect");
      }
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          name: user,
        },
        "secret-key",
        { expiresIn: "2h" }
      );
      return { token: token, tokenExpiration: 2, user: user };
    },

    async addUser(_, args) {
      const schema = Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        email: Joi.string().email({ tlds: { allow: false } }),
        password: Joi.string().regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,15}$/
        ),
      });

      const { value, error } = schema.validate(args, { abortEarly: false });
      if (error) {
        throw new UserInputError(
          error.details.map((item) => {
            if (item.message.includes("required pattern")) {
              item.message = `Your password should have minimum 5 and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character:`;
            } else {
              return item.message;
            }
          }),
          {
            validationError: error.details,
          }
        );
      }
      const findUser = await UserCollection.findOne({ email: args.email });
      if (!findUser) {
        const hashedPassword = bcrypt.hashSync(args.password, 10);
        args.password = hashedPassword;
        const createUser = new UserCollection(args);
        return await createUser.save();
      } else {
        throw new Error("you have already registered with this email");
      }
    },
  },
};
module.exports = { resolvers };
