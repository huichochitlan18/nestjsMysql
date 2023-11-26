import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { Res, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { join } from 'path';
import { fileNamer } from './helpers/fileNamer.helper';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
  ) { }

  @Get('foto-usuario/:imageName')
  findProfileImage(
    @Res() response: Response,
    @Param('imageName') imageName: string
  ) {
    const path = this.filesService.getProfileImage(imageName);
    response.sendFile(path);
  }

  @Post('foto-usuario')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    // limits:{fileSize: 1000}
    storage: diskStorage({
      destination: join(join(__dirname, '../static/imagen-perfil')),
      filename: fileNamer
    })
  }))
  uploadProfileImage(@UploadedFile() file: Express.Multer.File) {
    // console.log(file);
    console.log(join(join(__dirname, '../static/imagen-perfil')))
    if (!file) {
      throw new BadRequestException('vacio');
    }
    // const secureUrl = `${this.configService.get('HOST_API')}/files/foto-usuario/${file.filename}`;
    // return file;
    const secureUrl = `${file.filename}`;
    return { secureUrl };
  }
}
