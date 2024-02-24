import { NumberSymbol } from '@angular/common'
import './commands'

declare global {
   namespace Cypress {
      interface Chainable {
         getNotes(): Chainable < Cypress.Response<Array<{_id: string, title: string, content: string, __v: number}>>>
         createNote(note: {title: string, content: string}): Chainable < Cypress.Response<{_id: string, title: string, content: string, __v: number} >>
         deleteNote(id: string): Chainable < void >
         deleteAllNotes(): Chainable < void >
      }
   }
}