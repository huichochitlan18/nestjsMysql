
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsuarioPlanInscripcion } from './usuario-plan-inscripcion';


@Entity()
export class UsuarioPlanHorario {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', {
    // unique:true
    // default: 'ninguna',
  })
  dia: number;

  @Column('time', {
    // unique:true
    // default: 'ninguna',
  })
  inicio: number;

  @Column('time', {
    // unique:true
    // default: 'ninguna',
  })
  fin: number;

  @ManyToOne(
    () => UsuarioPlanInscripcion,
    (usuarioPlanInscripcion)=>usuarioPlanInscripcion.horario,
    // { cascade: true }
  )
  @JoinColumn()
  inscripcion?: UsuarioPlanInscripcion
  
  
  // @ManyToOne(
  //   () => Usuario,
  //   // (usuarioDatosMedicos)=>usuarioDatosMedicos.id,
  //   { cascade: true }
  // )
  // @JoinColumn()
  // usuario?: Usuario



}
