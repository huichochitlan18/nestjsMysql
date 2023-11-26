import {
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UsuarioPerfil } from '../entities';

export class UsuarioRegistroEntradaDto {

  @IsString()
  @IsIn(['entrada', 'salida'])
  tipo: string;

  @IsOptional()
  @Type((type) => UsuarioPerfil)
  usuarioPerfil: UsuarioPerfil;

}
