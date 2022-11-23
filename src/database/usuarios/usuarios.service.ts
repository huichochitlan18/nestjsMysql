import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { AgregarUsuarioAlumnoDto } from './dto/agregar-usuario-alumno.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioAgregarContactoEmergenciaDto } from './dto/usuario-agregar-contacto-emergencia.dto';
import { UsuarioDto } from './dto/usuario.dto';
import {
  Usuario,
  UsuarioInformacionPersonal,
  UsuarioPerfil,
  UsuarioInformacionMedica,
  UsuarioInformacionContacto,
  UsuarioInformacionContactoEmergencia,
  UsuarioPlanInscripcion,
} from './entities';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
@Injectable()
export class UsuariosService {
  private readonly logger = new Logger('UsuariosService');

  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(UsuarioPerfil)
    private usuarioPerfilRepository: Repository<UsuarioPerfil>,
    @InjectRepository(UsuarioInformacionPersonal)
    private usuarioInformacionPersonalRepository: Repository<UsuarioInformacionPersonal>,
    @InjectRepository(UsuarioInformacionMedica)
    private usuarioInformacionMedicaRepository: Repository<UsuarioInformacionMedica>,
    @InjectRepository(UsuarioInformacionContacto)
    private usuarioInformacionContactoRepository: Repository<UsuarioInformacionContacto>,
    @InjectRepository(UsuarioInformacionContactoEmergencia)
    private usuarioInformacionContactoEmergenciaRepository: Repository<UsuarioInformacionContactoEmergencia>,
    @InjectRepository(UsuarioPlanInscripcion)
    private usuarioPlanInscripcionRepository: Repository<UsuarioPlanInscripcion>,
    private readonly jwtService:JwtService

  ) {}

  async agrearAlumno(agregarUsuarioAlumnoDto: AgregarUsuarioAlumnoDto) {
    // return agregarUsuarioDto;

    try {
      const {
        horario = [],
        informacionContactoEmergencia = [],
        informacionContacto = {},
        informacionMedica = {},
        informacionPersonal = {},
        usuario = {},
        ...a
      } = agregarUsuarioAlumnoDto;

      const nuevoAlumno = this.usuarioPerfilRepository.create({
        usuario: this.usuarioRepository.create(usuario),
        informacionPersonal:
          this.usuarioInformacionPersonalRepository.create(informacionPersonal),
        informacionMedica:
          this.usuarioInformacionMedicaRepository.create(informacionMedica),
        informacionContacto:
          this.usuarioInformacionContactoRepository.create(informacionContacto),
        informacionContactoEmergencia:
          this.usuarioInformacionContactoEmergenciaRepository.create(
            informacionContactoEmergencia,
          ),
        inscripcion: this.usuarioPlanInscripcionRepository.create(horario),
      });

      await this.usuarioPerfilRepository.save(nuevoAlumno);

      // console.log(agregarUsuarioDto.informacionPersonal.fechaNacimiento.toString().split('T')[0] );
      return nuevoAlumno;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async agregar(usuarioDto: UsuarioDto) {
    const { contrasena, ...usuarioDatos } = usuarioDto;

    try {
      const nuevoUsuario = this.usuarioRepository.create({
        ...usuarioDatos,
        contrasena: bcrypt.hashSync(contrasena, 10),
      });
      await this.usuarioRepository.save(nuevoUsuario);
      delete nuevoUsuario.contrasena;
      return { ...nuevoUsuario, token: this.getJwtToken({ id: nuevoUsuario.id }) };
    } catch (error) {
      this.handleDBExceptions(error);
    }
    // return usuarioDto;
  }

  
  async agregarContactoEmergencia(
    usuarioAgregarContactoEmergenciaDto: UsuarioAgregarContactoEmergenciaDto,
  ) {
    let usuario: UsuarioPerfil;

    const q = '4427ac99-0a09-4da2-ba83-cd51d2850669';

    const queryBuilder = this.usuarioPerfilRepository.createQueryBuilder();

    usuario = await queryBuilder
      .where('usuarioId = :usuario', {
        usuario: q,
      })
      .getOne();

    const nuevo = this.usuarioInformacionContactoEmergenciaRepository.create({
      ...usuarioAgregarContactoEmergenciaDto,
      perfil: usuario,
    });

    await this.usuarioInformacionContactoEmergenciaRepository.save(nuevo);

    return nuevo;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const usuarios = await this.usuarioPerfilRepository.find();
    return usuarios;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
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
