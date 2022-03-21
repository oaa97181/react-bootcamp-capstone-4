import Slider from "../../components/Slider";
import ProductGrid from "../../components/ReusableComponents/ProductGrid";
import CategoryGrid from "../../components/CategoryGrid";

function Homepage() {
    return (
        <>
            <Slider/>
            <CategoryGrid/>
            <ProductGrid title='Featured Products'/>
        </>
    );
}

export default Homepage;