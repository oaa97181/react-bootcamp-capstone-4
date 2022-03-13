import ProductGrid from "../../components/ReusableComponents/ProductGrid";
import Sidebar from "../../components/Sidebar";
import products from '../../data/mocks/en-us/products.json'
import productCategories from '../../data/mocks/en-us/product-categories.json'
import {useState} from "react";
import LoadingComponent from "../../components/ReusableComponents/LoadingComponent";


function ProductList() {

    const [categoryArray, setCategoryArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    setTimeout(()=>{
        setIsLoading(false)
    }, 2000);
    
    return (
        <>
            {isLoading ?
                <LoadingComponent/>
                :
                <>
                    <Sidebar productCategories={productCategories} categoryArray={categoryArray}
                             setCategoryArray={setCategoryArray}/>
                    <ProductGrid products={products} title='All Products'
                                 categoryArray={categoryArray}/>
                </>
            }
        </>
    );
}


export default ProductList;