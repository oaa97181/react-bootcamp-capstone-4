import {render, screen, waitFor} from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";
import ProductGrid from "../components/ReusableComponents/ProductGrid";

test('Validate that the list of results is rendering data ' +
    'according to the “searchTerm” provided.', async () => {
    window.history.pushState({}, 'Search', '/search?q=plate');
    render(
        <BrowserRouter>
            <ProductGrid/>
        </BrowserRouter>
    );
    await waitFor(() =>
        expect(screen.queryByText(/Loading.../)).toBeNull()
    );
    expect(screen.getByText('Set of 4 Trinche Forest Gnome Plates')).toBeInTheDocument()
});

test('Validate that an empty state is displayed when' +
    ' there are no results for the “searchTerm” provided.', async () => {
    window.history.pushState({}, 'Search', '/search?q=qwerty');
    render(
        <BrowserRouter>
            <ProductGrid/>
        </BrowserRouter>
    );
    await waitFor(() =>
        expect(screen.queryByText(/Loading.../)).toBeNull()
    );
    expect(screen.getByText('No more products found 😭')).toBeInTheDocument()
});