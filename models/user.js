import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import logger from '../utils/logger';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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

UserSchema.pre('save', async (next) => {
  // 'this' is the current document that is being saved
  try {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  } catch (e) {
    logger.error(new Error(`Could not save password for ${this.email}`))
  }
});

userSchema.methods.isValidPassword = async (password) => {
  const user = this;
  const isValid = await bcrypt.compare(password, user.password);
  return isValid;
}

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;