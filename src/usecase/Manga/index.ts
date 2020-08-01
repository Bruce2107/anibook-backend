import { Request, Response } from 'express';
import { Manga } from '@domain/manga';
import { AnimeMangaUtils } from '@utils/AnimeManga';
import { CreateManga } from './createManga';
import { AnimeMangaControllerRepository } from '@usecase/port/AnimeMangaControllerRepository';
import { DatabaseAnimeMangaRepository } from '@adapter/anime_manga/repository/DatabaseAnimeManga';
import { DatabaseImage } from '@adapter/image/repository/DatabaseImage';

export class MangaController implements AnimeMangaControllerRepository {
  async create(request: Request, response: Response): Promise<Response> {
    const mangaUtils = new AnimeMangaUtils<Manga>(
      new DatabaseAnimeMangaRepository('mangas'),
      new DatabaseImage()
    );
    const createManga = new CreateManga().createManga;
    try {
      const dados = createManga(JSON.parse(request.body.dados));
      const files = request.files as {
        [fieldname: string]: Express.Multer.File[];
      };
      const folder = request.query.folder as string;
      const status = await mangaUtils.create(folder, dados, files);
      return response.sendStatus(status);
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async _delete(request: Request, response: Response): Promise<Response> {
    const mangaUtils = new AnimeMangaUtils<Manga>(
      new DatabaseAnimeMangaRepository('mangas'),
      new DatabaseImage()
    );
    try {
      const { name } = request.params;

      const status = await mangaUtils._delete(name);
      return response.sendStatus(status);
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async getCardByName(request: Request, response: Response): Promise<Response> {
    const mangaUtils = new AnimeMangaUtils<Manga>(
      new DatabaseAnimeMangaRepository('mangas'),
      new DatabaseImage()
    );
    try {
      const { name } = request.params;

      const result = await mangaUtils.getCard(name);
      return response.status(result.status).json({ data: result.data });
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async getByName(request: Request, response: Response): Promise<Response> {
    const mangaUtils = new AnimeMangaUtils<Manga>(
      new DatabaseAnimeMangaRepository('mangas'),
      new DatabaseImage()
    );
    try {
      const { name } = request.params;

      const result = await mangaUtils.getOne(name);
      return response.status(result.status).json({ data: result.data });
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async getRandom(request: Request, response: Response): Promise<Response> {
    const mangaUtils = new AnimeMangaUtils<Manga>(
      new DatabaseAnimeMangaRepository('mangas'),
      new DatabaseImage()
    );
    try {
      const { limit } = request.query;

      const result = await mangaUtils.getRandom(limit as string);
      return response
        .status(result.status)
        .json({ data: result.data, rows: result.rows });
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async getRandomCards(
    request: Request,
    response: Response
  ): Promise<Response> {
    const mangaUtils = new AnimeMangaUtils<Manga>(
      new DatabaseAnimeMangaRepository('mangas'),
      new DatabaseImage()
    );
    try {
      const { limit } = request.query;

      const result = await mangaUtils.getRandomCards(limit as string);
      return response
        .status(result.status)
        .json({ data: result.data, rows: result.rows });
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async getSort(request: Request, response: Response): Promise<Response> {
    const mangaUtils = new AnimeMangaUtils<Manga>(
      new DatabaseAnimeMangaRepository('mangas'),
      new DatabaseImage()
    );
    try {
      const { limit } = request.query;
      const { order } = request.params;

      const result = await mangaUtils.getSort(limit as string, order);
      return response
        .status(result.status)
        .json({ data: result.data, rows: result.rows });
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async getSortCard(request: Request, response: Response): Promise<Response> {
    const mangaUtils = new AnimeMangaUtils<Manga>(
      new DatabaseAnimeMangaRepository('mangas'),
      new DatabaseImage()
    );
    try {
      const { limit } = request.query;
      const { order } = request.params;

      const result = await mangaUtils.getSortCard(
        limit as string,
        order as string
      );
      return response
        .status(result.status)
        .json({ data: result.data, rows: result.rows });
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async updateAnyFieldThatAreNotAFile(
    request: Request,
    response: Response
  ): Promise<Response> {
    const mangaUtils = new AnimeMangaUtils<Manga>(
      new DatabaseAnimeMangaRepository('mangas'),
      new DatabaseImage()
    );
    const createManga = new CreateManga().createManga;
    try {
      const dados = createManga(request.body.dados);
      const { name } = request.params;

      const status = await mangaUtils.updateAnyFieldsThatAreNotAFile(
        name,
        dados
      );
      return response.sendStatus(status);
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async updateImageField(
    request: Request,
    response: Response
  ): Promise<Response> {
    const mangaUtils = new AnimeMangaUtils<Manga>(
      new DatabaseAnimeMangaRepository('mangas'),
      new DatabaseImage()
    );
    try {
      const { name } = request.params;
      const { folder } = request.query;
      const files = request.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      const status = await mangaUtils.updateImageFields(
        name,
        folder as string,
        files
      );
      return response.sendStatus(status);
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }
}

const databaseMangaRepository = new DatabaseAnimeMangaRepository<Manga>(
  'mangas'
);

const databaseImageRepository = new DatabaseImage();

const mangaUtils = new AnimeMangaUtils(
  databaseMangaRepository,
  databaseImageRepository
);

export { mangaUtils, databaseMangaRepository, databaseImageRepository };
