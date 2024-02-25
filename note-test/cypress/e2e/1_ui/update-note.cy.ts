import { faker } from '@faker-js/faker';

describe("Feature: Update note", () => {

  let id = "";
    
  const note = {
      title: `${faker.lorem.words(5)}`,
      content: `${faker.lorem.words(10)}`
  };

  beforeEach(() => {
    cy.deleteAllNotes();

    cy.postNote(note)
      .then( response => {
          id = response.body._id;
      })
  })

  context("Given the user is on the 'Notes' page And there is a note in the table", () => {

    beforeEach(() => { 
      cy.visit("/notes");
    })

    context("When they click on the note's update button", () => {

      beforeEach(() => {
        cy.get('[data-cy="notes-table-row-update-btn"]')
          .should("be.visible")
          .click();
      })

      it("Then it should navigate to the note's page And display the note's data", () => {
        cy.url().should("contain", `/notes/${id}`);

        cy.get('[data-cy="new-note-title-field"]')
          .should("be.visible")
          .should("have.value", note.title);

        cy.get('[data-cy="new-note-content-field"] iframe')
          .wait(1000)
          .should('be.visible')
          .then( iframe => {
            const body = iframe.contents().find("body");
            cy.wrap(body).should("contain", note.content);
          })
      })
    })
  })

  context("Given the user is on the note's page", () => {
    
    beforeEach(() => { 
      cy.visit(`/notes/${id}`);
    })

    context("When they edit the fields And click the submit button", () => {
      const newTitle = `${faker.lorem.words(5)}`;
      const newContent = `${faker.lorem.words(10)}`;

      beforeEach(() => {
        cy.intercept("PUT", `**/notes/${id}`).as("putNote");
        cy.intercept("GET", "**/notes?").as("getNotes");

        cy.get('[data-cy="new-note-title-field"]')
          .should("be.visible")
          .clear()
          .type(newTitle, {delay: 0});

        cy.get('[data-cy="new-note-content-field"] iframe')
          .should("be.visible")
          .then( iframe => {
            const body = iframe.contents().find("body");
            cy.wrap(body)
              .clear()
              .type(newContent, {delay: 0});
          });

        cy.get('[data-cy="new-note-submit-btn"]')
          .should("be.visible")
          .click();
      })

      it("Then the app should update the note and display the updated note on the 'Notes' page", () => {
        cy.wait("@putNote")
          .then( ({ request }) => {
            expect(request.body.title).contain(newTitle);
            expect(request.body.content).contain(newContent);
          })

          cy.wait("@getNotes");

          cy.get('[data-cy="notes-table-row"]')
            .should("be.visible")
            .should("contain", newTitle)
  
          cy.get('[data-cy="notes-table-row"]')
            .should("be.visible")
            .should("contain", newContent);  
      })
    })
  })
})

/* 
Suggestion for improvement:
We could test this way if fields implemented a "required" validation.

Given the user is on the note's page
When they clear the required fields And click the submit button
Then the required fields should display an error message
And the note should not be updated
*/
