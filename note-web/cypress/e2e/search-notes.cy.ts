import { faker } from '@faker-js/faker';
import { FormPage } from 'cypress/pages/form.page';
import { ListPage } from 'cypress/pages/list.page';
describe('Testing notes page', () => {
  let formPage: FormPage;
  let listPage: ListPage;
  beforeEach(() => {
    formPage = new FormPage();
    listPage = new ListPage();
    formPage.go();
  });

  it('Searching for a note', () => {
    const title = faker.name.jobTitle()
    const content = faker.random.words(15);

    formPage.setTitle(title)
    formPage.setContent(content);
    formPage.clickSaveButton();

    listPage.setSearch(title)

    cy.get('tbody tr')
      .should('have.length.gt', 0)
      .each(($tr) => {
        cy.wrap($tr).find('td').eq(1).should('contain', title);
      });
  });
});
