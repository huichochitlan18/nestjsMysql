import { forwardRef, Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario, UsuarioInformacionPersonal, UsuarioPerfil } from './entities';
import { UsuarioInformacionMedica } from './entities/usuario-informacion-medica';
import { UsuarioInformacionContactoEmergencia } from './entities/usuario-informacion-contacto-emergencia';
import { UsuarioInformacionContacto } from './entities/usuario-informacion-contacto';
import { UsuarioPlanInscripcion } from './entities/usuario-plan-inscripcion';
import { UsuarioPlanHorario } from './entities/usuario-plan-horario';
import { AuthModule } from '../../auth/auth.module';
import { UsuarioPagos } from './entities/usuario-pagos';
import { UsuarioRegistroEntradasSalidas } from './entities/usuario-registro-entradas-salidas';
// import { RegistroEntradasSalidastGateway } from 'src/common/WebSocketGateway.module';

@Module({
  controllers: [UsuariosController],
  providers: [
    UsuariosService,
    // RegistroEntradasSalidastGateway
  ],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([
      Usuario,
      UsuarioPerfil,
      UsuarioInformacionPersonal,
      UsuarioInformacionMedica,
      UsuarioInformacionContactoEmergencia,
      UsuarioInformacionContacto,
      UsuarioPlanInscripcion,
      UsuarioPlanHorario,
      UsuarioPagos,
      UsuarioRegistroEntradasSalidas
    ]),
    AuthModule,
  ],
  exports: [TypeOrmModule],
})
export class UsuariosModule {}
