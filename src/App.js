import {useFeaturedBanners} from './utils/hooks/useFeaturedBanners';
import Navbar from "./components/Navbar";

function App() {
    const {data, isLoading} = useFeaturedBanners();
    console.log(data, isLoading);

    return (
        <>
            <Navbar/>
        </>
    );
}

export default App;
