/* eslint-disable jest/valid-expect */
/* eslint-disable @typescript-eslint/no-unused-expressions */

/*
    FAQ
    -  data-cy or contains for selecting elements ? 
       If the content of the element changed would you want the test to fail?
       yes: then use cy.contains()
       no: then use a data attribute.
    -  use expect() assertions when you would like to make multiple assertions for the same subject &
       manipulate your subject before making your assertion. 

    src
    - Testing list of items: https://www.cypress.io/blog/2020/04/23/guest-post-testing-lists-of-items/
    - DRY testing list of items: https://filiphric.com/testing-links-with-cypress 
    - DRY Iterate a list: https://glebbahmutov.com/cypress-examples/6.3.0/recipes/each-example.html#how-to-read-values-from-elements-using-each
    - Assertions: https://example.cypress.io/commands/assertions
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
    cy.get("[data-cy=navbar-title]").should("have.text", "Animelist"); 
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

  it('should render correct name for each listItem', () => {
    /* Same as below, but not DRY code 
    cy.get("[data-cy=navbar-items]").children().should(items => {
      expect(items[0]).to.contain.text('Animelist')
      expect(items[1]).to.contain.text('Switch Theme')
      expect(items[2]).to.contain.text('Favorites')
      expect(items[3]).to.contain.text('About')
      expect(items[4]).to.contain.text('Contact')
    })
    */
    const list = []
    cy.get("[data-cy=navbar-items]").find('li')
      .each((li) => {
        list.push((li.text()))
      })
      .wrap(list)
      .should('deep.equal', ["Animelist", "Switch Theme", "Favorites ", "About ", "Contact "])
  })

  it('should render a svg for first listItem and for the last 3', () => {
    cy.get("[data-cy=navbar-items]").find('li').first().find('svg').should('exist') 
    cy.get("[data-cy=navbar-items]").find('li').first().next().find('svg').should('not.exist') 
    // cy.get("[data-cy=navbar-items]").find('li').eq(2).find('svg').should('exist') 
    // cy.get("[data-cy=navbar-items]").find('li').eq(3).find('svg').should('exist') 
    // cy.get("[data-cy=navbar-items]").find('li').eq(4).find('svg').should('exist') 
    cy.get("[data-cy=navbar-items]").find('li').nextAll().find('svg').should('have.length', 3)
  })

  it('should render border-bottom with correct values for every li except title', () => {
    cy.get("[data-cy=navbar-items]").find('li').nextAll().realHover()
     .should("have.css", "border-bottom", "3px solid rgb(72, 61, 139)")
  })

});