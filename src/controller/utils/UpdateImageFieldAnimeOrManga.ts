import { alreadyExists, getOne, update } from './database/Methods';
import updatePhotoOrImageField from '../..//utils/UpdatePhotoOrImageField';
import { Data } from '../../constants/types/DataType';

async function updateImageField<T extends Data>(
  name: string,
  folder: string,
  files: { [fieldname: string]: Express.Multer.File[] },
  table: string
): Promise<422 | 404 | 400 | 204> {
  if (!files || !folder) return 422;

  if (!(await alreadyExists(table, name))) return 404;
  const data = (await getOne<{ dados: T }>(table, name, ['dados'])).rows[0]
    .dados;

  const newData = await updatePhotoOrImageField<T>(files, folder, data);

  return (await update<T>(table, name, newData)) ? 204 : 400;
}

export default updateImageField;
