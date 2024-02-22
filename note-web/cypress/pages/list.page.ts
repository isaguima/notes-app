export class ListPage {
  go() {
    cy.visit('http://localhost:4200/notes');
  }

  setSearch(value: string) {
    cy.get('input[type="text"]').clear().type(`${value}{enter}`);
    cy.wait(500);
  }

  clickFirstDeleteButton() {
    cy.get('tbody tr:first-child .btn-danger').click();
  }
}