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

export class UsuarioRegistroEntradasSalidasDto {

  @IsString()
  @MinLength(3)
  tipo: string;

  @IsOptional()
  fecha?: Date;

  @IsOptional()
  @Type((type) => UsuarioPerfil)
  usuarioPerfil: UsuarioPerfil;
 
}
