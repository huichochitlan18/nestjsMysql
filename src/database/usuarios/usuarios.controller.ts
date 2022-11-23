import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { AgregarUsuarioAlumnoDto } from './dto/agregar-usuario-alumno.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UsuarioAgregarContactoEmergenciaDto } from './dto/usuario-agregar-contacto-emergencia.dto';
import { UsuarioDto } from './dto/usuario.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('registrar-alumno')
  @ApiResponse({status:201})
  agregarAlumno(@Body() agregarUsuarioAlumnoDto: AgregarUsuarioAlumnoDto) {
    // return agregarUsuarioDto;
    return this.usuariosService.agrearAlumno(agregarUsuarioAlumnoDto);
  }

  @Post('registrar')
  agregar(@Body() usuarioDto: UsuarioDto) {
    // return agregarUsuarioDto;
    return this.usuariosService.agregar(usuarioDto);
  }

  @Post('/test')
  agregarContactoEmergencia(
    @Body()
    usuarioAgregarContactoEmergenciaDto: UsuarioAgregarContactoEmergenciaDto,
  ) {
    return this.usuariosService.agregarContactoEmergencia(
      usuarioAgregarContactoEmergenciaDto,
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usuariosService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
