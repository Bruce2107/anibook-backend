import { Card } from '@domain/card';
import { Anime } from '@domain/anime';
import { Manga } from '@domain/manga';

type MyType = { type: string };
interface MyAnime extends Anime, MyType {}

interface MyManga extends Manga, MyType {}

interface MyCard extends Card, MyType {}

type Mixed = MyAnime | MyManga;

export { Mixed, MyAnime, MyCard, MyManga, MyType };
