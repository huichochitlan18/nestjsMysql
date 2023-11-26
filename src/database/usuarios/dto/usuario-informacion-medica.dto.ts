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
  @Type(() => Number)
  estatura: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  peso: number;

  @IsString()
  @IsIn(['O-','O+','A−','A+','B−','B+','AB-','AB+',])
  tipoSangre: string;

  @IsNumber()
  // @MinLength(5)
  @Type((type) => Number)
  afiliacionMedica: number;
}
