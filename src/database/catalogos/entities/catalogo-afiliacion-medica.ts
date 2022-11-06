import { IsString, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CatalogoAfiliacionMedica {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', {
    nullable: true,
    // default:""
  })
  afiliacionMedica: string;
}
