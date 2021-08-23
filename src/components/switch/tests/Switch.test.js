import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Switch from '../Switch';

// Unit tests - functionality
describe("Creates a test suite that groups together several related tests.", () => {
  test("Should equal to 2", () => {
    expect(1 + 1).toEqual(2);
  });
  test("Should equal to 3", () => {
    expect(1 + 2).toEqual(3);
  });
});

// Unit tests - DOM
describe('Switch rendering', () => {
 test('Should render Switch', () => {
   render(<Switch />);
 });
})

