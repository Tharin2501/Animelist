
beforeEach(() => {
    cy.log("should visit localhost:3000 before every tests");
    cy.visit("/");
  });

afterEach(() => {
    cy.get('[data-cy="searchbar"]').find('input').clear()
  })

describe('searchbar tests', () => {

    it('should always render a label', () => {
        cy.get('[data-cy="searchbar"]').children().find('label').should('exist')
    })

    it('Input should be empty at mount and !empty when user types', () => {
        cy.get('[data-cy="searchbar"]').find('input').should('have.value', "")
        .type('Hello world!').and('have.value', 'Hello world!')
    })

    it('Should render empty data list when when typing input and none otherwise', () => {
        cy.get('[data-cy="searchbar"]').find('input').type('Not an anime')
        .get('[data-cy="searchbar-datacontainer"]').children().should('have.length', 0)
        
        cy.get('[data-cy="searchbar"]').find('input').clear().type('one piece')
        .get('[data-cy="searchbar-datacontainer"]').children().should('not.be.empty')
    })

})