import { IsOptional, ValidateNested,IsNumber,IsDateString,MinLength,IsIn,IsString } from 'class-validator';
import { Type } from 'class-transformer';
export class UsuarioInformacionPersonalDto {
  @IsNumber()
  // @MinLength(5)
  @Type((type) => Number)
  folio: number;

  @IsDateString()
  @MinLength(1)
  fechaNacimiento: Date;

  @IsIn(['hombre', 'mujer'])
  @MinLength(5)
  sexo: string;

  @IsString()
  @MinLength(5)
  curp: string;
}
