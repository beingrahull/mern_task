const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const newUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is a required field"],
    minLength: 3,
    maxLength: 80
  },
  email: {
    type: String,
    required: [true, "Email is a required field"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 8,
    select: false
  }
});

newUserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

newUserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

newUserSchema.methods.GenerateToken=function() {
    return jwt.sign(
        { id: this._id, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    )
}

module.exports = mongoose.model("User", newUserSchema);
