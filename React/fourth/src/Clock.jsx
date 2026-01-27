import { useState } from "react";

function Clock() {
    
    const [currentCount, setCurrentCount] = useState(0);
    const [timer, setTimer] = useState(0);

    function startClock () {
        let value = setInterval(function() {
        setCurrentCount((prevCount) => prevCount + 1)
        }, 1000);
        setTimer(value);
    }
    function stopClock () {
        console.log(timer);
        clearInterval(timer);
        
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

export default Clock;