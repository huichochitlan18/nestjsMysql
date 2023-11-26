import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsuarioPerfil } from './usuario-perfil';

@Entity()
export class UsuarioInformacionContactoEmergencia {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', {
    // unique:true
    nullable: true,
  })
  nombre: string;

  @Column('varchar', {
    // unique:true
    nullable: true,
  })
  apellidoPaterno: string;

  @Column('varchar', {
    // unique:true
    nullable: true,
  })
  apellidoMaterno: string;

  @Column('varchar', {
    // unique:true
    // default:"ninguna"
    nullable: true,
  })
  parentesco: string;

  @Column('varchar', {
    // unique:true
    default: '-',
  })
  numeroCelular: string;

  @Column('varchar', {
    // unique:true
    default: '-',
  })
  numeroCasa: string;

  @Column('varchar', {
    // unique:true
    default: '-',
  })
  correo: string;

  @ManyToOne(
    () => UsuarioPerfil,
    (usuarioPerfil) => usuarioPerfil.informacionContactoEmergencia,
    {
      nullable:false      
    },
  )
  @JoinColumn()
  perfil: UsuarioPerfil;
}
