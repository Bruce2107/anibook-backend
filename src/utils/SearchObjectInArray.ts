import { Link } from '../constants/Data';

const searchObjectInArray = (url: string, array: Link[]) => {
  for (let i in array) if (array[i].url === url) return true;
  return false;
};

export default searchObjectInArray;
