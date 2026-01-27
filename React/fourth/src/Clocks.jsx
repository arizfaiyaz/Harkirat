import { useRef, useState } from "react";

function Clocks() {
    
    const [currentCount, setCurrentCount] = useState(0);
    const timer = useRef();

    function startClock () {
        let value = setInterval(function() {
        setCurrentCount((prevCount) => prevCount + 1)
        }, 1000);
        timer.current = value;
    }
    function stopClock () {
        console.log(timer);
        clearInterval(timer.current);
        
    }
    return (
        <>
        <div>
           <h2> Clock Component </h2>
           {currentCount}
           <br />
           <button onClick={startClock}>Start</button>
           <button onClick={stopClock}>Stop</button>

        </div>
        </>
    )

}

export default Clocks;