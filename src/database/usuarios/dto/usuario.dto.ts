import {
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UsuarioDto {
  @IsString()
  @MinLength(5)
  correo: string;

  @IsString()
  @MinLength(5)
  @IsOptional()
  contrasena?: string;

  @IsString()
  @MinLength(1)
  nombre: string;

  @IsString()
  @MinLength(1)
  apellidoPaterno: string;

  @IsString()
  @MinLength(1)
  apellidoMaterno: string;

  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  rol?: string;

  @IsOptional()
  fechaRegistro?: Date;
  @IsString()
  @IsOptional()
  // @MinLength(1)
  imgPerfil?: string;
}
