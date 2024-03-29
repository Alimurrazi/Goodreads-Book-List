import mongoose, { Schema } from 'mongoose';
import { CreateUserDto } from '../dtos/create.user.dto';

const userSchema = new Schema(
  {
    _id: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    permissionLevel: Number,
  },
  { id: false },
);

export default mongoose.model<CreateUserDto>('User', userSchema);
