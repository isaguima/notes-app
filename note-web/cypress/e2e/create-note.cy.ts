import { faker } from '@faker-js/faker';

describe("Feature: Create note", () => {

  context("Given the user is on the 'Notes' page", () => {
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

  context("Given the user is on the 'New' page", () => {
    beforeEach(() => { 
      cy.deleteAllNotes();
      cy.visit("/notes/new");
    })

    context("When they fill in the required fields And click the submit button", () => {
      const title = `${faker.lorem.words(5)}`;
      const content = `${faker.lorem.paragraph(2)}`;

      beforeEach(() => {
        cy.intercept("POST", "**/notes").as("postNote");
        cy.intercept("GET", "**/notes?").as("getNote");

        cy.get('[data-cy="new-note-title-field"]')
          .siblings("label")
          .should("be.visible")
          .should("contain", "Title");

        cy.get('[data-cy="new-note-title-field"]')
          .should("be.visible")
          .type(title, {delay: 0});

        cy.get('[data-cy="new-note-content-field"] iframe')
          .should("be.visible")
          .then(iframe => {
            const body = iframe.contents().find("body");
            cy.wrap(body).type(content, {delay: 0});
          });

        cy.get('[data-cy="new-note-submit-btn"]')
          .should("be.visible")
          .click();
      })

      it("Then the app should create the note sucessfully And display the new note in the 'Notes' page", () => {
        cy.wait("@postNote")
          .then(({ request }) => {
            expect(request.body.title).contain(title);
            expect(request.body.content).contain(content);
          })

        cy.wait("@getNote");

        cy.get('[data-cy="notes-table-row"]')
          .should("be.visible")
          .should("contain", title)
          .should("contain", content);

        cy.get('[data-cy="notes-table-row"]')
          .should("be.visible")
          .should("contain", content);
      })
    })
  })
})

/* 
Suggestion for improvement:
We could test this way if fields implemented a "required" validation.

Given user is on the 'New' page
When they do not fill in the required fields 
And click the submit button
Then the required fields should display an error message
And the note should not be created
*/
