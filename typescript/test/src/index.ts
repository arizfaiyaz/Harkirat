interface User {
    name: string,
    age: number,
    email: string,
    password: string,
}

// function sumOfAge(user1: User, user2: User) {
//     return user1.age + user2.age;
// }

// const age = sumOfAge({name: 'faro', age:20}, {name: 'jiro', age: 30});

// console.log(age);


type Updateprops = Pick<User, 'name' | 'age' | 'email'>
type UpdatePropOptional = Partial<Updateprops>
function updateUser(updatedProps: UpdatePropOptional){

}


