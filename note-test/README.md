# Project Setup

## 1. Build and start services with Docker

In the root folder, run the following command to build the application using Docker and start all services: `docker-compose up --build -d` 

## 2. Set up Angular application

Move to the 'note-web' directory: `cd note-web`

Install dependencies: `npm install`

Start the Angular application: `npm run start` (keep this process running)

## 3. Run tests

Open another terminal, move to the 'note-test' directory: `cd note-test`

Run the tests: `npm run cy:run`
