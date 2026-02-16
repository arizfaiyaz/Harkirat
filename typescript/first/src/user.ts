
// this is one way to do it

// function greet(user: {
//     name: string,
//     age: number
// }) {
//     console.log("hello" + user.name);
//     console.log("Your age is " + user.age);
    
// }

// greet({
//     name: "Ariz",
//     age: 20
// });

// other way to do it is like this

// function greet(user: {
//     name: string,
//     age: number
// }) {
//     console.log("hello " + user.name);
//     console.log("Your age is " + user.age);
// }

// let user = {
//      name: "Alice",
//      age: 30
// };

// greet(user);

// another way to do it is like this by using interface

interface userType {
    firstName: string,
    lastName: string,
    age: number
}

function greet(user : userType) {
    console.log("Hello " + user.firstName + " " + user.lastName);
    console.log("Your age is " + user.age);
}

let user = {
    firstName: "Alice",
    lastName: "Smith",
    age: 30
};

greet(user);