import { IsString } from 'class-validator';

export class UsuarioInformacionContactoEmergenciaDto {
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
