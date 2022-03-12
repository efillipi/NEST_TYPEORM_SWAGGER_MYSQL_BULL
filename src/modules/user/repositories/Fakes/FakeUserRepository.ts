import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../entities/User';

export class FakeUserRepository {
  private Users = [];

  public async findSomething(date: object): Promise<User | undefined> {
    const keys = Object.keys(date);
    const values = Object.values(date);

    const findById = this.Users.find((user) => user[keys[0]] == values[0]);

    return findById;
  }

  public async save(user: User): Promise<User> {
    const FindIndex = this.Users.findIndex(
      (findUser) => findUser.id === user.id,
    );

    this.Users[FindIndex] = user;

    return user;
  }

  public async merge(user: User): Promise<User> {
    const FindIndex = this.Users.findIndex(
      (findUser) => findUser.id === user.id,
    );

    this.Users[FindIndex] = user;

    return user;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User | undefined> {
    const user = new User({
      id: this.Users.length + 1,
      name,
      email,
      password,
    });

    Object.assign(user);

    this.Users.push(user);

    return user;
  }

  public async find(): Promise<User[] | undefined> {
    return this.Users;
  }

  public async deleteFile(id: number): Promise<void> {
    const findIndex = this.Users.findIndex((userId) => userId === id);

    this.Users.splice(findIndex, 1);
  }
}
