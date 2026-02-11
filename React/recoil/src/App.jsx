
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { counterAtom } from "./store/atoms/counter";

function App() {
  return (
    <>
      <div>
        Hi there!!
        <RecoilRoot>
          <Counter />
        </RecoilRoot>
      </div>
    </>
  )
}

function Counter() {
  
  return (
    <>
    <div>
      <CurrentCount />
      <Increase />
      <Decrease />
    </div>
    </>
  )
}
function CurrentCount() {
  const Count = useRecoilValue(counterAtom);
  return (
    <>
    <div>
      {Count}
    </div>
    </>
  )
}
function Increase() {

  const setCount = useSetRecoilState(counterAtom);
  function increase() {
    setCount(c => c + 1);
  }
  return (
    <>
    <div>
      <button onClick={increase}>Increase</button>
    </div>
    </>
  )
}
function Decrease() {
  const setCount = useSetRecoilState(counterAtom);
  function decrease() {
    setCount(c => c - 1);
  }
  return (
    <>
    <div>
      <button onClick={decrease}>Decrease</button>
    </div>
    </>
  )
}

export default App


// recoil is unsupported in react 19 now




