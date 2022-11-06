import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  isString,
  IsString,
  MinLength,
} from 'class-validator';

export class UsuarioInformacionMedicaDto {
  @IsString()
  @MinLength(5)
  @IsOptional()
  alergias: string;

  @IsString()
  @MinLength(1)
  padecimientos: string;

  @IsNumber()
  @IsPositive()
  estatura: number;

  @IsNumber()
  @IsPositive()
  peso: number;

  @IsString()
  @IsIn(['Tipo A', 'Tipo B', 'Tipo AB', 'Tipo O'])
  tipoSangre: string;

  @IsNumber()
  // @MinLength(5)
  @Type((type) => Number)
  afiliacionMedica: number;
}
