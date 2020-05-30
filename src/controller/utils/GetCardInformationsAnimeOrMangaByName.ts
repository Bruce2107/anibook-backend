import { GetResponse, CardFields } from '../../constants/types/DataType';
import { getOne } from './database/Methods';

async function getCardInformationsByName<T>(
  name: string,
  table: string
): Promise<GetResponse<T>> {
  const result = await getOne<T>(table, name, CardFields);

  return result.rowCount
    ? { status: 200, data: result.rows[0] }
    : { status: 404 };
}

export default getCardInformationsByName;
