import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './database/usuarios/usuarios.module';
import { CatalogosModule } from './database/catalogos/catalogos.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      // logging:true,
      // migrationsRun: false
    }),
    UsuariosModule,
    CatalogosModule,
    AuthModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
