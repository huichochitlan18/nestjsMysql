import { forwardRef, Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario, UsuarioInformacionPersonal,UsuarioPerfil } from './entities';
import { UsuarioInformacionMedica } from './entities/usuario-informacion-medica';
import { UsuarioInformacionContactoEmergencia } from './entities/usuario-informacion-contacto-emergencia';
import { UsuarioInformacionContacto } from './entities/usuario-informacion-contacto';
import { UsuarioPlanInscripcion } from './entities/usuario-plan-inscripcion';
import { UsuarioPlanHorario } from './entities/usuario-plan-horario';
import { AuthModule } from '../../auth/auth.module';


@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  imports: [
    forwardRef(()=>AuthModule),
    TypeOrmModule.forFeature([
      Usuario,
      UsuarioPerfil,
      UsuarioInformacionPersonal,
      UsuarioInformacionMedica,
      UsuarioInformacionContactoEmergencia,
      UsuarioInformacionContacto,
      UsuarioPlanInscripcion,
      UsuarioPlanHorario
    ]),
    AuthModule
  ],
  exports:[TypeOrmModule]
})
export class UsuariosModule {}
