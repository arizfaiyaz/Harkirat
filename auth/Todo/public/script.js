// Navigation functions to switch between signup and signin views

function moveToSignup(){
    // Display the signin container
    document.getElementById("signup-container").style.display = "block";
    // Hide the signup container
    document.getElementById("signin-container").style.display = "none";
    // Hide the todos container
    document.getElementById("todos-container").style.display = "none";
}
function moveToSignin(){
    // Display the signin container
    document.getElementById("signup-container").style.display = "none";
    // Hide the signup container
    document.getElementById("signin-container").style.display = "block";
    // Hide the todos container
    document.getElementById("todos-container").style.display = "none";
}

// Show todos view and hide signup and signin views
function showTodoApp(){
    // Display the signin container
    document.getElementById("signup-container").style.display = "none";
    // Hide the signup container
    document.getElementById("signin-container").style.display = "none";
    // show the todos container
    document.getElementById("todos-container").style.display = "block";

    // fetch and display the user's todos
    getTodos();
}

// function to handle user signup

async function signup(){
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    try {
        // Send a POST request to the signup endpoint
        const response = await axios.post("http://localhost:3000/signup", {
            username,
            password
        });
        // Alert the user with the response message
        alert(response.data.message);

        if(response.data.message === "Signed up succesfully"){
            moveToSignin();
        }
    } catch (error) {
        console.error("Error while signing up:", error);
    }
}

//Function to handle user signin
async function signin(){
    const username = document.getElementById("signin-username").value;
    const password = document.getElementById("signin-password").value;

    try {
        const response = await axios.post("http://localhost:3000/signin", {
            username,
            password
        });
        if(response.data.token){
            localStorage.setItem("token", response.data.token);
            alert(response.data.message);
            showTodoApp();
        } else {
            // ALert the user if signin fails
            alert(response.data.message);
        }
    } catch (error){
        console.error("Error while signin in:", error);
    }
}

// functiom to handle user logout
async function logout(){
    localStorage.removeItem("token");
    alert("you are logged out successfully!");
    moveToSignin();
}

// function to fetch and display todos 

async function getTodos(){
    try{
       const token = localStorage.getItem("token");
       const response = await axios.get("http://localhost:3000/todos", {
        headers: {
            authorization: token
        }
       });

       // Get the todos list container
       const todosList = document.getElementById("todos-list");

       todosList.innerHTML = "";

       if(response.data.length){
           response.data.forEach((todo) =>{
            const todoElement = createTodoElement(todo);
            todosList.appendChild(todoElement);
           });
       }
    } catch (error) {
        console.error("Error while getting To-do List:",error)
    }
}

// Function to add a new to do

async function addTodo(){
    const inputElement = document.getElementById("input");
    const title = inputElement.value;

    if(title.trim() === ""){
        alert("Please enter a title for the todo");
        return;
    }
    try {
        const token = localStorage.getItem("token");
        // Send a POST request to add the new todo 
        await axios.post("http://localhost:3000/todos", {
            title
        }, {
            headers: {
                authorization: token
            }
        });

        inputElement.value = ""; // clear the input after add the todo
        getTodos();
    } catch (error) {
        console.error("Error while adding todo:", error);
    }
}

// Function to update an existing To-do
async function updateTodo(id, newTitle){
    const token = localStorage.getItem("token");
    try {
        // Send a PUTrequest to update the todo
        await axios.put(`http://localhost:3000/todos/${id}`, {
            title: newTitle
        }, {
            headers: {
                authorization: token
            }
        });

        // Refrest the todo list
        getTodos();

    } catch(error){
        console.error("Error while updating todo:", error);
    }
}

// Function to delete a To-do
async function deleteTodo(id){
    const token = localStorage.getItem("token");
    try {
        await axios.delete(`http://localhost:3000/todos/${id}`, {
            headers: {
                authorization: token
            }
        });

        getTodos();
    } catch (error) {
        console.error("Error while deleting todo:", error);
    }
}

// create a To-do element for display
function createTodoElement(todo){
    // Create a container div for the todo
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo-item";

    // Create an input element for the todo title
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.value = todo.title || "";
    inputElement.readOnly =  true;

    // Create update, delete and done checkbox elements
    const updateBtn = createUpdateButton(inputElement, todo.id);
    const deleteBtn = createDeleteButton(todo.id);
    const doneCheckbox = createDoneCheckbox(todo.done, todo.id, inputElement);

    // append the created elements to the to-do container
    todoDiv.appendChild(inputElement);
    todoDiv.appendChild(doneCheckbox);
    todoDiv.appendChild(updateBtn);
    todoDiv.appendChild(deleteBtn);

    return todoDiv;

}

// Create an input element for todo title
function createInputElement(title) {
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.value = title || "";
    inputElement.readOnly = true;

    return inputElement;
}

// Create an update button for a todo
function createUpdateButton(inputElement, id) {
    const updateBtn = document.createElement("button");
    updateBtn.textContent = "Update";
    updateBtn.onclick = () => {
        if (inputElement.readOnly) {
            inputElement.readOnly = false;
            updateBtn.textContent = "Save";
            inputElement.focus();// foucs on the input field
            inputElement.style.outline = "1px solid #007BFF";
        } else {
            inputElement.readOnly = true;
            updateBtn.textContent = "Edit";
            inputElement.style.outline = "none";
            updateTodo(id, inputElement.value);
        }
    };

    return updateBtn;
}

// create a delete button for a to-do
function createDeleteButton(id){
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

// handle button click
deleteBtn.onclick = () => {
    deleteTodo(id);
}
return deleteBtn;
};

// Function to mark a To-Do as done/undone
async function toggleTodoDone(id, done){
    const token = localStorage.getItem("token");

    try {
        await axios.put(`http://localhost:3000/todos/${id}/done`, {
            done: done
        }, {
            headers: {
                authorization: token
            }
        });
        
        getTodos();

    } catch (error) {
        console.error("error while toggling To-do status:", error);
    }
}

// Create a checkbox to mark a todo as done/undone
function createDoneCheckbox(done, id, inputElement){
    const doneCheckbox = document.createElement("input");
    doneCheckbox.type = "checkbox";
    doneCheckbox.checked = done;

    inputElement.style.textDecoration = done ? "line-through" : "none";

    doneCheckbox.onchange = () => {
        // Toggle the todo status and update text decoration
    toggleTodoDone(id, doneCheckbox.checked); // Pass the updated done state
        inputElement.style.textDecoration = doneCheckbox.checked ? "line-through" : "none";
    };
    return doneCheckbox;
}
