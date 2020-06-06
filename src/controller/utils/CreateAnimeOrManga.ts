import { Data } from 'anibook';
import updatePhotoOrImageField from '../../utils/UpdatePhotoOrImageField';
import { alreadyExists, insert } from '../../database/anime_manga';

async function create<T extends Data>(
  folder: string,
  dados: T,
  files: { [fieldname: string]: Express.Multer.File[] },
  table: string
): Promise<422 | 409 | 400 | 201> {
  if (Object.keys(files).length) {
    if (!folder) return 422;
    dados = await updatePhotoOrImageField<T>(files, folder, dados);
  }

  if (await alreadyExists(table, dados.name)) return 409;

  return (await insert(table, ['dados'], dados)) ? 201 : 400;
}

export default create;
