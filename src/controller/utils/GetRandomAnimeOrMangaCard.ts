import { GetResponse } from '../../constants/types/DataType';
import { CardFields } from '../../constants/types/CardType';
import { getRandom } from './database/Methods';

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
