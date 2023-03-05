import { CRUD } from '../../common/interfaces/crud.interface';
import UsersDao from '../daos/users.dao';
import { CreateUserDto } from '../dtos/create.user.dto';
import { PutUserDto } from '../dtos/put.user.dto';

class UsersService implements CRUD {
  async list(limit: number, page: number) {
    return UsersDao.getUsers();
  }
  async create(resource: CreateUserDto) {
    return UsersDao.addUser(resource);
  }
  async putById(id: string, resource: PutUserDto) {
    return UsersDao.putUserById(id, resource);
  }
  async readById(id: string) {
    return UsersDao.getUserById(id);
  }
  async deleteById(id: string) {
    return UsersDao.removeUserById(id);
  }
  async patchById(id: string, resource: Partial<PutUserDto>) {
    return UsersDao.patchUserById(id, resource);
  }
}

export default new UsersService();
