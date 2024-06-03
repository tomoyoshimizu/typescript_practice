class CommonUser {
  name: string;
  age: number;

  constructor(name: string, age: number){
    this.name = name;
    this.age = age;
  };

  getMessage(message: string): string {
    return `${this.name}(${this.age})「${message}」`;
  }
}

const uhyo = new CommonUser("uhyo", 26);
console.log(uhyo.getMessage("こんにちは"));

export {};
