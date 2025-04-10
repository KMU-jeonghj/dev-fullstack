import React, {} from "react";

const MapTest = () => {

    const fruits = ['apple', 'banana', 'tomato'];

    return (
        <div>
            <h2>FRUITS</h2>
            <ul>
                {
                    fruits.map((f, i) => (
                        <li key={i}>{f}</li>
                    )
                )
                }
                
            </ul>
        </div>
    )
}

export default MapTest;