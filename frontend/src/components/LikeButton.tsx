
import { useState } from "react";

export const Counter = function(){
    const [count, setCount] = useState(0);

    const increment = function(){
        setCount(count + 1);

    };

    return(
        <button onClick={increment}>
            {'Like: ${count}'}
        </button>
    )
}
