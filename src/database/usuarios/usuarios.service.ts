import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { AgregarUsuarioDto } from './dto/agregar-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioAgregarContactoEmergenciaDto } from './dto/usuario-agregar-contacto-emergencia.dto';
import {
  Usuario,
  UsuarioInformacionPersonal,
  UsuarioPerfil,
  UsuarioInformacionMedica,
  UsuarioInformacionContacto,
  UsuarioInformacionContactoEmergencia,
  UsuarioPlanInscripcion,
} from './entities';

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
  ) {}

  async create(agregarUsuarioDto: AgregarUsuarioDto) {
    // return agregarUsuarioDto;

    let inscripciones: UsuarioPlanInscripcion[] = [];

    try {
      const {
        horario = [],
        informacionContactoEmergencia = [],
        informacionContacto = {},
        informacionMedica = {},
        informacionPersonal = {},
        usuario = {},
        ...a
      } = agregarUsuarioDto;

      const nuevoUsuario = this.usuarioPerfilRepository.create({
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
        inscripcion: this.usuarioPlanInscripcionRepository.create(horario)
      });

      await this.usuarioPerfilRepository.save(nuevoUsuario);
      
      // console.log(agregarUsuarioDto.informacionPersonal.fechaNacimiento.toString().split('T')[0] );

      return nuevoUsuario;
    } catch (error) {
      this.handleDBExceptions(error);
    }
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

  private handleDBExceptions(error: any) {
    console.log(error);

    if (error.sqlState === '23000') {
      throw new BadRequestException(error.sqlMessage);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('aiudaaa');
  }
}
