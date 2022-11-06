import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { UsuarioPerfil } from '../entities';

export class UsuarioAgregarContactoEmergenciaDto {
  @IsString()
  nombre: string;

  @IsString()
  apellidoPaterno: string;

  @IsString()
  apellidoMaterno: string;

  @IsString()
  parentesco: string;

  @IsString()
  numeroCelular: string;

  @IsString()
  numeroCasa: string;

  @IsString()
  correo: string;
}
