// Context API
// Context API is a way to manage state globally in a React application.
// it allows you to share state between components without having to pass props down manually at every level.
// it is useful for managing state that needs to be accessed by many components at different nesting levels.
// it helps to avoid "prop drilling" which is the process of passing props down through multiple levels of components just to reach a deeply nested component.
// Context API allows you to create a context object that holds the state and provides it to the components that need it.
// components can then consume the context and access the state directly without having to receive it as props.
// example of using Context API to manage the bulbOn state globally.
// Give me an example of Context API in React to manage state globally.
// sure! here's an example of using Context API in React to manage the bulbOn state globally.
// in this example, we create a BulbContext using createContext() and provide the bulbOn state and setbulbOn function to the context provider.

import { createContext, useState, useContext } from "react"

const BulbContext = createContext();


function Context() {  
    const [bulbOn, setbulbOn] = useState(true);     
  return (
    <>
    <BulbContext.Provider value={{
            name: "Harkirat",
            bulb: bulbOn,
            setbulbOn: setbulbOn 
        }}>
      <div>
        
        <LightBulb/>
      </div>
      </BulbContext.Provider>
    </>
  )
}

function LightBulb() {
    const { bulbOn, setbulbOn } = useContext(BulbContext);
  return (
    <>
    <div>
      <BulbState bulbOn={bulbOn} />
      <ToggleBulbState setbulbOn={setbulbOn}/>
    </div>
    </>
  )
}

function BulbState() {
  const { bulbOn } = useContext(BulbContext);
    return (
    <>
    <div>
      {bulbOn ? "Bulb on" : "Bulb off"}
    </div>
    </>
  )
}

function ToggleBulbState() {
  const { setbulbOn } = useContext(BulbContext);
  function toggle() {
    setbulbOn(prevbulbOn => !prevbulbOn);
  }
  return (
    <>
    <div>
      <button onClick={toggle}>Toggle the bulb</button>
    </div>
    </>
  )
}

export default Context;

// ---------------Difference between rolling up the state and prop drilling --------------

// 1. Lifting state up is the process of moving the state from a child component to a common parent component so that it can be shared between multiple child components.
// 2. Prop drilling is the process of passing data from a parent component to a child component through multiple layers of intermediate components.
// 3. Lifting state up helps to avoid prop drilling by centralizing the state in a common parent component.
// 4. Lifting state up is generally preferred over prop drilling as it makes the code more maintainable and easier to understand.
// 5. Libraries like Redux or Context API can be used to manage the state more efficiently.
// but for small applications, lifting state up is a simple and effective way to manage state.
// the better way between the two is lifting up the state.

// better between rolling up the state and prop drilling and contet API is Context API
// in larger applications, using Context API or state management libraries like Redux is generally preferred over both lifting state up and prop drilling as they provide a more scalable and maintainable way to manage state globally.
// however, for smaller applications, lifting state up is a simple and effective way to manage state.

