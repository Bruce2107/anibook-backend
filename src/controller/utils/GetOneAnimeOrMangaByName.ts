import { GetResponse } from 'anibook';
import { getOne } from '../../database/anime_manga';

async function getByName<T>(
  name: string,
  table: string
): Promise<GetResponse<T>> {
  const result = await getOne<T>(table, name, ['dados']);
  return result.rowCount
    ? { status: 200, data: result.rows[0] }
    : { status: 404 };
}
export default getByName;
