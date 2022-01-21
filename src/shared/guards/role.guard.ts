import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/modules/user/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private reflector: Reflector,
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

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.matchRoles(user.id, requiredRoles);
  }

  private async matchRoles(id: number, roles: string[]) {
    const user = await this.userRepository.findOne(
      { id },
      { relations: ['roles'] },
    );

    const userHasRole = user.roles.some((role) => roles.includes(role.name));

    if (!userHasRole) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
