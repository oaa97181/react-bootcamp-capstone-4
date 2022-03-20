import Slider from "../../components/Slider";
import ProductGrid from "../../components/ReusableComponents/ProductGrid";
import CategoryGrid from "../../components/ReusableComponents/CategoryGrid";
import featuredProducts from '../../data/mocks/en-us/featured-products.json'
import productCategories from '../../data/mocks/en-us/product-categories.json'

function Homepage() {

    return (
        <>
            <Slider/>
            <CategoryGrid data={productCategories}/>
            <ProductGrid products={featuredProducts} title='Featured Products'/>
        </>
    );
}

export default Homepage;