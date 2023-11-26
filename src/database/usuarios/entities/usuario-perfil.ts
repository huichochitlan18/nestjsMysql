import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario, UsuarioInformacionPersonal } from '.';
import { UsuarioInformacionContacto } from './usuario-informacion-contacto';
import { UsuarioInformacionContactoEmergencia } from './usuario-informacion-contacto-emergencia';
import { UsuarioInformacionMedica } from './usuario-informacion-medica';
import { UsuarioPlanInscripcion } from './usuario-plan-inscripcion';
import { UsuarioPagos } from './usuario-pagos';
import { UsuarioRegistroEntradasSalidas } from './usuario-registro-entradas-salidas';

@Entity()
export class UsuarioPerfil {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(
    () => Usuario,
    //   (usuario) => usuario.informacionPersonal,
    {
      cascade: true,
      eager: true,
      // onUpdate:'CASCADE',
      // eager: true,
    },
  )
  @JoinColumn()
  usuario: Usuario;

  @OneToOne(
    () => UsuarioInformacionPersonal,
    //   (usuario) => usuario.informacionPersonal,
    {
      cascade: true,
      eager: true,
    },
  )
  @JoinColumn()
  informacionPersonal: UsuarioInformacionPersonal;

  
  @OneToOne(
    () => UsuarioInformacionMedica,
    //   (usuario) => usuario.informacionMedica,
    {
      cascade: true,
      eager: true,
    },
  )
  @JoinColumn()
  informacionMedica: UsuarioInformacionMedica;

  @OneToOne(
    () => UsuarioInformacionContacto,
    //   (usuario) => usuario.informacionMedica,
    {
      cascade: true,
      eager: true,
    },
  )
  @JoinColumn()
  informacionContacto: UsuarioInformacionContacto;

  @OneToMany(
    () => UsuarioInformacionContactoEmergencia,
    (usuarioInformacionContactoEmergencia)=>usuarioInformacionContactoEmergencia.perfil,
    {
      // cascade:['insert', 'update'],  
      cascade: true,
      eager: true
    },
  )
  // @JoinColumn()
  informacionContactoEmergencia?: UsuarioInformacionContactoEmergencia[];

  @OneToMany(
    () => UsuarioPlanInscripcion,
    (usuarioPlanInscripcion)=>usuarioPlanInscripcion.usuarioPerfil,
    {
      // cascade:['insert', 'update'],  
      cascade: true,
      eager: true
    },
  )
  // @JoinColumn()
  inscripcion?: UsuarioPlanInscripcion[];

  @OneToMany(
    () => UsuarioPagos,
    (usuarioPagos)=>usuarioPagos.usuarioPerfil,
    {
      // cascade:['insert', 'update'],  
      cascade: true,
      eager: true
    },
  )
  // @JoinColumn()
  pagos?: UsuarioPagos[];
  
  @OneToMany(
    () => UsuarioRegistroEntradasSalidas,
    (usuarioRegistroEntradasSalidas)=>usuarioRegistroEntradasSalidas.usuarioPerfil,
    {
      // cascade:['insert', 'update'],  
      cascade: true,
      eager: true
    },
  )
  // @JoinColumn()
  reigstroEntradasSalidas?: UsuarioRegistroEntradasSalidas[];

}
