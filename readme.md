# Notes App
This is a simple notes app that allows the user to create, read, update, and delete (CRUD) notes. The backend of this app is built using Node.js and Express, and the frontend is built with Angular. This app uses MongoDB as the database to store notes.

## Getting Started
Follow the instructions below to get started with running this app on your local machine.

## Prerequisites
Mongo

Node.js v18

Docker and docker-compose

## Installation

Clone the repository: git clone https://github.com/gutogm/notes-app.git

Change directories into the cloned repository: `cd notes-app`

## Running mongo and api with Docker Compose
Run `docker-compose up --build -d` to build the application with Docker and start all services

Move to note-web: `cd note-web`

Install the dependencies: `npm i`

Start the angular application `npm run start`

View the app in your browser by navigating to http://localhost:4200/

## Running without Docker Compose
On this step, you need mongo locally installed previously

Move into the note-api directory: `cd note-api`

Install dependencies: `npm install`

Run the Express server: `npm start` (keep this process running)

Open a new terminal window/tab and navigate to the note-web directory: `cd ../note-web`

Install dependencies: `npm install`

Start the Angular app: `ng serve` OR `npm run start` (choose one, keep this process running)

View the app in your browser by navigating to http://localhost:4200/

## Contributing
Contributions to improve the functionality or fix any issues with the app are welcome. Feel free to open an issue or submit a pull request.


