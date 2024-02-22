export class FormPage {
  go(id = "new") {
    cy.visit('http://localhost:4200/notes/' + id);
  }

  setTitle(value: string) {
    cy.get('#title').clear().type(value);
  }

  setContent(value: string) {
    cy.get('iframe').then($iframe => {
      const $body = $iframe.contents().find('body');
      cy.wrap($body).clear().type(value);
    });
  }

  clickSaveButton() {
    cy.get('.btn-primary').click();
    cy.wait(500);
  }
}