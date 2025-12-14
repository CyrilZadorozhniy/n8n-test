import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Calculator from "./Calculator";

describe("Calculator component", () => {
  test("renders the Calculator heading and components", () => {
    render(<Calculator />);
    expect(screen.getByRole("heading", { name: /number calculator/i })).toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
    // Product starts at 1
    expect(screen.getByText(/1/)).toBeInTheDocument();
  });

  test("updates input value on user change", () => {
    render(<Calculator />);
    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "15" } });
    expect(input).toHaveValue(15);
  });

  test("multiplies input number with product on Add button click and clears input", () => {
    render(<Calculator />);
    const input = screen.getByRole("spinbutton");
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "10" } });
    fireEvent.click(addButton);
    expect(screen.getByText(/10/)).toBeInTheDocument();
    expect(input).toHaveValue(null);
  });

  test("does not change product when input is not a valid number", () => {
    render(<Calculator />);
    const input = screen.getByRole("spinbutton");
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "abc" } });
    fireEvent.click(addButton);
    // Initial product is 1
    expect(screen.getByText(/1/)).toBeInTheDocument();
  });

  test("displays correct product after multiple multiplications", () => {
    render(<Calculator />);
    const input = screen.getByRole("spinbutton");
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "5" } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: "7" } });
    fireEvent.click(addButton);

    expect(screen.getByText(/35/)).toBeInTheDocument();
  });
});
