import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Calculator from "./Calculator";

describe("Calculator component", () => {
  test("renders the title correctly", () => {
    render(<Calculator />);
    const title = screen.getByRole("heading", { name: /number calculator/i });
    expect(title).toBeInTheDocument();
  });

  test("adds number input to sum and displays the updated sum", () => {
    render(<Calculator />);

    const input = screen.getByRole("spinbutton");
    const addButton = screen.getByRole("button", { name: /add/i });

    // Initial sum should be 0
    expect(screen.getByText(/sum: 0/i)).toBeInTheDocument();

    // Enter number and add
    fireEvent.change(input, { target: { value: "10" } });
    fireEvent.click(addButton);

    // Sum should update to 10
    expect(screen.getByText(/sum: 10/i)).toBeInTheDocument();

    // Add another number
    fireEvent.change(input, { target: { value: "5" } });
    fireEvent.click(addButton);

    // Sum should update to 15
    expect(screen.getByText(/sum: 15/i)).toBeInTheDocument();

    // Input should be cleared after add
    expect(input).toHaveValue("");
  });

  test("ignores non-numeric input when adding", () => {
    render(<Calculator />);

    const input = screen.getByRole("spinbutton");
    const addButton = screen.getByRole("button", { name: /add/i });

    // Enter invalid input and try to add
    fireEvent.change(input, { target: { value: "abc" } });
    fireEvent.click(addButton);

    // Sum should remain 0
    expect(screen.getByText(/sum: 0/i)).toBeInTheDocument();
    // Input value should remain unchanged
    expect(input).toHaveValue("abc");
  });
});
