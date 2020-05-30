import { GetResponse } from '../../constants/types/DataType';
import { CardFields } from '../../constants/types/CardType';
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
