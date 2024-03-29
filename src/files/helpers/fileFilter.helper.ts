
export const fileFilter = (request: Express.Request, file: Express.Multer.File, callback: Function) => {
    console.log({ file });
    if (!file) return callback(new Error('archivo vacio'), false);
    const fileExtension = file.mimetype.split('/')[1];
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    if (validExtensions.includes(fileExtension)) {
        return callback(null, true);
    }
    callback(null, false);
}