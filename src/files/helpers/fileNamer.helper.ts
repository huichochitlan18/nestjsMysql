import { v4 as uuid } from 'uuid'
export const fileNamer = (request: Express.Request, file: Express.Multer.File, callback: Function) => {
    console.log({ file });
    if (!file) return callback(new Error('archivo vacio'), false);
    const fileExtension = file.mimetype.split('/')[1];
    const fileName = `${uuid()}.${fileExtension}`;
    callback(null, fileName);
}