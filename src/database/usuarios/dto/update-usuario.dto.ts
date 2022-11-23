import { PartialType } from '@nestjs/mapped-types';
import { AgregarUsuarioAlumnoDto } from './agregar-usuario-alumno.dto';

export class UpdateUsuarioDto extends PartialType(AgregarUsuarioAlumnoDto) {}
