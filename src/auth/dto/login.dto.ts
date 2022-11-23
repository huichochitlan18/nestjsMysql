import {
  IsOptional,  
  IsString,
  MinLength,
} from 'class-validator';

export class UsuarioLoginDto {
  @IsString()
  @MinLength(5)
  correo: string;

  @IsString()
  @MinLength(5)
  @IsOptional()
  contrasena: string;

}
