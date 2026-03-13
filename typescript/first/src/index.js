"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let x = 10;
console.log(x);
// function greet(name : string) {
//     console.log(`Hello ${name}`);
// }
greet("World");
function add(a, b) {
    return a + b;
}
console.log(add(15, 7));
function isLegalAge(age) {
    if (age >= 18) {
        return true;
    }
    else {
        return false;
    }
}
console.log(isLegalAge(25));
function delayed(fn) {
    setTimeout(fn, 5000);
}
function greet(name) {
    console.log("Hello " + name);
}
;
delayed(() => greet("Alice"));
function isEven(num) {
    if (num % 2 == 0) {
        return true;
    }
    else {
        return false;
    }
}
console.log(isEven(15));
let user = {
    name: "Alice",
    age: 30,
    address: {
        city: "New York",
        country: "USA",
        pin: 12345
    }
};
let user2 = {
    name: "Bob",
    age: 17,
};
function isLegal(user) {
    if (user.age >= 18) {
        return true;
    }
    else {
        return false;
    }
}
let ans = isLegal(user);
if (ans) {
    console.log("User is legal");
}
else {
    console.log("User is not legal");
}
;
//# sourceMappingURL=index.js.map