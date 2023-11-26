import {
  ChildEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UsuarioInformacionContacto {
  
  @PrimaryGeneratedColumn()
  id: number;

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
    // default:"ninguna"
    // nullable: true,
  })
  cp: string;

  @Column('varchar', {
    // nullable:true
    // nullable: true,
  })
  estado: string;

  @Column('varchar', {
    //   nullable:true
    // nullable: true,
  })
  municipio: string;

  @Column('varchar', {
    // nullable:true
    // nullable: true,
  })
  colonia: string;

  @Column('varchar', {
    // nullable: true,
    // nullable:true
  })
  calle: string;

  @Column('varchar', {
    // nullable:true
    default: 'SN',
  })
  numero: string;
  
}
