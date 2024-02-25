import './commands'
import 'cypress-plugin-api'

type Note = { title: string, content: string };
type APINote = Note & { _id: string, __v: string };

declare global {
   namespace Cypress {
      interface Chainable {
         getNotes(): Chainable < Cypress.Response< Array< APINote > > >
         getNoteById(id: string): Chainable < Cypress.Response< APINote > >
         createNote(note: Note): Chainable < Cypress.Response< APINote > >
         deleteNote(id: string): Chainable < void >
         deleteAllNotes(): Chainable < void >
      }
   }
}