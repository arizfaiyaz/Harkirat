import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([{
    title: "Learn React",
    description: "study the basics of React",
    done: false
  }]);

function addTodos(){
  setTodos([...todos])
};

  return (
    <>
      <div>
        <button onClick={addTodos}>Add todo</button>
      </div>
    </>
  )
}

export default App
