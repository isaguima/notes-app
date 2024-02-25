import { faker } from '@faker-js/faker';

describe("Feature: DELETE note API endpoint", () => {

  context("Given the API is available", () => {

    beforeEach(() => {
      cy.deleteAllNotes();
    })

    context("When the client makes a DELETE request passing the ID of an existing note", () => {
      let id = "";

      const note = {
        title: `${faker.lorem.words(5)}`,
        content: `${faker.lorem.paragraph(2)}`
      };

      beforeEach(() => {
        cy.postNote(note)
          .then(response => {
            id = response.body._id;
          })
      })

      it("Then the API should return status code 204 and delete the note", () => {
        cy.deleteNote(id).then((response) => {
          expect(response.status).to.be.eq(204);
        })

        cy.getNotes().then((response) => {
          expect(response.status).to.be.eq(200);
          expect(response.body).to.have.lengthOf(0);
        })
      })
    })

    context("When the client makes a DELETE request passing the ID of a non-existent note", () => {

      it("Then the API should return status code 400 and an error message", () => {
        cy.deleteNote(null).then((response) => {
          expect(response.status).to.be.eq(400);
          expect(response.body.error).to.contain("ID inválido");
        })
      })
    })
  })
})