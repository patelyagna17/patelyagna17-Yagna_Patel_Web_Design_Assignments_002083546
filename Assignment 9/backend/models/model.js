const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
});

userSchema.statics.getAllUsers = async function () {
  try {
    const users = await this.find().lean(); // 'this' refers to the User model
    console.log(users);
    const decryptedUsers = users.map((user) => {
      return {
        fullName: user.fullName,
        email: user.email,
        // password: decryptPassword(user.password, user.salt),
        password: user.password,
        salt: user.salt,
      };
    });
    return decryptedUsers;
  } catch (error) {
    throw new Error(error.message);
  }
};

function decryptPassword(encryptedPassword, salt) {
  return bcrypt.hashSync(encryptedPassword, salt);
}

const User = mongoose.model("Users", userSchema, "users");
module.exports = User;
