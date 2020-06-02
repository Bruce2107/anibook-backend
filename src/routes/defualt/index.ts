import { Router } from 'express';
import { fileUpload } from '../../middleware/upload';
import { x2Webp } from '../../utils/ConverteImage';

const routes = Router();

routes.post('/test/image', fileUpload, (req, res) => {
  const files = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };
  const card: Express.Multer.File = files['card'][0];
  return res.send(x2Webp(card))
});

export default routes
