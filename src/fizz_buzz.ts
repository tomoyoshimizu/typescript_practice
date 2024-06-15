import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fizzBuzz = (input: number): string => {
  if (input % 15 === 0) {
    return "FizzBuzz";
  } else if (input % 5 === 0) {
    return "Buzz";
  } else if (input % 3 === 0) {
    return "Fizz";
  } else {
    return String(input);
  }
};

const sequence = (start: number, end: number): number[] =>
  [...Array(end + 1).keys()].slice(start);

const arrayFizzBuzz: string[] = sequence(1, 100).map(fizzBuzz);

console.log(arrayFizzBuzz.join(" "));

rl.question("好きな数字を入力してください:", (value) => {
  const input_number: number = Number(value);
  if (!input_number || Number.isNaN(input_number)) {
    console.error("数字が入力されていません");
  } else {
    console.log(fizzBuzz(input_number));
  }
  rl.close();
});

export {};
