import { useState } from "react"

function App() {
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

function ToggleBulbState({ setbulbOn }) {
  
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
