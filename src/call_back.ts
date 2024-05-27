function map<T, U>(array: T[], callback: (value: T) => U): U[] {
  const result: U[] = [];
  for (const element of array) {
    result.push(callback(element));
  }
  return result;
}

const numArray = [1, -3, -2, 8, 0, -1];

const result1 = map<number, number>(numArray, (x) => x * 10);
const result2 = map<number, boolean>(numArray, (x) => x >= 0);

console.log(result1);
console.log(result2);
