import { faker } from '@faker-js/faker';

describe("Feature: POST note API endpoint", () => {

  context("Given the API is available", () => {

    beforeEach(() => {
      cy.deleteAllNotes();
    })

    context("When the client makes a POST request And the required fields have been filled in correctly", () => {

      it("Then the API should return status code 200 And create the note sucessfully", () => {
        const note = {
          title: `${faker.lorem.words(5)}`,
          content: `${faker.lorem.paragraph(2)}`
        };

        cy.postNote(note)
          .then( response => {
            expect(response.status).to.be.eq(200);
            expect(response.body.title).to.be.eq(note.title);
            expect(response.body.content).to.be.eq(note.content);
        })
      })
    })

    context("When the client makes a POST request And the required fields have not been filled in", () => {

      it("Then the API should return status code 400 And an error message", () => {
        const note = {
          title: "",
          content: ""
        };
  
        cy.postNote(note)
          .then( response => {
            expect(response.status).to.be.eq(400);
            expect(response.body.error).to.contain("Note validation failed: title: Path `title` is required., content: Path `content` is required.");
          })
        });
    })
  })
})
