import { GetResponse } from 'anibook';
import { CardFields } from '../../constants/Card';
import { getRandom } from '../../database/anime_manga';

async function getRandomCard<T>(
  limit: string,
  table: string
): Promise<GetResponse<T[]>> {
  const result = await getRandom<T>(table, limit, CardFields);
  return {
    status: 200,
    data: result.rows,
    rows: result.rowCount,
  };
}

export default getRandomCard;
