import ICreateRoleDTO from '../../dtos/ICreateRoleDTO';
import Role from '../../entities/Role';

export class FakeRoleRepository {
  private Roles: Role[] = [];

  public async findSomething(date: object) {
    const keys = Object.keys(date);
    const values = Object.values(date);

    const findById = this.Roles.find((role) => role[keys[0]] == values[0]);

    return findById;
  }

  public async save(role: Role): Promise<Role> {
    const FindIndex = this.Roles.findIndex(
      (findRole) => findRole.id === role.id,
    );

    this.Roles[FindIndex] = role;

    return role;
  }

  public async merge(role: Role, ...data: any) {
    const FindIndex = this.Roles.findIndex(
      (findRole) => findRole.id === role.id,
    );

    role.name = data[0].name;
    role.description = data[0].description;

    this.Roles[FindIndex] = role;

    return role;
  }

  public async create({
    name,
    description,
  }: ICreateRoleDTO): Promise<Role | undefined> {
    const role = new Role({
      id: this.Roles.length + 1,
      name,
      description,
    });

    this.Roles.push(role);

    return role;
  }

  public async find(): Promise<Role[] | undefined> {
    return this.Roles;
  }

  public async delete(id: number): Promise<void> {
    const findIndex = this.Roles.findIndex((role) => role.id === id);
    this.Roles.splice(findIndex, 1);
  }

  public async findByNames(names: string[]): Promise<Role[]> {
    const roles = names.map((name) =>
      this.Roles.find((role) => role.name === name),
    );

    return roles;
  }
}
