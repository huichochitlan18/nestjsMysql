import { IsOptional, ValidateNested,IsNumber,IsDateString,MinLength,IsIn,IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
export class UsuarioInformacionPersonalDto {
  @IsNumber()
  // @MinLength(5)
  @Type((type) => Number)
  folio: number;

  @IsDate()
  @Type(() => Date)
  // @MinLength(1)
  fechaNacimiento: Date;

  @IsIn(['Masculino', 'Femenino'])
  @MinLength(5)
  sexo: string;

  @IsString()
  @MinLength(5)
  curp: string;
}
