import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Clock from './Clock';
import { useRef } from 'react';
import Clocks from './Clocks';

function App() {
  const inputRef = useRef();

  function focusOnInput () {
    document.getElementById("name").focus();
    inputRef.current.focus();
  }
  
  return (
    <>
    <div>
      {/* <BrowserRouter>
      <Routes>
        <Route path="/neet/online-class-11" element={<Class11Program />}/>
        <Route path="/neet/online-class-12" element={<Class12Program />}/>
        <Route path="/" element={<Landing />}/>
        <Route path="*" element={<ErrorPage />}/>
      </Routes>
      </BrowserRouter> */}
    </div>
    <div>
      sign up
      <br />
      <input ref={inputRef} id="name" type={"text"} />
      <br />
      <input type={"text"} />
      <br />
      <button onClick={focusOnInput} type="button">submit</button>

    </div>
    <div>
      <Clock />
      <Clocks />
    </div>
    </>
  )
}

function ErrorPage () {
  return (
    <>
    <div>
      404! 
      <br />
      Sorry Page not found.
    </div>
    </>
  )
}

function Landing () {
  return (
    <>
     <div>
      Welcome to Neet Programs
      and Allen
     </div>
    </>
  )
}
function Class11Program () {
  return (
    <>
    <div>
      Neet Programs for class 11th
    </div>
    </>
  )
}

function Class12Program () {
  return (
    <>
    <div>
      Neet Programs for class 12th
    </div>
    </>
  )
}
export default App
