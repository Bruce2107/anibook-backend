import { Request, Response } from 'express';
import path from 'path';
import { existsSync } from 'fs';

const getImage = (request: Request, response: Response) => {
  try {
    const { folder, name } = request.params;
    const options = {
      root: path.join('./src', 'uploads', folder),
    };
    return existsSync(`${options.root}/${name}`)
      ? response.sendFile(name, options)
      : response.sendStatus(404);
  } catch (error) {
    return response.status(400).json({ error });
  }
};

export default getImage;
