import { render, screen } from '@testing-library/react';
import Navbar from "../components/ReusableComponents/Navbar";

test('renders shop name/title in Navbar', async () => {
  render(<Navbar/>);
  const title = await screen.findByText('React Shop');
  expect(title.textContent).toBe('React Shop');
});
