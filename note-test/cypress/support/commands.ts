/// <reference types="cypress" />

const API_URL = "http://localhost:3000/notes";

Cypress.Commands.add('getNotes', () => {
    return cy.api({
        method: 'GET',
        url: API_URL,
    })
})

Cypress.Commands.add('getNoteById', (id) => {
    return cy.api({
        method: 'GET',
        url: `${API_URL}/${id}`,
    })
})

Cypress.Commands.add('deleteNote', (id) => {
    cy.request({
        method: 'DELETE',
        url: `${API_URL}/${id}`,
    })
})

Cypress.Commands.add('deleteAllNotes', () => {
    cy.getNotes().then( response => {
        response.body.forEach((note) => {
            cy.deleteNote(note._id);
        })
    })
})

Cypress.Commands.add('createNote', (note) => {
    cy.request({
        method: 'POST',
        url: API_URL,
        body: note
    })
})
