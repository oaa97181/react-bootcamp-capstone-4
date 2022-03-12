import {PageContext} from "../contexts/pageContext";
import {useContext} from "react";
import Homepage from "./Homepage";
import ProductList from "./ProductList";

function Page() {
    const [state] = useContext(PageContext)

    console.log('current state ', state)
    return (
        <>
            {state.page === 'home' ?
                <Homepage/>
                :
                <ProductList/>
            }
        </>
    )
}

export default Page;