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
    isLegal(): boolean,
}

// class Manager implements People {
//     name: string;
//     age: number;

//     constructor(name: string, age: number){
//         this.name = name;
//         this.age = age;
//     }
//     isLegal(): boolean {
//         return this.age >= 18;
//     }
// }


// let user = new Manager("Ariz", 21);
// console.log(user.name);
// console.log(user.age);
// console.log(user.isLegal());

// abstract class User {
//     name: string;
//     constructor(name: string) {
//         this.name = name;
//     }

//     abstract greet(): string;
//     hello() {
//         console.log("hi there")
//     }
// }
//class Employee extends User {
//     name: string;
//     constructor(name: string){
//         super(name);
//         this.name = name;
//     }
//     greet() {
//         return "hi" + this.name;
//     }
// }

// You cannot do unions and intersections with interface but you can do it with type

type Employee = {
    name: string,
    startDate: Date,
}

type Manager = {
    name: string,
    department: string,
};

type TeamLead = Employee & Manager; // intersection hua

let e: Employee = {
    name: "Alice",
    startDate: new Date("01-01-01"),
};

let m: Manager = {
    name: "Alice",
    department: "CSE"
}

let t: TeamLead = {
    name: "Alice",
    startDate: new Date("01-01-01"),
    department: "CSE"
}

