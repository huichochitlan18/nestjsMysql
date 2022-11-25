import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  SetMetadata,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { UsuarioLoginDto } from './dto/login.dto';
import { Usuario } from '../database/usuarios/entities/usuario';
import { RawHeaders } from './decorators/raw-header.decorator';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces/valid-roles.interface';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() usuarioLoginDto: UsuarioLoginDto) {
    return this.authService.login(usuarioLoginDto);
  }

  @Get('status')
  @Auth()
  checkAuthStatus(
    @GetUser() usuario: Usuario,
  ){
    return this.authService.checkAuthStatus(usuario);

  }


  // lo siguiente solo es de prueba o para testeo
  @Get()
  @UseGuards(AuthGuard())
  testPrivateRute(
    @GetUser() usuario: Usuario,
    @GetUser('nombre') usuarioCorreo: string,
    @RawHeaders()rawHeaders:string[]
    // @Req() request:Express.Request
  ) {
    console.log({ usuario });
    return {
      ok: true,
      message: 'hola mundo private',
      user: usuario,
      correo: usuarioCorreo,
      rawHeaders
    };
  }

  @Get('test')
  // @SetMetadata('rol',['admin','alumno'])
  @RoleProtected( ValidRoles.admin,ValidRoles.alumno )
  @UseGuards(AuthGuard(), UserRoleGuard)
  testPrivateRute2(
    @GetUser() usuario: Usuario,
  ) {
    // console.log({ usuario });
    return {
      ok: true,
      message: 'hola mundo private',
      user: usuario,
    };
  }

  @Get('test2')
  // @SetMetadata('rol',['admin','alumno'])
  // @RoleProtected( ValidRoles.admin,ValidRoles.alumno )
  // @UseGuards(AuthGuard(), UserRoleGuard)
  @Auth()
  testPrivateRute3(
    @GetUser() usuario: Usuario,
    
  ) {
    // console.log({ usuario });
    return {
      ok: true,
      message: 'hola mundo private',
      user: usuario,
    };
  }
}
