import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Usuario } from '../../database/usuarios/entities/usuario';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<Usuario> {
    const { id } = payload;
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new UnauthorizedException('token no valido');
    }
    if (!usuario.isActive) {
      throw new UnauthorizedException('usuario inactivo');
    }

    return usuario;
  }
}
