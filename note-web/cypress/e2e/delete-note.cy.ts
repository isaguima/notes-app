import { faker } from '@faker-js/faker';
import { FormPage } from "cypress/pages/form.page";
import { ListPage } from "cypress/pages/list.page";

describe('Note list page', () => {
  let listPage: ListPage;
  let formPage: FormPage;
  beforeEach(() => {
    listPage = new ListPage();
    formPage = new FormPage();
    formPage.go();
  });

  it('Deletes a note', () => {
    const title = faker.name.jobTitle()
    const content = faker.random.words(15);

    formPage.setTitle(title)
    formPage.setContent(content);
    formPage.clickSaveButton();

    cy.url().should('contain', '/notes');
    listPage.setSearch(title);
    listPage.clickFirstDeleteButton();
    listPage.setSearch(title);
    cy.get('tbody').should('not.contain', title);
  });
});
