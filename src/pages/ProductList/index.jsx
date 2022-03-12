import {useContext} from "react";
import {PageContext} from "../../contexts/pageContext";

function ProductList() {
          const [ state, dispatch ] = useContext(PageContext)

    return (
        <>
            <h1>This is the Product List Page</h1>
            <div>
                <button  onClick={() => dispatch({ type: "home" })}>View all products</button>
            </div>
        </>
    );
}


export default ProductList;