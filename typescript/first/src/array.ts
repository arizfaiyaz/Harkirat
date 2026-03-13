interface User {
    firstName: string,
    lastName: string,
    age: number;
}

// function filteredUser(users: User[]) {
//      return users.filter((user) => user.age >= 18);
// }

// console.log(filteredUser([
//     { firstName: "Alice", lastName: "Smith", age: 30 },
//     { firstName: "Bob", lastName: "Johnson", age: 17 },
//     { firstName: "Charlie", lastName: "Brown", age: 25 }
// ]));

function filteredUser(users: User[]) {
    let ans = [];
    for(let i = 0; i < users.length; i++) {
        if (users[i].age >= 18){\
            ans.push(users[i]);
        }
    }
    return ans;
}