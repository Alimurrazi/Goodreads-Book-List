import { CreateUserDto } from '../../users/dtos/create.user.dto';
import { PatchUserDto } from '../../users/dtos/patch.user.dto';
import { PutUserDto } from '../../users/dtos/put.user.dto';

export interface CRUD {
  list: (limit: number, page: number) => Promise<CreateUserDto[]>;
  create: (resource: CreateUserDto) => Promise<string>;
  putById: (id: string, resource: PutUserDto) => Promise<string>;
  readById: (id: string) => Promise<CreateUserDto | undefined>;
  deleteById: (id: string) => Promise<string>;
  patchById: (id: string, resource: PatchUserDto) => Promise<string>;
}
