"use strict";
// this is one way to do it
Object.defineProperty(exports, "__esModule", { value: true });
function greet(user) {
    console.log("Hello " + user.firstName + " " + user.lastName);
    console.log("Your age is " + user.age);
}
let user = {
    firstName: "Alice",
    lastName: "Smith",
    age: 30
};
greet(user);
//# sourceMappingURL=user.js.map