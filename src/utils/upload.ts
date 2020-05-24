import multer from 'multer';
import { mkdirSync, existsSync } from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    file.path;
    const { folder } = req.query;
    const dir = `./src/uploads/${folder}`;
    if (!existsSync(dir)) mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    req.query;
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });

export const fileUpload = upload.fields([
  { name: 'card', maxCount: 1 },
  { name: 'images' },
]);
