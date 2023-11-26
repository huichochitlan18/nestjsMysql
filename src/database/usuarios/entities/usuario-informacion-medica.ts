import { CatalogoAfiliacionMedica } from 'src/database/catalogos/entities/catalogo-afiliacion-medica';
import {
  ChildEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { Usuario } from './';

@Entity()
export class UsuarioInformacionMedica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    // unique:true
    default: 'ninguna',
  })
  alergias: string;

  @Column('varchar', {
    // unique:true17140200
    default: 'ninguno',
  })
  padecimientos: string;

  @Column('decimal', {
    // nullable:true,
    precision: 10,
    scale: 2,
  })
  estatura: number;

  @Column('decimal', {
    //   nullable:true,
    precision: 10,
    scale: 2,
  })
  peso: number;

  @Column('varchar', {
    // nullable: true,
  })
  tipoSangre: string;

  @ManyToOne(
    () => CatalogoAfiliacionMedica,
    // (usuario)=>usuario.id,
    {
      cascade: true,
      eager: true,
    }
  )
  @JoinColumn()
  afiliacionMedica?: CatalogoAfiliacionMedica;
}
