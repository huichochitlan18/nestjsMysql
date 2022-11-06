import { IsOptional, ValidateNested,IsNumber,IsDateString,MinLength,IsIn,IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { CatalogoDisciplinaPlanDto } from 'src/database/catalogos/dto/catalogo-disciplina-plan.dto';
export class UsuarioPlanInscripcionDto {

  @IsOptional()
  @ValidateNested()
  @Type((type) => CatalogoDisciplinaPlanDto)
  plan: CatalogoDisciplinaPlanDto;
   
}
