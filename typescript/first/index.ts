let x: number = 10;

console.log(x);

function greet(name : string) {
    console.log(`Hello ${name}`);
}

greet("World");

function add(a : number, b: number) {
    return a + b;
}

add(15, 7);

function isLegalAge(age: number) : boolean {
    if (age >= 18) {
        return true;
    } else {
        return false;
    }
}

console.log(isLegalAge(25));

