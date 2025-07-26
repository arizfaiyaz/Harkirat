// axios vs fetch

// function main() {
//  fetch("https://sum-server.100xdevs.com/todos")
//  .then(async response => {
//     const json = await response.json(); // await response.text()

//  })

// }

// main();

const axios = require('axios');

async function main() {
    const response = await axios.get("https://sum-server.100xdevs.com/todos");
    // response data
    console.log(response.data.todos.length);
}

main();