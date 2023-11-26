import { Injectable, BadRequestException } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FilesService {
    getProfileImage(imageName: string) {
        const path = join(__dirname, '../static/imagen-perfil', imageName);
        if (!existsSync(path)){
            throw new BadRequestException('no image')
        }
        return path
    }

}
