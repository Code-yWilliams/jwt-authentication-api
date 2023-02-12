import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,

  },
  password: {
    type: String,
    required: true,

  },

});

userSchema.pre('save', async (next) => {
  // 'this' is the current document that is being saved
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
});

const userModel = mongoose.model('user', userSchema);

export default userModel;