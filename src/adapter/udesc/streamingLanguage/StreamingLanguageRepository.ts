import { StreamingLanguage } from '@domain/udesc/streamingLanguage';

export interface StreamingLanguageRepository {
  _delete(id: string): Promise<boolean>;
  insertOne(streamingLanguage: StreamingLanguage): Promise<boolean>;
  updateStreamingLanguage(
    id: string,
    streamingLanguage: StreamingLanguage
  ): Promise<boolean>;
  getStreamingLanguage(id: string): Promise<StreamingLanguage>;
  alreadyExists(streamingLanguage: StreamingLanguage): Promise<boolean>;
}
