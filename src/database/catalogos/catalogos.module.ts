import { Module } from '@nestjs/common';
import { CatalogosService } from './catalogos.service';
import { CatalogosController } from './catalogos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogoAfiliacionMedica } from './entities/catalogo-afiliacion-medica';
import { CatalogoDisciplina } from './entities/catalogo-disciplina';
import { CatalogoDisciplinaPlanes } from './entities/catalogo-disciplina-planes';

@Module({
  controllers: [CatalogosController],
  providers: [CatalogosService],
  imports: [
    TypeOrmModule.forFeature([
      CatalogoAfiliacionMedica,
      CatalogoDisciplina,
      CatalogoDisciplinaPlanes,
    ]),
  ],
})
export class CatalogosModule {}
