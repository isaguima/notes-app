import { faker } from '@faker-js/faker';
import { FormPage } from "cypress/pages/form.page";
import { ListPage } from "cypress/pages/list.page";

describe('Testing note form', () => {
  let formPage: FormPage;
  let listPage: ListPage;
  beforeEach(() => {
    formPage = new FormPage();
    listPage = new ListPage();
    formPage.go();
  });
  it('Filling up fields and saving a new note', () => {
    const title = faker.name.jobTitle()
    const content = faker.random.words(15);

    formPage.setTitle(title)
    formPage.setContent(content);
    formPage.clickSaveButton();

    cy.url().should('contain', '/notes');
    listPage.setSearch(`${title}`);
    cy.get('tbody tr')
      .should('have.length.gt', 0)
      .each(($tr) => {
        cy.wrap($tr).find('td').should('contain', title);
      });
  });

  afterEach(() => {
    listPage.clickFirstDeleteButton();
  })
});
