
import { useState } from "react";

export interface CounterProps {
    count: number;
    countChangeFunc: (newCount: number) => void;
}

export const Counter = function({count, countChangeFunc}: CounterProps){
    const [likeCount, setLikeCount] = useState(count);

    const incrementCounters = function() {
		setLikeCount(likeCount + 1);
		countChangeFunc(count + 1); 
    };  

    return (
		<>
	<button onClick={incrementCounters}><span>👍</span></button>
	<br/>
	{ likeCount > 0 && <span>This item was liked {likeCount} times. </span>}
	</>
	);
}
