/* eslint-disable jest/valid-expect */

/*
    FAQ - Links
    https://docs.cypress.io/examples/examples/recipes#Fundamentals 
    - Don't click <a> links in your tests that navigate outside of your application. 
    Likely this isn't worth testing anyway. Just verify the href, dont click through

*/
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

    //src: https://www.cypress.io/blog/2020/12/10/testing-the-anchor-links/ 
    it('should limit to 15 valid link items in search suggestions', () => {
        cy.get('[data-cy=searchbar]').find('input').type(' ')
        .get('[data-cy=searchbar-datacontainer]').children()
        .should('have.length', 15).each(a => {
            expect(a).to.have.attr("href").not.contain("undefined")
          })
        })

    it('should be able to scroll the scrollbar top/bottom' , () => {
        cy.get('[data-cy=searchbar]').find('input').type(' ')
        .get('[data-cy=searchbar-datacontainer]').children().last().scrollIntoView().should('be.visible')
        .get('[data-cy=searchbar-datacontainer]').children().first().scrollIntoView().should('be.visible')
    })
})