import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [5, "Name must be at least 5 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    minlength: [5, "Email must be at least 5 characters long"],
    // match: [
    //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    //   "Please fill a valid email address",
    // ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [5, "Password must be at least 5 characters long"],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPassportCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  );
};
