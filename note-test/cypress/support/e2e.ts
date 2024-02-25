import './commands'
import 'cypress-plugin-api'

type Note = { title: string, content: string };
type APINote = Note & { _id: string, __v: string, error: string };

declare global {
   namespace Cypress {
      interface Chainable {
         getNotes(): Chainable < Cypress.Response< Array< APINote > > >
         getNoteById(id: string): Chainable < Cypress.Response< APINote > >
         postNote(note: Note): Chainable < Cypress.Response< APINote > >
         putNote(id: string, note: Note): Chainable < Cypress.Response< APINote > >
         deleteNote(id: string): Chainable < Cypress.Response< { error: string } > >
         deleteAllNotes(): Chainable < void >
      }
   }
}