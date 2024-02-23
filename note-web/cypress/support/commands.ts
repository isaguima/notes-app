/// <reference types="cypress" />

Cypress.Commands.add('deleteAllNotes', () => {
    cy.getNotes().then( response => {
        response.body.forEach((note) => {
            cy.deleteNote(note._id);
        })
    })
})

Cypress.Commands.add('getNotes', () => {
    return cy.request({
        method: 'GET',
        url: 'http://localhost:3000/notes',
    })
})

Cypress.Commands.add('deleteNote', (id) => {
    cy.request({
        method: 'DELETE',
        url: `http://localhost:3000/notes/${id}`,
    })
})