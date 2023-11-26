import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsuarioInformacionPersonal } from '.';
import { UsuarioPerfil } from './usuario-perfil';

@Entity()
export class UsuarioRegistroEntradasSalidas {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column('varchar', {
    // nullable:true,
    // unique:true
  })
  tipo: string;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    // unique:true
  })
  fecha?: Date;


  @ManyToOne(
    () => UsuarioPerfil,
    {
    }
  )
  @JoinColumn()
  usuarioPerfil?: UsuarioPerfil;
}
