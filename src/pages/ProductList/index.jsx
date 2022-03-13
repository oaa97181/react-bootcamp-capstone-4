import ProductGrid from "../../components/ReusableComponents/ProductGrid";
import Sidebar from "../../components/Sidebar";
import products from '../../data/mocks/en-us/products.json'
import productCategories from '../../data/mocks/en-us/product-categories.json'


function ProductList() {

    return (
        <>
            <Sidebar productCategories={productCategories}/>
            <h1>This is the Product List Page</h1>
            <ProductGrid products={products} title='All Products'/>
        </>
    );
}


export default ProductList;