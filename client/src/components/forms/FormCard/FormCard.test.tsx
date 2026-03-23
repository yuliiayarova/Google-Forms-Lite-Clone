import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import FormCard from "./FormCard";

describe("FormCard", () => {
  it("renders title and description", () => {
    render(
      <MemoryRouter>
        <FormCard id="1" title="Test Form" description="Test Description" />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test Form")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders links", () => {
    render(
      <MemoryRouter>
        <FormCard id="1" title="Test Form" />
      </MemoryRouter>,
    );

    expect(screen.getByText("Open Form")).toBeInTheDocument();
    expect(screen.getByText("Responses")).toBeInTheDocument();
  });
});
