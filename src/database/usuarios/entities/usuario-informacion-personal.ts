import {
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
    unique: true,
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
    unique: true,
  })
  curp: string;

//   @OneToOne(() => Usuario, 
// //   (usuario) => usuario.informacionPersonal, 
//   {
//     eager: true,
//   })
//   @JoinColumn()
//   usuario: Usuario;
}
