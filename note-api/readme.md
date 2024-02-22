Notes API
=========

This is the backend server for a notes app.

Installation
------------

1.  First, ensure that [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) are installed in your machine.
2.  Clone this repository with:

```bash
$ git clone https://github.com/gutogm/notes-app.git
$ cd notes-app/note-api
```

3.  Install dependencies using this command:
    
    ```bash
    $ npm install
    ```
    
4.  Start the server:
    
    ```bash
    $ npm run start
    ```
    
5.  The API will be available at `http://localhost:3000`.
    

Endpoints
---------

### GET /notes

Retreives all notes.

#### Query Parameters

Parameter

Type

Description

title

string

Used to filter titles.

skip

integer

Number of items to skip

limit

integer

Size of returned items

#### Example Request

```json
GET http://localhost:3000/notes
```

#### Example Response

```json
[
  {
    "_id": "5fc291cc306247c797afb2af",
    "title": "Test note",
    "content": "Content of a test note",
  }
]
```

### GET /notes/:id

Retrieves a single note based on its ID.

#### Example Request

```json
GET http://localhost:3000/notes/5fc291cc306247c797afb2af
```

#### Example Response

```json
{
  "_id": "5fc291cc306247c797afb2af",
  "title": "Test note",
  "content": "Content of a test note",
}
```

### POST /notes

Creates a new note with the supplied information.

#### Example Request

```json
POST http://localhost:3000/notes

{
  "title": "New note",
  "content": "Content of the new note"
}
```

#### Example Response

```json
{
  "_id": "5fc291cc306247c797afb2af",
  "title": "New note",
  "content": "Content of the new note",
}
```

### PUT /notes/:id

Updates an existing note with the supplied information.

#### Example Request

```json
PUT http://localhost:3000/notes/5fc291cc306247c797afb2af

{
  "title": "Updated note",
  "content": "Content of the updated note"
}
```

#### Example Response

```json
{
  "_id": "5fc291cc306247c797afb2af",
  "title": "Updated note",
  "content": "Content of the updated note",
}
```

### DELETE /notes/:id

Deletes an existing note with the supplied ID.

#### Example Request

```json
DELETE http://localhost:3000/notes/5fc291cc306247c797afb2af
```

#### Example Response

```json
{
  "_id": "5fc291cc306247c797afb2af",
  "title": "Test note",
  "content": "Content of a test note",
}
```

Running the Tests
-----------------

To run tests, run:

```bash
npm run test
```

To measure the code coverage, run:

```bash
npm run coverage
```