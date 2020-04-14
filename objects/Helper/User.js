const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

const User = require("../../model/User");
const REFRESHER_SECRET = process.env.REFRESHER_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  getToken: async function (jwt_id) {
    try {
      const decoded = jwt.verify(jwt_id, REFRESHER_SECRET);

      const _id = decoded._id;

      const user = await User.findOne({
        _id,
        "refresher_token.token": jwt_id,
      });

      if (!user) {
        throw new Error("No user found");
      }

      const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET, {
        expiresIn: 900,
      });

      return token;
    } catch (err) {
      throw new Error(err);
    }
  },
};
