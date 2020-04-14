const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESHER_SECRET = process.env.REFRESHER_SECRET;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error("Invalid email address!");
        }
      },
    },
    type: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(val) {
        if (val.length < 8) {
          throw new Error("Password must be greater than 8!");
        } else if (val.toLowerCase().includes("password")) {
          throw new Error("Password must not contain familiar phrases!");
        }
      },
    },
    refresher_token: [
      {
        token: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Remove Password
userSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.refresher_token;

  return userObject;
};

// Generate token on Login/Register
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET, {
    expiresIn: 900,
  });
  return token;
};

// Generate Refresher token on Login/Register
userSchema.methods.generateRefresherToken = async function () {
  const user = this;

  const refresherToken = jwt.sign(
    { _id: user._id.toString() },
    REFRESHER_SECRET
  );

  user.refresher_token = [...user.refresher_token, { token: refresherToken }];
  user.save();

  return refresherToken;
};

// Check password for login
userSchema.statics.getCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Wrong password!");
  }

  return user;
};

// Hash password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }

  next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;
