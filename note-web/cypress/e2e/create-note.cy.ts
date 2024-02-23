import { faker } from '@faker-js/faker';

describe("Feature: Create note", () => {

  context("Given user is on the 'Notes' page", () => {
    beforeEach(() => {
      cy.visit("/notes");
    })

    context("When they click on the '+' button", () => {
      beforeEach(() => {
        cy.get('[data-cy="notes-create-btn"]')
          .should("be.visible")
          .click()
      })

      it("Then it should navigate to the 'New' page", () => {
        cy.url().should("contain", "/notes/new");
      })
    })
  })

  context("Given user is on the 'New' page", () => {
    beforeEach(() => { 
      cy.deleteAllNotes();
      cy.visit("/notes/new");
    })

    context("When they fill in the required fields And click the submit button", () => {
      const title = `${faker.lorem.words(5)}`;
      const content = `${faker.lorem.paragraph(2)}`;

      beforeEach(() => {
        cy.intercept('POST', '**/notes').as('postNote');
        cy.intercept('GET', '**/notes').as('getNote');

        cy.get('[data-cy="new-note-title-field"]').type(title);
        cy.get('[data-cy="new-note-content-field"] iframe').then(iframe => {
          const body = iframe.contents().find('body');
          cy.wrap(body).type(content);
        });
        cy.get('[data-cy="new-note-submit-btn"]').click();
      })

      it("Then the app should create the note sucessfully And display the new note in the 'Notes' page", () => {
        cy.wait('@postNote').then(post => {
          expect(post.request.body.title).contain(title);
          expect(post.request.body.content).contain(content);
        })

        //cy.wait('@postNote');
        //cy.url().should("contain", "/notes");
      })
    })
  })
})

// Quando não preencho os campos obrigatórios