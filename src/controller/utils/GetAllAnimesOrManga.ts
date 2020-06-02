import { GetResponse } from 'anibook';
import { getRandom } from './database/Methods';

async function getAll<T>(
  limit: string,
  table: string
): Promise<GetResponse<T[]>> {
  const result = await getRandom<T>(table, limit, ['dados']);

  return {
    status: 200,
    data: result.rows,
    rows: result.rowCount,
  };
}

export default getAll;
