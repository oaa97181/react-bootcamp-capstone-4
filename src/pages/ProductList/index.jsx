import ProductGrid from "../../components/ReusableComponents/ProductGrid";
import Sidebar from "../../components/Sidebar";
import products from '../../data/mocks/en-us/products.json'
import {useState} from "react";
import LoadingComponent from "../../components/ReusableComponents/LoadingComponent";


function ProductList() {

    const [categoryArray, setCategoryArray] = useState([]);

    return (
        <>
            <LoadingComponent data={products}/>
            <Sidebar categoryArray={categoryArray} setCategoryArray={setCategoryArray}/>
            <ProductGrid products={products} title='All Products' categoryArray={categoryArray}/>
        </>
    );
}


export default ProductList;