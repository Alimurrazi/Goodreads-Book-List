import { CreateUserDto } from '../dtos/create.user.dto';
import { PatchUserDto } from '../dtos/patch.user.dto';
import { PutUserDto } from '../dtos/put.user.dto';
import userModel from '../modles/user.model';
import shortid from 'shortid';
class UsersDao {
  users: CreateUserDto[] = [];
  async getUsers() {
    return this.users;
  }
  async getUserById(id: string) {
    const user = this.users.find((user) => user._id === id);
    return user;
  }
  async addUser(userFields: CreateUserDto) {
    const newUserModel = new userModel({
      _id: userFields._id || shortid.generate(),
      ...userFields,
    });
    await userModel.create(newUserModel);
    return `user with ${newUserModel._id} created`;
  }
  putUserById(id: string, user: PutUserDto) {
    const index = this.users.findIndex((user) => user._id === id);
    this.users[index] = user;
    return `user with ${id} updated`;
  }
  patchUserById(id: string, user: PatchUserDto) {
    const allowedProperties = ['firstName', 'lastName'];
    const index = this.users.findIndex((user) => user._id === id);
    const currentUser = this.users[index];
    allowedProperties.forEach((allowedProperty) => {
      if (allowedProperty in user) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        currentUser[allowedProperty] = user[allowedProperty];
      }
    });
    this.users[index] = currentUser;
    return `user with ${id} updated`;
  }
  removeUserById(id: string) {
    const index = this.users.findIndex((user) => user._id === id);
    this.users.splice(index, 1);
    return `user with $id removed`;
  }
  async getUserByEmail(email: string) {
    const user = await userModel.findOne({ email: email }).exec();
    if (!user) {
      return null;
    }
    return user;
  }
}
export default new UsersDao();
