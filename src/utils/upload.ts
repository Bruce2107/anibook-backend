import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const {
      dados: { folder },
    } = req.body;
    cb(null, `uploads/${folder}`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
