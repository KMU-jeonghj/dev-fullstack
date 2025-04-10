import { useState } from "react";


const Timer : React.FC = () => {

    const [seconds, setSeconds] = useState<number>(0);

    return (
        <div>
            <h2>Timer : {seconds}s</h2>
            <button onClick={
                function() {
                    setInterval(() => {
                        setSeconds((prev)=> prev+1);
                    }, 1000);
                }
            }>START</button>

        </div>
    )
}

const Clock : React.FC = () => {
    const [time, setTime] = useState(new Date());

    setInterval(() => {
        setTime(new Date());
    }, 1000);

    return (
        <div>
            now :  {time.toLocaleTimeString()}
        </div>
    )
}

export default Clock;