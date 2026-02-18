interface People {
    name: string,
    age: number,
    greet: () => string,

}

let person: People = {
    name: "Ariz",
    age: 21,
    greet: () => {
        return "hi"
    }

}

let greet = console.log(person.greet());



