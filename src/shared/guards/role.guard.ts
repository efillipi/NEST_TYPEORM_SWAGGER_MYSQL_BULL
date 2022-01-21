import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRepositoryService } from 'src/modules/user/repositories/UserRepository';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UserRepositoryService,
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // if (!user) {
    //   throw new UnauthorizedException();
    // }

    return this.matchRoles(user.id, requiredRoles);
  }

  private async matchRoles(id: number, roles: string[]) {
    const user = await this.usersService.findSomething({ id });

    const userHasRole = user.roles.some((role) => roles.includes(role.name));

    if (!userHasRole) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
