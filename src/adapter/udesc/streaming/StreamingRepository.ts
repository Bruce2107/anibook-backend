import { Streaming } from '@domain/udesc/streaming';

export interface StreamingRepository {
  _delete(id: string): Promise<boolean>;
  insertOne(streaming: Streaming): Promise<boolean>;
  updateStreaming(id: string, streaming: Streaming): Promise<boolean>;
  getStreaming(id: string): Promise<Streaming>;
  alreadyExists(streaming: Streaming): Promise<boolean>;
  getAllStreamings(): Promise<Streaming[]>;
}
