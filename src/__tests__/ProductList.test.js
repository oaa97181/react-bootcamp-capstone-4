import {render, screen, waitFor} from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ProductGrid from "../components/ReusableComponents/ProductGrid";
import userEvent from "@testing-library/user-event";

test('renders sidebar', async () => {
    window.history.pushState({}, 'All Products', '/products');
    render(
        <Sidebar
            categoryArray={[]}
            setCategoryArray={() => {
            }}
        />
    );
    await waitFor(() =>
        expect(screen.getByText('Decorate')).toBeInTheDocument()
    );
    expect(screen.queryByText(/Loading.../)).toBeNull();
});

test('renders category products (filtered)', async () => {
    window.history.pushState({}, 'search queryyyyyy', '/products?category=kitchen');
    render(
        <BrowserRouter>
            <ProductGrid/>
        </BrowserRouter>
    );
    await waitFor(() =>
        expect(screen.getByText('Plato Forest Gnome Christmas Tree')).toBeInTheDocument()
    );
    expect(screen.queryByText(/Loading.../)).toBeNull();
});

test('renders pagination controls CORRECTLY', async () => {
    window.history.pushState({}, 'ALL PRODUCTS', '/products');
    render(
        <BrowserRouter>
            <ProductGrid/>
        </BrowserRouter>
    );
    await waitFor(() =>
        expect(screen.getByText('Next Page')).toBeInTheDocument()
    );
    expect(screen.queryByText(/Loading.../)).toBeNull();
});

test('Prev button is disabled when the user is on the first page', async () => {
    window.history.pushState({}, 'ALL PRODUCTS', '/products');
    render(
        <BrowserRouter>
            <ProductGrid/>
        </BrowserRouter>
    );
    await waitFor(() =>
        expect(screen.queryByText(/Loading.../)).toBeNull()
    );
    expect(screen.queryByText(/Previous page/)).toBeNull()
});

test('Next button is working as expected', async () => {
    window.history.pushState({}, 'ALL PRODUCTS', '/products');
    render(
        <BrowserRouter>
            <ProductGrid/>
        </BrowserRouter>
    );
    await waitFor(() =>
        expect(screen.queryByText(/Loading.../)).toBeNull()
    );
    userEvent.click(screen.getByText('Next Page'))
    expect(screen.getByText('Page: 2')).toBeInTheDocument()
});

test('Prev button is working as expected', async () => {
    window.history.pushState({}, 'ALL PRODUCTS', '/products');
    render(
        <BrowserRouter>
            <ProductGrid/>
        </BrowserRouter>
    );
    await waitFor(() =>
        expect(screen.queryByText(/Loading.../)).toBeNull()
    );
    userEvent.click(screen.getByText('Next Page'))
    userEvent.click(screen.getByText('Previous Page'))
    expect(screen.getByText('Page: 1')).toBeInTheDocument()
});

test('Next button is disabled when the user is on the last page', async () => {
    window.history.pushState({}, 'ALL PRODUCTS', '/products');
    render(
        <BrowserRouter>
            <ProductGrid/>
        </BrowserRouter>
    );
    await waitFor(() =>
        expect(screen.queryByText(/Loading.../)).toBeNull()
    );
    userEvent.click(screen.getByText('Next Page'))
    userEvent.click(screen.getByText('Next Page'))
    userEvent.click(screen.getByText('Next Page'))
    userEvent.click(screen.getByText('Next Page'))
    userEvent.click(screen.getByText('Next Page'))
    userEvent.click(screen.getByText('Next Page'))
    userEvent.click(screen.getByText('Next Page'))
    expect(screen.queryByText(/Next Page/)).toBeNull()
});