import { Request, Response } from 'express';
import AnimeUtils from '../utils/anime';
import CreateAnime from '../../usecase/createAnime';
import AnimeControllerRepository from 'src/usecase/port/AnimeControllerRepository';

export default class AnimeController implements AnimeControllerRepository {
  async create(request: Request, response: Response): Promise<Response> {
    const animeUtils: AnimeUtils = new AnimeUtils();
    const createAnime: CreateAnime = new CreateAnime();
    try {
      const dados = createAnime.createAnime(JSON.parse(request.body.dados));
      const files = request.files as {
        [fieldname: string]: Express.Multer.File[];
      };
      const folder = request.query.folder as string;
      const status = await animeUtils.create(folder, dados, files);
      return response.sendStatus(status);
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async _delete(request: Request, response: Response): Promise<Response> {
    const animeUtils = new AnimeUtils();
    try {
      const { name } = request.params;

      const status = await animeUtils._delete(name);
      return response.sendStatus(status);
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async getCardByName(request: Request, response: Response): Promise<Response> {
    const animeUtils = new AnimeUtils();
    try {
      const { name } = request.params;

      const result = await animeUtils.getCard(name);
      return response.status(result.status).json({ data: result.data });
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async getAnimeByName(
    request: Request,
    response: Response
  ): Promise<Response> {
    const animeUtils = new AnimeUtils();
    try {
      const { name } = request.params;

      const result = await animeUtils.getAnime(name);
      return response.status(result.status).json({ data: result.data });
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async getRandomAnimes(
    request: Request,
    response: Response
  ): Promise<Response> {
    const animeUtils = new AnimeUtils();
    try {
      const { limit } = request.query;

      const result = await animeUtils.getRandomAnimes(Number(limit as string));
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
    const animeUtils = new AnimeUtils();
    try {
      const { limit } = request.query;

      const result = await animeUtils.getRandomCards(Number(limit as string));
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
    const animeUtils: AnimeUtils = new AnimeUtils();
    const createAnime: CreateAnime = new CreateAnime();
    try {
      const dados = createAnime.createAnime(request.body.dados);
      const { name } = request.params;

      const status = await animeUtils.updateAnyFieldsThatAreNotAFile(
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
    const animeUtils = new AnimeUtils();
    try {
      const { name } = request.params;
      const { folder } = request.query;
      const files = request.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      const status = await animeUtils.updateImageFields(
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
