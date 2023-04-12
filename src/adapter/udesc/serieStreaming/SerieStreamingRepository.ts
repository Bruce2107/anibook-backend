import { SerieStreaming } from '@domain/udesc/serieStreaming';

export interface SerieStreamingRepository {
  _delete(id: string): Promise<boolean>;
  insertOne(serieStreaming: SerieStreaming): Promise<boolean>;
  updateSerieStreaming(
    id: string,
    serieStreaming: SerieStreaming
  ): Promise<boolean>;
  getSerieStreaming(id: string): Promise<SerieStreaming>;
  alreadyExists(serieStreaming: SerieStreaming): Promise<boolean>;
}
