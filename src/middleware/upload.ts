import multer from 'multer';
import { mkdirSync, existsSync } from 'fs';

const storage = multer.diskStorage({
  destination: function (req, _, cb) {
    const { folder } = req.query;
    const dir = `./src/uploads/${folder}`;
    if (!existsSync(dir)) mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (_, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export const fileUpload = upload.fields([
  { name: 'card', maxCount: 1 },
  { name: 'images' },
]);
