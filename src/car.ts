class Person {
  name: string;
  age?: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  buyCar(car: Car) {
    car.owner = this;
  }

  selfInformation(): void {
    console.log(`名前は${this.name}です。`);

    if (this.age === undefined) {
      console.log(`年齢は秘密です。`);
    } else {
      console.log(`${this.age}歳です。`);
    }
  }
}

class Car {
  name: string;
  color: string;
  price: number;
  owner?: Person;

  constructor(name: string, color: string, price: number) {
    this.name = name;
    this.color = color;
    this.price = price;
  }

  selfInformation(): void {
    console.log(`名前：${this.name}`);
    console.log(`色：${this.color}`);
    if (this.owner === undefined) {
      console.log(`価格：${this.price.toLocaleString()}`);
    } else {
      console.log(`価格：SOLD OUT`);
      console.log(`所有者：${this.owner.name}`);
    }
  }
}

const car = new Car("カローラ", "白", 2028600);
const person = new Person("ボブ", 27);

person.selfInformation();
car.selfInformation();
person.buyCar(car);
car.selfInformation();

export {};
