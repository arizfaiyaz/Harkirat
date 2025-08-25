// map, filter and arrow functions

// function  sum(a,b){
//     return a + b;
// }
// arrow function
const sum = (a,b) => {
    return a + b;
}


// Given an array of numbers, return a new array in which every value is multiplied by 2
// [1,2,3,4,5];
// [2,4,6,8,10];

/* 
    Solution 1
    Using a for loop


 const newArray = [];

 for (let i = 0; i < input.length; i++){
      newArray.push(input[i] * 2);
 }
   console.log(newArray);

*/

// solution 2 using map
 const input = [1,2,3,4,5];

 function transform(i) {
    return i * 2;
};

const answer = input.map(transform);
console.log(answer);

// Filter
// what if i tell u, giev an array input, give me back all the even values from it
const arr =[1,2,3,4,5,6,7,8,9];
 const newArr = [];
for (let i = 0; i < arr.length; i++) {
     if(arr[i] % 2 === 0){
//         newArr.push(arr[i]);
//     }
// }
// console.log(newArr);


// solution 2 using filter
const arr =[1,2,3,4,5,6,7,8,9];

function filterLogic(n){
    if (n % 2 === 0) {
        return true;
    } else {
        return false;
    }
}

const ans = arr.filter(filterLogic);
console.log(ans);