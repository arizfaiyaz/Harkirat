import { useRef } from "react";

function useDebounce(originalFn) {
    const currentClock = useRef();
    
    const fn = () => {
        clearInterval(currentClock.current);
        currentClock.current = setTimeout(originalFn, 3000);
    }
    return fn;
}


function app(){
function sendDatatoBackend(){
    fetch("api.amazon.com/seacrh/");
}

const debouncedFn = useDebounce(sendDatatoBackend, 3000);
    return (
        <>
        <div>
            hi there
            <input type="text" onChange={debouncedFn} />
        </div>
        
        </>
    )
}

export default app;