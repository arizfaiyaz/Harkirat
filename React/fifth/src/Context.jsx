// Context API
// Context API is a way to manage state globally in a React application.
// it allows you to share state between components without having to pass props down manually at every level.
// it is useful for managing state that needs to be accessed by many components at different nesting levels.
// it helps to avoid "prop drilling" which is the process of passing props down through multiple levels of components just to reach a deeply nested component.
// Context API allows you to create a context object that holds the state and provides it to the components that need it.
// components can then consume the context and access the state directly without having to receive it as props.
// example of using Context API to manage the bulbOn state globally.

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