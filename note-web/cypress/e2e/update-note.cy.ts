import { faker } from '@faker-js/faker';
import { FormPage } from 'cypress/pages/form.page';
import { ListPage } from "cypress/pages/list.page";

describe('Note list page', () => {
  let formPage: FormPage;
  let listPage: ListPage;
  beforeEach(() => {
    formPage = new FormPage();
    listPage = new ListPage()
    listPage.go();
  });

  it('Edits a note', () => {
    cy.get('tbody tr:first-child .btn-warning').click();
    
    const title = faker.name.jobTitle()
    const content = faker.random.words(15);

    formPage.setTitle(title)
    formPage.setContent(content);
    formPage.clickSaveButton();

    cy.location('pathname').should('equal', '/notes');
    listPage.setSearch(title);
    cy.get('tbody tr:first-child').should(($tr) => {
      const text = $tr.text();
      expect(text).to.include(title);
    });
  });
});
