import { IsString, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CatalogoDisciplina {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', {
    nullable: true,
    // default:""
  })
  disciplina: string;
  // @PrimaryGeneratedColumn('increment')
  // id: number;

  // @Column('varchar',{
  //     // unique:true
  //     // default:"ninguna"
  // })
  // disciplina:string;

  // @OneToMany(
  //     () => CatalogoPlanes,
  //     ( catalogoPlanes ) => catalogoPlanes.disciplina,
  //     {  onDelete: 'CASCADE' }
  // )
  // plan: CatalogoPlanes

}
