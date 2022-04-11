import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import React from "react";
import AppRouter from "../routers";
import userEvent from "@testing-library/user-event";


test(" 6.1. Validate that an empty state is" +
    " displayed when there are no items in the cart.", async () => {
    const jsdomAlert = window.alert;
    window.alert = () => {};
    window.history.pushState({}, 'Cart', '/cart');

    render(
        <AppRouter/>
    );

    await waitFor(() =>
        expect(screen.queryByText(/Loading.../)).toBeNull()
    );

    userEvent.click(screen.getByText('Remove all'));
    await waitFor(() =>
        expect(screen.queryByText(/Loading.../)).toBeNull()
    );
    expect(screen.queryByText(/Shopping Cart/)).toBeNull()

  window.alert = jsdomAlert;
});

test(" 6.2 Validate that the list of products is shown when there are items in the cart. " +
    "Each row should contain the main image of the product, " +
    "its name, unit price, a quantity selector, " +
    "subtotal and a “remove from cart icon”", async () => {

    window.history.pushState({}, 'Cart', '/cart');

    render(
        <AppRouter/>
    );

    await waitFor(() =>
        expect(screen.queryByText(/Loading.../)).toBeNull()
    );

    expect(screen.getByText('Shopping Cart')).toBeInTheDocument()
    expect(screen.getByText('Fair Isle Snowflake Lumbar Cushion Cover')).toBeInTheDocument()
});


test(" 6.3. Validate that the cart total label " +
    "displays the sum of the subtotals of all items in the cart.", async () => {

    window.history.pushState({}, 'Cart', '/cart');

    render(
        <AppRouter/>
    );

    await waitFor(() =>
        expect(screen.queryByText(/Loading.../)).toBeNull()
    );

    //subtotals
    expect(screen.getAllByText('$40')[0]).toBeInTheDocument()
    expect(screen.getAllByText('$99')[0]).toBeInTheDocument()
    //total
    //40 + 99 = 139
    expect(screen.getByText('$139')).toBeInTheDocument()

});


test("6.4. Validate that you can update the quantity of items for a particular" +
    " product in the cart. Don’t forget to validate that you don’t exceed the stock units" +
    " available for the selected product.", async () => {

    const jsdomAlert = window.alert;
    window.alert = () => {};

    window.history.pushState({}, 'Cart', '/cart');

    render(
        <AppRouter/>
    );

    await waitFor(() =>
        expect(screen.queryByText(/Loading.../)).toBeNull()
    );

    fireEvent.change(screen.getByTestId('QUANTITY_INPUTtestSKU'), {
        target: {value: "10"},
    });

    expect(screen.getByText('$990')).toBeInTheDocument()

    fireEvent.change(screen.getByTestId('QUANTITY_INPUTtestSKU'), {
        target: {value: "99999"},
    });

    expect(screen.getByText('$990')).toBeInTheDocument()

    window.alert = jsdomAlert;
});

test("6.5. Validate that you can remove a product from " +
    "the cart after clicking on the “remove from cart icon”.", async () => {

    window.history.pushState({}, 'Cart', '/cart');

    render(
        <AppRouter/>
    );

    await waitFor(() =>
        expect(screen.queryByText(/Loading.../)).toBeNull()
    );

    userEvent.click(screen.getAllByText('Remove')[0])

    expect(screen.queryByText('Fair Isle Snowflake Lumbar Cushion Cover')).toBeNull()

});