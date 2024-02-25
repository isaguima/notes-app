import { faker } from '@faker-js/faker';

describe("Feature: Delete note", () => {
  
  context("Given the user is on the 'Notes' page And there is a note in the table", () => {
    let id = "";
    
    beforeEach(() => {
      cy.deleteAllNotes();

      const note = {
        title: `${faker.lorem.words(5)}`,
        content: `${faker.lorem.paragraph(2)}`
      };

      cy.postNote(note)
        .then( response => {
          id = response.body._id;
        });

      cy.visit("/notes");
    })

    context("When they click on the note's delete button", () => {

      beforeEach(() => {
        cy.intercept("DELETE", `**/notes/${id}`).as("deleteNote");

        cy.get('[data-cy="notes-table-row-delete-btn"]')
          .should("be.visible")
          .click();
      })

      it("Then the app should delete the note from the table", () => {
        cy.wait("@deleteNote")
          .then( ({ request }) => {
            expect(request.url).to.contain(id);
          });
        
        cy.get('[data-cy="notes-table-row"]')
          .should("not.exist");
      })
    })
  })
})
