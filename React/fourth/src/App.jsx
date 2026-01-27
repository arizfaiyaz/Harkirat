import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/neet/online-class-11" element={<Class11Program />}/>
        <Route path="/neet/online-class-12" element={<Class12Program />}/>
        <Route path="/" element={<Landing />}/>
        <Route path="*" element={<ErrorPage />}/>
      </Routes>
      </BrowserRouter>
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
