import multer from 'multer';
import { mkdirSync, existsSync } from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const {folder} = req.query;
    const dir = `./src/uploads/${folder}`
    if(!existsSync(dir))
      mkdirSync(dir)
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
