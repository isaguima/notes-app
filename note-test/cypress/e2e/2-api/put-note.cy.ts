import { faker } from '@faker-js/faker';

describe("Feature: PUT note API endpoint", () => {

  context("Given the API is available", () => {

    beforeEach(() => {
      cy.deleteAllNotes();
    })

    context("When the client makes a PUT request passing the ID of an existing note", () => {
      let id = "";

      const note = {
        title: `${faker.lorem.words(5)}`,
        content: `${faker.lorem.paragraph(2)}`
      };

      beforeEach(() => {
        cy.postNote(note)
          .then( response => {
            id = response.body._id
          });
      })

      context("And the required fields have been filled in correctly", () => {

        it("Then the API should return status code 200 And update the note", () => {
          const editedNote = {
            title: `${faker.lorem.words(5)}`,
            content: `${faker.lorem.paragraph(2)}`
          };

          cy.putNote(id, editedNote)
            .then( response => {
              expect(response.status).to.be.eq(200);
              expect(response.body._id).to.be.eq(id);
              expect(response.body.title).to.be.eq(editedNote.title);
              expect(response.body.content).to.be.eq(editedNote.content);
            });
        })
      })
    })

    context("When the client makes a PUT request passing the ID of a non-existent note", () => {

      it("Then the API should return status code 400 And an error message", () => {
        cy.putNote(null, null)
          .then( response => {
            expect(response.status).to.be.eq(400);
            expect(response.body.error).to.contain("ID inválido");
          });
      })
    })
  })
})

/*
Suggestion for improvement:
We could test this way if fields implemented a "required" validation.

Given the API is available
When they make a PUT request passing the ID of an existing note 
And the required fields have not been filled correctly
Then the API should return status code 400 And an error message
*/
