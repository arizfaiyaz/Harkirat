let x: number = 10;

console.log(x);

// function greet(name : string) {
//     console.log(`Hello ${name}`);
// }

greet("World");

function add(a : number, b: number) {
    return a + b;
}

console.log(add(15, 7));

function isLegalAge(age: number) : boolean {
    if (age >= 18) {
        return true;
    } else {
        return false;
    }
}

console.log(isLegalAge(25));

function delayed(fn: (a: string)=> void) {
    setTimeout(fn, 5000);
}

function greet(name : string){
    console.log("Hello " + name);
};

delayed(() => greet("Alice"));

function isEven(num: number) : boolean {
    if (num % 2 == 0) {
        return true;
    } else {
        return false;
    }
}

console.log(isEven(15));

interface User {
    name: string,
    age: number,
    address: {
        city: string,
        country: string,
        pin: number
    }
}

let user : User = {
    name: "Alice",
    age: 30,
    address: { 
        city: "New York",
        country: "USA",
        pin: 12345
    }
}

function isLegal(user: User) : boolean {
    if (user.age >= 18) {
        return true;
    } else {
        return false;
    }
}

let ans = isLegal(user);
if (ans) {
    console.log("User is legal");
} else {
    console.log("User is not legal");
};