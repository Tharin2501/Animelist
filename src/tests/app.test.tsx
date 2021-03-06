import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // to use toBeInTheDocument, normally in a setupTest.js file.
import Card from "../components/card/Card";
import CardList from "../components/card/CardList";
import { color } from "../themes/themes";
import { ThemeProvider } from "styled-components";

// How to run single test: yarn test -t 'name of test'

// Stub for the Card component returned by map in CardList // TODO add description + test for description
const cardStub = {
  mal_id: 101,
  title: "Test title",
  image_url: "Test image url",
};

/* 
  TypeError: Cannot read property 'theme' of undefined
  Fix: https://stackoverflow.com/questions/58742283/how-to-test-react-component-with-hooks-using-react-testing-library
  Why?: Since the components is styled using 'themes' the component requires ThemeProvider context. 
*/
beforeEach(() => {
  render(
    <ThemeProvider theme={color}>
      <Card item={cardStub} />
    </ThemeProvider>
  );
  render(
    <ThemeProvider theme={color}>
      <CardList />
    </ThemeProvider>
  );
  screen.debug();
});

describe("CardList and Card - Test searchinput and card data(stub)", () => {
  // Stubbing api data for props:  https://levelup.gitconnected.com/how-to-write-unit-tests-with-react-testing-library-d9624fd2b707
  // image tests: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f

  test("Should render Card with correct stub data", () => {
    expect(screen.getByText("Test title")).toBeTruthy(); // Check if title prop(heading) has some value, better to use getByRole
    expect(screen.getByRole("img")).toHaveAttribute("src", "Test image url"); // getByRole to get most HTML elements. Check if img src/alt has stub value
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Test title");
  });

  test("Should be empty at startup", () => {
    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement; // recommended
    expect(input).toBeTruthy();
    expect(input.value).toBe("");
  });

  test("Should be able to type in input", () => {
    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;
    expect(input).toBeTruthy();
    fireEvent.change(input, { target: { value: "a random value" } });
    expect(input.value).toBe("a random value");
  });
});
