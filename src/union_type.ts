type Present<T> = {
  hasValue: true;
  value: T;
};
type Blank = {
  hasValue: false;
};
type Option<T> = Present<T> | Blank;

function showNumber(entry: Option<number>): void{
  if (entry.hasValue){
    console.log(entry.value);
  }
}

function doubleNumber(entry: Option<number>){
  return mapOption<number, number>(entry, (x) => x * 2);
}

function mapOption<T, U>(entry: Option<T>, callback: (value: T) => U): Option<U>{
  if (entry.hasValue){
    return {
      hasValue: true,
      value: callback(entry.value)
    }
  } else {
    return {
      hasValue: false
    }
  }
}

const myNumber: Option<number> = {
  hasValue: true,
  value: 896
};

const blankNumber: Option<number> = {
  hasValue: false,
};

showNumber(myNumber);
console.log(doubleNumber(myNumber));
showNumber(blankNumber);
console.log(doubleNumber(blankNumber));

export {};
