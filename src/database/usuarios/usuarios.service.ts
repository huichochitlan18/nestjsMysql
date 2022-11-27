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
import * as fs from 'fs';
import createReport from 'docx-templates';
import { join } from 'path';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { UsuarioPagoDto } from './dto/usuario-pago.dto';
import { UsuarioPagos } from './entities/usuario-pagos';
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
    @InjectRepository(UsuarioPagos)
    private usuarioPagosRepository: Repository<UsuarioPagos>,
    private readonly jwtService: JwtService,
  ) { }

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
      return {
        ...nuevoUsuario,
        token: this.getJwtToken({ id: nuevoUsuario.id }),
      };
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

  async findOne(id: string) {
    const usuario = await this.usuarioPerfilRepository.findOneBy({
      usuario: {
        id: id,
      },
    });
    return usuario;
  }

  agregarPago(usuarioPagoDto: UsuarioPagoDto) {

    const nuevoPago = this.usuarioPagosRepository.create(usuarioPagoDto);
    this.usuarioPagosRepository.save(nuevoPago);
    return nuevoPago;

  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }

  async descargarFormato(id: string) {
    const perfil = await this.usuarioPerfilRepository.findOneBy({
      usuario: {
        id: id,
      },
    });
    // console.log(perfil);
    // return perfil;

    let fechaNacimientoArray = perfil.informacionPersonal.fechaNacimiento
      .toString()
      .split('-');

    const hoy = new Date();
    let fechaNacimiento = new Date(
      Number(fechaNacimientoArray[0]),
      Number(fechaNacimientoArray[1]) - 1,
      Number(fechaNacimientoArray[2]),
    );

    let diff = hoy.getTime() - fechaNacimiento.getTime();

    // const edad = new Date(
    //   perfil.informacionPersonal.fechaNacimiento.getUTCFullYear(),
    //   perfil.informacionPersonal.fechaNacimiento.getMonth(),
    //   perfil.informacionPersonal.fechaNacimiento.getDate(),
    // );

    const template = await fs.readFileSync(
      join(join(__dirname, '../..', 'static/plantilla.docx')),
    );

    const buffer = await createReport({
      template,
      data: {
        usuario: {
          correo: perfil.usuario.correo,
          nombre: perfil.usuario.nombre,
          apellidoPaterno: perfil.usuario.apellidoPaterno,
          apellidoMaterno: perfil.usuario.apellidoMaterno,
          fechaRegistro: perfil.usuario.fechaRegistro
            .toLocaleString()
            .split(' ')[0],
        },
        informacionPersonal: {
          folio: perfil.informacionPersonal.folio,
          fechaNacimiento: perfil.informacionPersonal.fechaNacimiento,
          sexo: perfil.informacionPersonal.sexo,
          curp: perfil.informacionPersonal.curp,
          edad: Math.floor(diff / (1000 * 60 * 60 * 24 * 365)),
        },
        informacionMedica: {
          alergias: perfil.informacionMedica.alergias,
          padecimientos: perfil.informacionMedica.padecimientos,
          estatura: perfil.informacionMedica.estatura,
          peso: perfil.informacionMedica.peso,
          tipoSangre: perfil.informacionMedica.tipoSangre,
          afiliacionMedica:
            perfil.informacionMedica.afiliacionMedica.afiliacionMedica,
        },
        informacionContacto: {
          numeroCelular: perfil.informacionContacto.numeroCelular,
          numeroCasa: perfil.informacionContacto.numeroCasa,
          cp: perfil.informacionContacto.cp,
          estado: perfil.informacionContacto.estado,
          municipio: perfil.informacionContacto.municipio,
          colonia: perfil.informacionContacto.colonia,
          calle: perfil.informacionContacto.calle,
          numero: perfil.informacionContacto.numero,
        },
        informacionContactoEmergencia: {
          nombre: perfil.informacionContactoEmergencia[0].nombre,
          apellidoPaterno:
            perfil.informacionContactoEmergencia[0].apellidoPaterno,
          apellidoMaterno:
            perfil.informacionContactoEmergencia[0].apellidoMaterno,
          parentesco: perfil.informacionContactoEmergencia[0].parentesco,
          numeroCelular: perfil.informacionContactoEmergencia[0].numeroCelular,
          numeroCasa: perfil.informacionContactoEmergencia[0].numeroCasa,
          correo: perfil.informacionContactoEmergencia[0].correo,
        },
        horario: {
          plan: perfil.inscripcion[0].plan.plan,
          precio: perfil.inscripcion[0].plan.precio,
          disciplina: perfil.inscripcion[0].plan.disciplina.disciplina,
          horario: `${perfil.inscripcion[0].inicio.toString()}-${perfil.inscripcion[0].fin.toString()}`,
          lunes:
            perfil.inscripcion.filter((x) => x.dia == 1).length > 0 ? 'x' : '',
          martes:
            perfil.inscripcion.filter((x) => x.dia == 2).length > 0 ? 'x' : '',
          miercoles:
            perfil.inscripcion.filter((x) => x.dia == 3).length > 0 ? 'x' : '',
          jueves:
            perfil.inscripcion.filter((x) => x.dia == 4).length > 0 ? 'x' : '',
          viernes:
            perfil.inscripcion.filter((x) => x.dia == 5).length > 0 ? 'x' : '',
          sabado:
            perfil.inscripcion.filter((x) => x.dia == 6).length > 0 ? 'x' : '',
          domingo:
            perfil.inscripcion.filter((x) => x.dia == 7).length > 0 ? 'x' : '',
        },
      },
      cmdDelimiter: ['{{', '}}'],
    });
    // fs.writeFileSync(join(process.cwd(), '/src/static/plantilla.docx'));
    fs.writeFileSync(join(__dirname, '../..', 'static/report.docx'), buffer);
    // const asdf = Date.now() - new Date(perfil.informacionPersonal.fechaNacimiento.);
    console.log(Math.floor(diff / (1000 * 60 * 60 * 24 * 365)));
    // console.log(typeof new Date());
    
    return { perfil, test: hoy.getTime() };
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
