// Create two types called Usder and Admin
// create a function that takes either a  user or an admin as an input and returns a string saying "Welcome, [name]"

interface Admin {
    name: string,
    permissions: string;
}

interface User {
    name: string,
    age: number,
}

type UserOrAdmin = User | Admin;

function greet(user: UserOrAdmin) {
    return `Welcome, ${user.name}`;
}




