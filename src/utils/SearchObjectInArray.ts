import { Link } from 'anibook';

const searchObjectInArray = (url: string, array: Link[]) => {
  for (let i in array) if (array[i].url === url) return true;
  return false;
};

export default searchObjectInArray;
