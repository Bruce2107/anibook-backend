import { Link } from '../constants/types/DataType';

const searchObjectInArray = (url: string, array: Link[]) => {
  for (let i = 0; i < array.length; i++) if (array[i].url === url) return true;
  return false;
};

export default searchObjectInArray;
