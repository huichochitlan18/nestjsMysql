import { IsOptional,ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Usuario, UsuarioInformacionPersonal } from '../entities';
import { UsuarioDto } from './usuario.dto';
import { UsuarioInformacionPersonalDto } from './usuario-informacion-personal.dto';
import { UsuarioInformacionMedicaDto } from './usuario-informacion-medica.dto';
import { UsuarioInformacionMedica } from '../entities/usuario-informacion-medica';
import { UsuarioInformacionContactoDto } from './usuario-informacion-contacto.dto';
import { UsuarioInformacionContacto } from '../entities/usuario-informacion-contacto';
import { UsuarioInformacionContactoEmergenciaDto } from './usuario-informacion-contacto-emergencia.dto';
import { UsuarioInformacionContactoEmergencia } from '../entities/usuario-informacion-contacto-emergencia';

export class AgregarUsuarioAlumnoDto {

    @IsOptional()
    @ValidateNested()
    @Type((type) => UsuarioDto)
    usuario: Usuario;

    @IsOptional()
    @ValidateNested()
    @Type((type) => UsuarioInformacionPersonalDto)
    informacionPersonal: UsuarioInformacionPersonal;

    @IsOptional()
    @ValidateNested()
    @Type((type) => UsuarioInformacionMedicaDto)
    informacionMedica: UsuarioInformacionMedica;

    @IsOptional()
    @ValidateNested()
    @Type((type) => UsuarioInformacionContactoDto)
    informacionContacto: UsuarioInformacionContacto;

    @IsOptional()
    @ValidateNested()
    @Type((type) => UsuarioInformacionContactoEmergenciaDto)
    informacionContactoEmergencia: UsuarioInformacionContactoEmergencia[];

    @IsOptional()
    // @ValidateNested()
    // @Type((type) => UsuarioInformacionContactoEmergenciaDto)
    horario: any;
   
}
