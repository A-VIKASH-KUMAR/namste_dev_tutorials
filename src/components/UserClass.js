import React from "react";

/**
 * UserClass component is a class-based React component that demonstrates the use of state and props. It maintains two state variables, `count` and `count2`, and provides a button to increment the `count`. The component also displays the `name` and `description` passed as props.
 * life cycle
 *  - parent constructor
 *  - parent render
 *  - child constructor
 *  - child render
 *  - child componentDidMount
 *  - parent componentDidMount
 */
export class UserClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            count2:2
        }
    }
    componenetDidMount() {
        console.log("Component mounted");
    }
    render() {
        const { name, description } = this.props;
        const { count, count2 } = this.state;
        return (
            <div className="user-profile">
                <p>Count: {count}</p>
                <button onClick={() => this.setState({ count: count + 1 })}>Increment Count</button>
                <h2>{name}</h2>
                <p>{description}</p>

            </div>
        );
    }
}