"use strict";
// interface People {
//     name: string,
//     age: number,
//     greet: () => string,
Object.defineProperty(exports, "__esModule", { value: true });
class Manager {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
let user = new Manager("Ariz", 21);
console.log(user.name);
console.log(user.age);
//# sourceMappingURL=class.js.map