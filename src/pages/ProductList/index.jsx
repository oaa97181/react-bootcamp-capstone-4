import ProductGrid from "../../components/ReusableComponents/ProductGrid";
import Sidebar from "../../components/Sidebar";
import {useState} from "react";

function ProductList() {

    const [categoryArray, setCategoryArray] = useState([]);

    return (
        <>
            <Sidebar categoryArray={categoryArray} setCategoryArray={setCategoryArray}/>
            <ProductGrid title='All Products' categoryArray={categoryArray}/>
        </>
    );
}


export default ProductList;