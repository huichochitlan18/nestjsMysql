import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioLoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Usuario } from '../database/usuarios/entities/usuario';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('UsuariosService');
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) // private readonly usuario:UsuariosService
  {}

  async login(usuarioLoginDto: UsuarioLoginDto) {
    const { contrasena, correo } = usuarioLoginDto;

    const usuario = await this.usuarioRepository.findOne({
      where: { correo },
      select: { contrasena: true, correo: true, id:true, nombre:true,apellidoPaterno:true,apellidoMaterno:true,rol:true },
    });

    if (!usuario) {
      throw new UnauthorizedException('Datos incorrectos');
    }

    if (!bcrypt.compareSync(contrasena, usuario.contrasena)) {
      throw new UnauthorizedException('Datos incorrectos');
    }

    return { ...usuario, token: this.getJwtToken({ id: usuario.id }) };

  }

  async checkAuthStatus(usuario:Usuario){
    return { ...usuario, token: this.getJwtToken({ id: usuario.id }) };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBExceptions(error: any) {
    console.log(error);

    if (error.sqlState === '23000') {
      throw new BadRequestException(error.sqlMessage);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('aiudaaa');
  }
}
