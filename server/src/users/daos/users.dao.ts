import shortid from 'shortid';
import { CreateUserDto } from '../dtos/create.user.dto';
import { PatchUserDto } from '../dtos/patch.user.dto';
import { PutUserDto } from '../dtos/put.user.dto';
class UsersDao {
  users: CreateUserDto[] = [];
  async addUser(user: CreateUserDto) {
    user.id = shortid.generate();
    this.users.push(user);
    return user.id;
  }
  async getUsers() {
    return this.users;
  }
  async getUserById(id: string) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
  putUserById(id: string, user: PutUserDto) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = user;
    return `user with ${id} updated`;
  }
  patchUserById(id: string, user: PatchUserDto) {
    const allowedProperties = ['firstName', 'lastName'];
    const index = this.users.findIndex((user) => user.id === id);
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
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
    return `user with $id removed`;
  }
  getUserByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);
    return user;
  }
}
export default new UsersDao();
