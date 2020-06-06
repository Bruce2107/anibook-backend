import { alreadyExists, __delete } from '../../database/anime_manga';

async function _delete(name: string, table: string) {
  if (!(await alreadyExists(table, name))) return 404;

  return (await __delete(table, name)) ? 204 : 400;
}

export default _delete;
