import db from './db'
import {Schema} from "mongoose";

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true
  },
  pwd: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  }
});
const User = db.model('User', userSchema, 'user');
export default User
