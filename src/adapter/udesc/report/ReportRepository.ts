import { StreamingSerie, StudioSerie } from '@domain/udesc/report';
import { Serie } from '@domain/udesc/serie';
import { User } from '@domain/udesc/user';

export interface ReportRepository {
  getStudioWithAtLeastOneSerieInThreeStreaming(): Promise<StudioSerie[]>;
  getSeriesWithLanguageMusics(
    languageName: string
  ): Promise<Pick<Serie, 'name'>[]>;
  getStreamingsWithSeriesThatAtLeastTwoAuthor(): Promise<StreamingSerie[]>;
  getHome(): Promise<Serie[]>;
  getDetails(name: string, user?: string): Promise<Serie[]>;
  userLogin(user: User): Promise<boolean>;
}
