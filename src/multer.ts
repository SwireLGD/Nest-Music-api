import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const artistImages = diskStorage({
  destination: './public/images/artists/',
  filename: (req, file, callback) => {
    const imageId = randomUUID();
    const extension = extname(file.originalname);
    callback(null, `${file.fieldname}-${imageId}${extension}`);
  },
});

export const albumImages = diskStorage({
  destination: './public/images/albums/',
  filename: (req, file, callback) => {
    const imageId = randomUUID();
    const extension = extname(file.originalname);
    callback(null, `${file.fieldname}-${imageId}${extension}`);
  },
});
