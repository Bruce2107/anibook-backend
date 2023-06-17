export class ArrayUtils {
  static removeEmpty<T>(array?: T[]) {
    if (!array) {
      return [];
    }
    return array.filter((value) => value !== '');
  }
}
