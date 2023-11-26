import {
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CatalogoDisciplinaPlanDto } from 'src/database/catalogos/dto/catalogo-disciplina-plan.dto';
import { UsuarioDto } from './usuario.dto';

export class UsuarioPlanInscripcionDto {
  @IsOptional()
  @ValidateNested()
  @Type((type) => CatalogoDisciplinaPlanDto)
  plan: CatalogoDisciplinaPlanDto;

  @IsOptional()
  @ValidateNested()
  @Type((type) => UsuarioDto)
  usuario: UsuarioDto;
}
