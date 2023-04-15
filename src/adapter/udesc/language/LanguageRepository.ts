import { Language } from '@domain/udesc/language';

export interface LanguageRepository {
  _delete(id: string): Promise<boolean>;
  insertOne(language: Language): Promise<boolean>;
  updateLanguage(id: string, language: Language): Promise<boolean>;
  getLanguageById(id: string): Promise<Language>;
  getLanguage(name: string): Promise<Language[]>;
  alreadyExists(language: Language): Promise<boolean>;
  getAllLanguages(): Promise<Language[]>;
}
