import { faker } from '@faker-js/faker';

describe("Feature: GET note API endpoint", () => {

  context("Given the API is available", () => {

    beforeEach(() => {
      cy.deleteAllNotes();
    })

    context("When the client makes a GET request And there are saved notes", () => {
      let id = "";

      const note = {
        title: `${faker.lorem.words(5)}`,
        content: `${faker.lorem.paragraph(2)}`
      };

      beforeEach(() => {
        cy.postNote(note)
          .then(response => {
            id = response.body._id
          })
      })

      it("Then the API should return status code 200 and a list containing all saved notes", () => {
        cy.getNotes().then((response) => {
          expect(response.status).to.be.eq(200);
          expect(response.body).to.have.lengthOf(1);
          expect(response.body[0]._id).to.be.eq(id);
          expect(response.body[0].title).to.be.eq(note.title);
          expect(response.body[0].content).to.be.eq(note.content);
        })
      })
    })

    context("When the client makes a GET request But there are no saved notes", () => {

      it("Then the API should return status code 200 and an empty list", () => {
        cy.getNotes().then((response) => {
          expect(response.status).to.be.eq(200);
          expect(response.body).to.have.lengthOf(0);
        })
      })
    })

    context("When the client makes a GET request passing the ID of an existing note", () => {
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

      it("Then the API should return status code 200 and the note's data", () => {
        cy.getNoteById(id).then((response) => {
          expect(response.status).to.be.eq(200);
          expect(response.body._id).to.be.eq(id);
          expect(response.body.title).to.be.eq(note.title);
          expect(response.body.content).to.be.eq(note.content);
        })
      })
    })
  })
})

/*
Suggestion for improvement:
We could test this way if the API was prepared to handle errors.

Given the API is available
When they make a GET request passing the ID of a non-existent note
Then the API should return status code 400 and an error message
*/