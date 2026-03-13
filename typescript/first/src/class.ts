// interface People {
//     name: string,
//     age: number,
//     greet: () => string,

// }

// let person: People = {
//     name: "Ariz",
//     age: 21,
//     greet: () => {
//         return "hi"
//     }

// }

// let greet = console.log(person.greet());

interface People {
    name: string,
    age: number,
    // greet: () => string,
}

class Manager implements People {
    name: string;
    age: number;

    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }
}


let user = new Manager("Ariz", 21);
console.log(user.name);
console.log(user.age);