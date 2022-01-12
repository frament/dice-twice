export class Helper {
  static newGuid():string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // tslint:disable-next-line:one-variable-per-declaration no-bitwise
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  static pick<T>(keys:Array<keyof T>, input:any):T{
    const result: T = {} as T;
    for (const key of keys){
      result[key] = input[key];
    }
    return result;
  }
}
