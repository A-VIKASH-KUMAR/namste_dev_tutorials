import React from "react";
export const User = () => {
    const [count, setCount] = React.useState(0);
    const [count2, setCount2] = React.useState(2);
    return (
        <div className="user-profile">
            
            <h2>Food delivery app</h2>
            <p>We are a food delivery app company.</p>
            <p>Count: {count}</p>
            <p>Count: {count2}</p>
        </div>
    );
};