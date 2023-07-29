import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email already exists'],
    index: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Username is invalid, it should contain 8-20 alphanumeric characters and no special characters and be unique!',
    ],
  },
  image: {
    type: String,
    default:
      'https://res.cloudinary.com/dk5bvgq20/image/upload/v1612968981/nextjs-mongodb-cloudinary/placeholder.jpg',
  },
});

// nextjs call models/user.js everytime we call the api
// to prevent creating the same model again and again
// we need to check if the model already exists
const User = models.User || model('User', UserSchema);

export default User;
