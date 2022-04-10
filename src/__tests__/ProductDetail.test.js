import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import ProductDetailComponent from "../components/ProductDetail";
import React from "react";
import CartContext from "../contexts/CartContext";

test('Product Detail Page is ' +
    'fetching and rendering data from the API for a particular product.', async () => {
    window.history.pushState({}, 'Single product', '/product/YZZ_XhIAAC0AvmiA');
    render(
        <ProductDetailComponent/>
    );
    await waitFor(() =>
        expect(screen.queryByText(/Loading.../)).toBeNull()
    );
    expect(screen.getByText('Fair Isle Snowflake Lumbar Cushion Cover')).toBeInTheDocument()
});

test('Product Detail Page contains the following labels: ' +
    'name of the selected product, current price, SKU, category name,' +
    ' a list of tags, and description.', async () => {
    window.history.pushState({}, 'Single product', '/product/YZZ_XhIAAC0AvmiA');

    const {getByTestId} = render(<ProductDetailComponent/>);
    await waitFor(() =>
        expect(screen.queryByText(/Loading.../)).toBeNull()
    );
    const NAME = getByTestId("NAME");
    expect(NAME).toBeInTheDocument();
    const PRICE = getByTestId("PRICE");
    expect(PRICE).toBeInTheDocument();
    const SKU = getByTestId("SKU");
    expect(SKU).toBeInTheDocument();
    const CATEGORY = getByTestId("CATEGORY");
    expect(CATEGORY).toBeInTheDocument();
    const TAGS = getByTestId("TAGS");
    expect(TAGS).toBeInTheDocument();
    const DESCRIPTION = getByTestId("DESCRIPTION");
    expect(DESCRIPTION).toBeInTheDocument();

});

test('Product Detail Page contains a quantity selector and an “Add to Cart” button.', async () => {
    window.history.pushState({}, 'Single product', '/product/YZZ_XhIAAC0AvmiA');

    const {getByTestId} = render(<ProductDetailComponent/>);
    await waitFor(() =>
        expect(screen.queryByText(/Loading.../)).toBeNull()
    );
    const CART_BUTTON = getByTestId("CART_BUTTON");
    expect(CART_BUTTON).toBeInTheDocument();
    const QUANTITY_INPUT = getByTestId("QUANTITY_INPUT");
    expect(QUANTITY_INPUT).toBeInTheDocument();

});

test('Validate that after clicking on the “Add to Cart” button,' +
    ' the number of items that are selected in quantity selector control are added to the cart.'
    , async () => {
        window.history.pushState({}, 'Single product', '/product/YZZ_XhIAAC0AvmiA');

        const state = {products: []};
        const dispatch = jest.fn();
        console.log(state)

        render(
            <CartContext.Provider value={{state, dispatch}}>
                <ProductDetailComponent/>
            </CartContext.Provider>
        );
        console.log(state)
        await waitFor(() =>
            expect(screen.queryByText(/Loading.../)).toBeNull()
        );
        userEvent.click(screen.getByText('Add to cart'))
        expect(screen.getByText('Update cart')).toBeInTheDocument()
    });

test('Validate that the “Add to Cart” button is disabled when ' +
    'the stock units available for the selected product is zero.'
    , async () => {
        window.history.pushState({}, 'Single product', '/product/YZZ_XhIAAC0AvmiA');
        render(<ProductDetailComponent/>);

        await waitFor(() =>
            expect(screen.queryByText(/Loading.../)).toBeNull()
        );
        // userEvent.type(screen.getByTestId('QUANTITY_INPUT'), '0')
        fireEvent.change(screen.getByTestId('QUANTITY_INPUT'), {
            target: {value: "0"},
        });
        expect(screen.getByText('Disabled')).toBeInTheDocument()
    });