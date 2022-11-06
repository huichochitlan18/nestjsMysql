import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioInformacionPersonal } from '.';

@Entity()
export class Usuario {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    unique: true,
  })
  correo: string;

  @Column('varchar', {
    // select: false,    
    nullable:true
  })
  contrasena?: string;

  @Column('varchar', {
    // nullable:true,
    // unique:true
  })
  nombre: string;

  @Column('varchar', {
    // unique:true
  })
  apellidoPaterno: string;

  @Column('varchar', {
    // unique:true
  })
  apellidoMaterno: string;

  @Column('boolean', {
    default: true,
  })
  isActive?: boolean;

  @Column('varchar', {
    // array: true,
    default: 'alumno',
  })
  rol?: string;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    // unique:true
  
  })
  fechaRegistro?: Date;

//   @OneToOne(
//     () => UsuarioInformacionPersonal,
//     (usuarioInformacionPersonal)=>usuarioInformacionPersonal.usuario,
//     // { cascade: true },
//   )
//   //@JoinColumn()
//   informacionPersonal?: UsuarioInformacionPersonal;
}
