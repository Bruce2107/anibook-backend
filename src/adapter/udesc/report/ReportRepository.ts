import { StreamingSerie, StudioSerie } from '@domain/udesc/report';
import { Serie } from '@domain/udesc/serie';

export interface ReportRepository {
  getStudioWithAtLeastOneSerieInThreeStreaming(): Promise<StudioSerie[]>;
  getSeriesWithLanguageMusics(
    languageName: string
  ): Promise<Pick<Serie, 'name'>[]>;
  getStreamingsWithSeriesThatAtLeastTwoAuthor(): Promise<StreamingSerie[]>;
}
