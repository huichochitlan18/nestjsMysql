import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from '.';

@Entity()
export class UsuarioInformacionPersonal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', {
    // length: 50,
    // unique: false,
  })
  folio: number;

  @Column('date', {
    // unique:true
    // nullable:true
  })
  fechaNacimiento: Date;

  @Column('varchar', {
    // nullable: true,
    // unique:true
    // default:''
  })
  sexo: string;

  @Column('varchar', {
    // unique: true,
  })
  curp: string;

  // @BeforeInsert()
  // soloFecha(){
  //   this.fechaNacimiento = new Date(this.fechaNacimiento.toString().split('T')[0]); // 'T' para dividir la fecha de la hora [0] la fecha esta en la posicion 0
  // }
}
