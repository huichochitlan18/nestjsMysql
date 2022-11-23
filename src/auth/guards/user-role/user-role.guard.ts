import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../../database/usuarios/entities/usuario';
import { META_ROLES } from '../../decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    // si solo se pone Auth() no necesita autenticacion, 
    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    // console.log(validRoles);

    const req = context.switchToHttp().getRequest();
    const user = req.user as Usuario;

    if (!user) throw new BadRequestException('datos de usuario incorrectos');

    if (validRoles.includes(user.rol)) return true;

    throw new ForbiddenException(
      `User ${user.nombre} need a valid role: [${validRoles}]`,
    );

    // console.log({ userRole: user.rol });
    // return true;
  }
}
