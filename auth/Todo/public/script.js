// Navigation functions to switch between signup and signin views

function moveToSignup(){
    // Display the signin container
    document.getElementById("signup-container").style.display = "block";
    // Hide the signup container
    document.getElementById("signin-container").style.display = "none";
    // Hide the todos container
    document.getElementById("todo-container").style.display = "none";
}
// Show todos view and hide signup and signin views
function showTodoApp(){
    // Display the signin container
    document.getElementById("signup-container").style.display = "none";
    // Hide the signup container
    document.getElementById("signin-container").style.display = "none";
    // show the todos container
    document.getElementById("todo-container").style.display = "block";

    // fetch and display the user's todos
    getTodos();
}

// function to handle user signup

async function signup(){
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    try {
        // Send a POST request to the signup endpoint
        const response = await axios.post("http://localhost:3000/api/signup", {
            username,
            password
        });
        // Alert the user with the response message
        alert(response.data.message);

        if(response.data.message === "Signed up succesfully"){
            moveToSignin();
        }
    } catch (error) {
        
    }
}