/*
    - data-cy or contains for selecting elements ? 
    If the content of the element changed would you want the test to fail?
    yes: then use cy.contains()
    no: then use a data attribute.
*/

beforeEach(() => {
  // root level hook, runs before every test block
  cy.log("should visit localhost:3000 before every tests");
  cy.visit("/");
});

// NavigationBar.tsx
describe("Navigationbar tests", () => {
  it("should render 5 navigationbar items", () => {
    cy.get("[data-cy=navbar-items]").children().should("have.length", 5);
  });

  it("should render title with correct value and content", () => {
    cy.get("[data-cy=navbar-title]").should("have.text", "Animelist"); // || .contains("Animelist")
    cy.get("[data-cy=navbar-homesvg]").should("be.visible");
  });

  it("should display correct color before/after hover", () => {
    cy.get("[data-cy=navbar-title]")
      .should("have.css", "color", "rgb(106, 90, 205)")
      .trigger("mouseover")
      .should("have.css", "fill", "rgb(72, 61, 139)");
  });

  // NOTE: This will probably fail when i implement a reusable Switch component, just fix it after
  it("Should display html body as black when toggle darkmode, white otherwise", () => {
    cy.get("body").should("have.css", "background-color", "rgb(255, 255, 255)");
    cy.get("[data-cy=navbar-darkmode]")
      .click()
      .get("body")
      .should("have.css", "background-color", "rgb(18, 18, 18)");
    cy.get("[data-cy=navbar-darkmode]")
      .click()
      .get("body")
      .should("have.css", "background-color", "rgb(255, 255, 255)");
  });
});
