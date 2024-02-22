NoteWeb
=========

The note-web project is the client-side of a web application that allows users to create, read, update, and delete (CRUD) notes.

This is built with Angular and communicates with the note-api back-end using HTTP requests to perform CRUD operations on the notes data

Installation
------------

First, install [Node.js](https://nodejs.org/).

Then clone repository with:

```bash
git clone https://github.com/gutogm/notes-app.git
cd notes-app/note-web
```

Install dependencies and start the server:

```bash
npm install
npm run start
```

The application will be available at `http://localhost:4200`.


## Local server

Install dependencies: `npm install`

Run `npm run start` for a dev server.

Navigate to `http://localhost:4200/`. 


## Running e2e (background)

Run `npm start` (keep this process running)

Open another process and run `npm run cy:run`

## Running e2e (headed)

Run `npm run cy:debug`

