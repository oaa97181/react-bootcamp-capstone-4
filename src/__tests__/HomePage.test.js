import {render, screen, waitFor} from '@testing-library/react';
import Slider from "../components/Homepage/Slider";
import CategoryGrid from "../components/Homepage/CategoryGrid";
import {BrowserRouter} from "react-router-dom";
import ProductGrid from "../components/ReusableComponents/ProductGrid";

test('renders slider', async () => {
    render(<Slider/>);
    await waitFor(() =>
        expect(screen.getByText('A GREAT STYLE - LIVING ROOM')).toBeInTheDocument()
    );
    expect(screen.queryByText(/Loading.../)).toBeNull();
});

test('renders CategoryGrid :DD', async () => {
    render(
        <BrowserRouter>
            <CategoryGrid/>
        </BrowserRouter>
    );
    await waitFor(() =>
        expect(screen.getByText('Decorate')).toBeInTheDocument()
    );
    expect(screen.queryByText(/Loading.../)).toBeNull();
});

test('renders Featured Products', async () => {
    render(
        <BrowserRouter>
            <ProductGrid/>
        </BrowserRouter>
    );
    await waitFor(() =>
        expect(screen.getByText('Fair Isle Snowflake Lumbar Cushion Cover')).toBeInTheDocument()
    );
    expect(screen.queryByText(/Loading.../)).toBeNull();
});

