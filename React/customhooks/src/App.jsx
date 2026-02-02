import { useState } from "react";

function useCounter () {
  const [count, setCount] = useState(0);
  function increaseCount() {
    setCount(count => count + 1);
  }
  function decreaseCount() {
    setCount(count => count - 1);
  }
  return {
    count: count,
    increaseCount: increaseCount,
    decreaseCount: decreaseCount
  }
}

function App() {
  const { count, increaseCount, decreaseCount } = useCounter();
  return (
    <>
      <div>
        Hello, Custom Hooks!
        <br />
        <br />
        {count}
        <br />
        <br />
        <button onClick={increaseCount}>Increase</button>
        <button onClick={decreaseCount}>Decrease</button>
      </div>
    </>
  )
}

export default App


// example of custom hook structure
/*
function useCustomHook(param1, param2) {
 const [value, setValue] useState(initalvalue)
 
  return value;
 }

*/


// -------------------Custom hooks-------------------
// 1. A custom hook is a JavaScript function whose name starts with "use" and that may call other hooks.
// 2. Custom hooks allow you to extract component logic into reusable functions.
// 3. A custom hook is a convention that naturally follows from the design of hooks, rather than a React feature.
// 4. Custom hooks let you share logic easily across multiple components.
// 5. A custom hook is a normal function that can accept parameters and return values.
// 6. You can use built-in hooks (like useState, useEffect, etc.) inside your custom hooks to manage state and side effects.
// 7. Custom hooks help keep your components clean and focused on rendering UI, while the logic is encapsulated in the hook.