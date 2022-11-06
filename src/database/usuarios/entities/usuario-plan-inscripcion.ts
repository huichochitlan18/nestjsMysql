import { CatalogoDisciplinaPlanes } from 'src/database/catalogos/entities/catalogo-disciplina-planes';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from '.';
import { UsuarioPerfil } from './usuario-perfil';
import { UsuarioPlanHorario } from './usuario-plan-horario';

@Entity()
export class UsuarioPlanInscripcion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => CatalogoDisciplinaPlanes,
    // (usuarioDatosMedicos)=>usuarioDatosMedicos.id,
    {
      cascade: true,
      eager: true,
    },
  )
  @JoinColumn()
  plan?: CatalogoDisciplinaPlanes;

  @ManyToOne(
    () => UsuarioPerfil,
    // (usuarioDatosMedicos)=>usuarioDatosMedicos.id,
    // { cascade: true }
  )
  @JoinColumn()
  usuarioPerfil?: UsuarioPerfil;

  @OneToMany(
    () => UsuarioPlanHorario,
    (usuarioPlanHorario)=>usuarioPlanHorario.inscripcion,
    { 
      cascade: true,
      eager: true,
    }
  )
  // @JoinColumn()
  horario?:UsuarioPlanHorario[]
}
