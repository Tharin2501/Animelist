import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // to use toBeInTheDocument, normally in a setupTest.js file.
import Card from "../components/card/Card";
import CardList from "../components/card/CardList";

// Stub for the Card component returned by map in CardList // TODO add description + test for description
const cardStub = {
  mal_id: 101,
  title: "Test title",
  image_url: "Test image url",
};

// Stubbing api data for props:  https://levelup.gitconnected.com/how-to-write-unit-tests-with-react-testing-library-d9624fd2b707
// image tests: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
describe("Card - Test render Card component with props", () => {
  test("should render Card with mal_id, title and image_url", () => {
    render(<Card item={cardStub} />);
    // screen.debug();
    expect(screen.getByText("Test title")).toBeTruthy(); // Check if title has some value
    expect(screen.getByRole("img")).toHaveAttribute("src", "Test image url"); // getByRole to get most HTML elements. Check if img src/alt has stub value
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Test title");
  });
});

describe("CardList - Test input", () => {
  test("Should be empty at startup", () => {
    render(<CardList />);
    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.value).toBe("");
    screen.debug();
  });
  test("Should be able to type in Inputfield", () => {
    render(<CardList />);
    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;
    expect(input).toBeTruthy();
    fireEvent.change(input, { target: { value: "anything user types" } });
    expect(input.value).toBe("anything user types");
    screen.debug();
  });
});
