import { Request, Response } from 'express';
import { Card, Dados, Data, Anime, Manga } from 'anibook';
import { IAnime_Manga } from '../../@types/anibook-backend';
import createAnimeOrManga from '../utils/CreateAnimeOrManga';
import deleteAnimeOrManga from '../utils/DeleteAnimeOrManga';
import getCardInfo from '../utils/GetCardInformationsAnimeOrMangaByName';
import getByName from '../utils/GetOneAnimeOrMangaByName';
import getRandomAnimeOrManga from '../utils/GetAllAnimesOrManga';
import getRandomCard from '../utils/GetRandomAnimeOrMangaCard';
import updateAnyField from '../utils/UpdateAnyFieldThatAreNotAFileAnimeOrManga';
import updateImages from '../utils/UpdateImageFieldAnimeOrManga';

class Anime_Manga implements IAnime_Manga {
  async create<T extends Data>(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const dados: T = JSON.parse(request.body.dados);
      const files = request.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      const table = request.path.split('/')[1];

      const status = await createAnimeOrManga(
        request.query.folder as string,
        dados,
        files,
        table
      );
      return response.sendStatus(status);
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async _delete(request: Request, response: Response): Promise<Response> {
    try {
      const { name } = request.params;

      const table = request.path.split('/')[1];

      const status = await deleteAnimeOrManga(name, table);
      return response.sendStatus(status);
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async getCardByName(
    request: Request,
    response: Response
  ): Promise<Response<Card>> {
    try {
      const { name } = request.params;

      const table = request.path.split('/')[1];

      const result = await getCardInfo<Card>(name, table);
      return response.status(result.status).json({ data: result.data });
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async getOneByName<T>(
    request: Request,
    response: Response
  ): Promise<Response<T>> {
    try {
      const { name } = request.params;

      const table = request.path.split('/')[1];

      const result = await getByName<Dados<T>>(name, table);
      return response.status(result.status).json({ data: result.data?.dados });
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async getRandom<T>(
    request: Request,
    response: Response
  ): Promise<Response<Array<T>>> {
    try {
      const { limit } = request.query;

      const table = request.path.split('/')[1];

      const result = await getRandomAnimeOrManga<Dados<T>>(
        limit as string,
        table
      );

      return response
        .status(result.status)
        .json({ data: result.data, rows: result.rows });
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async getRandomCard(
    request: Request,
    response: Response
  ): Promise<Response<Array<Card>>> {
    try {
      const { limit } = request.query;

      const table = request.path.split('/')[1];

      const result = await getRandomCard<Card>(limit as string, table);
      return response
        .status(result.status)
        .json({ data: result.data, rows: result.rows });
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async updateAnyFieldThatAreNotAFile<T extends Anime | Manga>(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { dados }: Dados<T> = request.body;
      const { name } = request.params;

      const table = request.path.split('/')[1];

      const status = await updateAnyField(name, dados, table);
      return response.sendStatus(status);
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async updateImageFields(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { name } = request.params;
      const { folder } = request.query;
      const files = request.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      const table = request.path.split('/')[1];

      const status = await updateImages(name, folder as string, files, table);
      return response.sendStatus(status);
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }
}

export default new Anime_Manga();
