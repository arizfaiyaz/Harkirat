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
add(15, 7);
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
//# sourceMappingURL=index.js.map