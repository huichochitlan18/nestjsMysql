import { PartialType } from '@nestjs/mapped-types';
import { AgregarUsuarioDto } from './agregar-usuario.dto';

export class UpdateUsuarioDto extends PartialType(AgregarUsuarioDto) {}
