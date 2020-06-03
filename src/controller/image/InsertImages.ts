import { Request, Response } from 'express';
import saveImage from '../../utils/SaveImageOnDatabase';

const insertImages = async (request: Request, response: Response) => {
  try {
    const queryFolder = request.query.folder as string;
    const files = request.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    if (!files) return response.sendStatus(422);

    const folder = queryFolder ? queryFolder : 'background';

    return (await saveImage(folder, undefined, files['images']))
      ? response.sendStatus(201)
      : response.sendStatus(400);
  } catch (error) {
    return response.status(400).send({error: error.stack});
  }
};

export default insertImages;
