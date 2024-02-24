import { faker } from '@faker-js/faker';

describe("Feature: Update note", () => {
  
  context("Given the user is on the 'Notes' page And there is a note in the table", () => {
    let id = "";
    
    const note = {
        title: `${faker.lorem.words(5)}`,
        content: `${faker.lorem.paragraph(2)}`
    }

    beforeEach(() => {
      cy.deleteAllNotes();

      cy.createNote(note)
        .then(response => {
            id = response.body._id;
        })

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
          .should("be.visible")
          .then(iframe => {
            const body = iframe.contents().find("body");
            cy.wrap(body).should("contain", note.content);
        })
      })
    })
  })
})

/* 
TO DO:
Given the user is on the note's page
When they edit the title field And click the submit button
Then the app should update the note and display the updated note on the 'Notes' page

Given the user is on the note's page
When they edit the content field And click the submit button
Then the app should update the note and display the updated note on the 'Notes' page
*/

/* 
Suggestion for improvement:
We could test this way if fields implemented a "required" validation.

Given the user is on the note's page
When they clear the required fields And click the submit button
Then the required fields should display an error message
And the note should not be updated
*/
