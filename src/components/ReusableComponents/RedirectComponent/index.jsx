import {Redirect} from "react-router-dom";

function RedirectComponent() {
    alert('add items to cart')
    return (
        <Redirect to='/'/>
    );
}

export default RedirectComponent;