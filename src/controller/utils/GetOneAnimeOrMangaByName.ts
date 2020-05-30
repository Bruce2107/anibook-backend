import { getOne } from './database/Methods';
import { GetResponse } from '../../constants/Data';

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
