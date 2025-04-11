import React from "react";

interface MyProps {
    weather : string;
    children : React.ReactNode;
}

const MyWeather : React.FC<MyProps> = (props) => {

    const {children, weather} = props;

    return (
        <div>
            {children}
            <p></p>
            {weather}
            

        </div>
    )
}

export default MyWeather; 