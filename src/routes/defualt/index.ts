import { Router } from 'express';

const routes = Router();

// routes.post('/test/image', fileUpload, async (req, res) => {
//   const files = req.files as {
//     [fieldname: string]: Express.Multer.File[];
//   };
//   const card: Express.Multer.File = files['card'][0];
//   console.log(card.path)
//   const im = files['images'];
//   return res.send('oi')
//   // im.forEach(async (i) => await x2Webp(i));
//   // return res.status(200).send({ code: await x2Webp(card), p: card.mimetype });
// });

export default routes;
