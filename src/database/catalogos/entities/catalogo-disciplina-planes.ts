import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CatalogoDisciplina } from './catalogo-disciplina';

@Entity()
export class CatalogoDisciplinaPlanes {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column('varchar', {
      nullable: true,
      // default:""
    })
    plan: string;
  
    @Column('decimal', {
      //   nullable:true,
      precision: 10,
      scale: 2,
    })
    precio: number;
  
    @ManyToOne(
      () => CatalogoDisciplina,
      // (usuarioDatosMedicos)=>usuarioDatosMedicos.id,
      { 
        cascade: true,
        eager:true
      }
    )
    @JoinColumn()
    disciplina: CatalogoDisciplina
  
    // @PrimaryGeneratedColumn('increment')
    // id: number;

    // @Column('varchar',{
    //     unique:true
    //     // default:"ninguna"
    // })
    // plan:string;

    // @Column('float',{
    //     // nullable:true
    //   })
    // precio:number;
    
    // @ManyToOne(
    //     ()=>CatalogoDisciplina,
    //     (catalogoDisciplina)=> catalogoDisciplina.plan,
    //     { cascade:true }        
    // )
    
    // // @JoinColumn()
    // disciplina:number;
}
