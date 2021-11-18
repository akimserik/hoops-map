import { render, screen } from "@testing-library/react"
import Header from "./Header";


test('renders header title', () => {
  render(<Header/>);
  const headerTitle = screen.getByText(/карта/i);
  expect(headerTitle).toBeInTheDocument();
})