import Slider from "../../components/Homepage/Slider";
import ProductGrid from "../../components/ReusableComponents/ProductGrid";
import CategoryGrid from "../../components/Homepage/CategoryGrid";

function Homepage() {
    return (
        <>
            <Slider/>
            <CategoryGrid/>
            <ProductGrid/>
        </>
    );
}

export default Homepage;