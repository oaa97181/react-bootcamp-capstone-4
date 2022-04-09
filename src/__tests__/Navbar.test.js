import {render, screen} from '@testing-library/react';
import Navbar from "../components/ReusableComponents/Navbar";
import {BrowserRouter} from "react-router-dom";

test('renders shop name/title in Navbar', async () => {
    render(
        <BrowserRouter>
            <Navbar/>
        </BrowserRouter>
    );
    const title = await screen.findByText('React Shop');
    expect(title.textContent).toBe('React Shop');
});
