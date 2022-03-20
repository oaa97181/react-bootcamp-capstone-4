import Slider from "../../components/Slider";
import ProductGrid from "../../components/ReusableComponents/ProductGrid";
import CategoryGrid from "../../components/ReusableComponents/CategoryGrid";
import featuredProducts from '../../data/mocks/en-us/featured-products.json'
import productCategories from '../../data/mocks/en-us/product-categories.json'
import {useFeaturedBanners} from '../../utils/hooks/useFeaturedBanners';
import LoadingComponent from "../../components/ReusableComponents/LoadingComponent";

function Homepage() {
    const {data, isLoading} = useFeaturedBanners();

    return (
        <>
            <LoadingComponent data={data}/>
            <Slider data={data} isLoading={isLoading}/>
            <CategoryGrid data={productCategories}/>
            <ProductGrid products={featuredProducts} title='Featured Products'/>
        </>
    );
}

export default Homepage;