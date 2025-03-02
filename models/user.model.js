const mongoose = require("mongoose");
const bycrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isEmailTaken = async function (email) {
    const user = await this.findOne({ email: email });
    return !!user;
}

userSchema.methods.comparePassword = async function (password) {
    return await bycrypt.compare(password, this.password);
}

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bycrypt.hash(this.password, 8);
        }
    next();
})


const User = mongoose.model("User", userSchema);

module.exports = User;