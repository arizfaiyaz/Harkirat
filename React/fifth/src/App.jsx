import { useState } from "react"

function App() {       // rolling up all the components into one main app component

  // rolling up the state
  // it is good to keep the states that would be shared between the components in the common parent component or least common ancestor component/
  // this way the states can be passed down as props to the child components that need them.
  // here the bulbOn state is needed in both BulbState and ToggleBulbState components so we keep it in the LightBulb component which is their common parent component.
  // then we pass the bulbOn state as prop to BulbState component and the setbulbOn function as prop to ToggleBulbState component.
  // this way both components can access and modify the bulbOn state as needed.
  // this is a common pattern in React called "lifting state up".
  // it helps to keep the state management centralized and makes it easier to share state between components.
  // however, for larger applications, it is recommended to use state management libraries like Redux or Context API to manage the state more efficiently.
  // but for small applications, lifting state up is a simple and effective way to manage state.
  // in this example, we have a LightBulb component that contains the bulbOn state and two child components: BulbState and ToggleBulbState.
  return (
    <>
      <div>
        <LightBulb/>
      </div>
    </>
  )
}

function LightBulb() {
  const [bulbOn, setbulbOn] = useState(true);
  return (
    <>
    <div>
      <BulbState bulbOn={bulbOn} />
      <ToggleBulbState setbulbOn={setbulbOn}/>
    </div>
    </>
  )
}

function BulbState({ bulbOn }) {
  return (
    <>
    <div>
      {bulbOn ? "Bulb on" : "Bulb off"}
    </div>
    </>
  )
}

function ToggleBulbState({ setbulbOn } ) {
  
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

export default App
