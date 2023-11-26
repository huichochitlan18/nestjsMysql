import { BeforeInsert, BeforeUpdate, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioInformacionPersonal } from '.';

@Entity()
export class Usuario {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    // unique: true,
  })
  correo: string;

  @Column('varchar', {
    select: false,
    nullable: true
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
    // length: 1,
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

  @Column('timestamp', {
    nullable:true,
    // unique:true

  })
  fechaBaja?: Date;

  @Column('varchar', {
    nullable: true
  })
  imgPerfil?: string;

  @BeforeInsert()
  correoToLowerCaseInsert() {
    this.correo = this.correo.toLowerCase().trim();
  }
  @BeforeUpdate()
  correoToLowerCaseUpdate() {
    this.correoToLowerCaseInsert();
  }
  //   @OneToOne(
  //     () => UsuarioInformacionPersonal,
  //     (usuarioInformacionPersonal)=>usuarioInformacionPersonal.usuario,
  //     // { cascade: true },
  //   )
  //   //@JoinColumn()
  //   informacionPersonal?: UsuarioInformacionPersonal;
}
