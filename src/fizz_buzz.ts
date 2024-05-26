import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
})

const fizzBuzz = (input : number) => {
  if (input % 15 === 0) {
    return "FizzBuzz";
  } else if (input % 5 === 0) {
    return "Buzz";
  } else if (input % 3 === 0) {
    return "Fizz";
  } else {
    return String(input);
  }
}

let arrayFizzBuzz: string[] = [];

for (let i: number = 1; i <= 100; i++) {
  arrayFizzBuzz.push(fizzBuzz(i));
}

console.log(arrayFizzBuzz.join(" "));

rl.question("好きな数字を入力してください:", (value) => {
  const input_number : number = Number(value);
  if (Number.isNaN(input_number)) {
    console.log("数字が入力されていません");
  } else {
    console.log(fizzBuzz(input_number));
  }
  rl.close();
})
