import Slider from "./Slider";
import ProductGrid from "./ProductGrid";
import CategoryGrid from "./CategoryGrid";
import featuredBanners from '../../data/mocks/en-us/featured-banners.json'
import featuredProducts from '../../data/mocks/en-us/featured-products.json'
import productCategories from '../../data/mocks/en-us/product-categories.json'


function Homepage() {
    return (
        <>
            <Slider data={featuredBanners}/>
            <CategoryGrid data={productCategories}/>
            <ProductGrid data={featuredProducts}/>
        </>
    );
}

export default Homepage;