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
export class UsuarioPagos {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column('varchar', {
    nullable:true
    // unique: true,
  })
  referencia: string;

  @Column('decimal', {
    //   nullable:true,
    precision: 10,
    scale: 2,
  })
  monto: number;

  @Column('varchar', {
    // nullable:true,
    // unique:true
  })
  cuentaDestino: string;

  @Column('varchar', {
    // unique:true
  })
  formaPago: string;

  @Column('varchar', {
    // unique:true
  })
  conceptoPago: string;

  @Column('varchar', {
    // default: true,
  })
  observaciones?: string;

  @Column('date', {
    // unique:true
    // nullable:true
  })
  fechaPago: Date;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    // unique:true
  })
  fechaRegistro?: Date;

  @ManyToOne(() => UsuarioPerfil, (usuarioPerfil) => usuarioPerfil.pagos, {
    // cascade: true,
    // eager: true,
  })
  @JoinColumn()
  usuarioPerfil?: UsuarioPerfil;
}
