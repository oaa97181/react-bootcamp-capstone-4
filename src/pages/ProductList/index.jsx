import ProductGrid from "../../components/ReusableComponents/ProductGrid";
import products from '../../data/mocks/en-us/products.json'
import Sidebar from "../../components/Sidebar";


function ProductList() {

    return (
        <>
            <Sidebar/>
            <h1>This is the Product List Page</h1>
            <ProductGrid data={products} title='All Products'/>
        </>
    );
}


export default ProductList;