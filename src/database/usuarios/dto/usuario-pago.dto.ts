import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UsuarioPerfil } from '../entities';

export class UsuarioPagoDto {

  @IsString()
  @MinLength(5)
  referencia: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  monto: number;

  @IsString()
  @MinLength(1)
  cuentaDestino: string;
  @IsString()
  @MinLength(5)
  formaPago: string;

  @IsString()
  @MinLength(5)
  conceptoPago: string;

  @IsString()
  @MinLength(5)
  observaciones: string;

  @IsString()
  @MinLength(5)
  fechaPago: Date;

  @IsOptional()
  fechaRegistro?: Date;

  @IsOptional()
  @Type((type) => UsuarioPerfil)
  usuarioPerfil: UsuarioPerfil;
  // @IsString()
  // @MinLength(5)
  // correo: string;

  // @IsString()
  // @MinLength(5)
  // @IsOptional()
  // contrasena?: string;

  // @IsString()
  // @MinLength(1)
  // nombre: string;

  // @IsString()
  // @MinLength(1)
  // apellidoPaterno: string;

  // @IsString()
  // @MinLength(1)
  // apellidoMaterno: string;

  // @IsOptional()
  // isActive?: boolean;

  // @IsOptional()
  // rol?: string;

  // @IsOptional()
  // fechaRegistro?: Date;
}
