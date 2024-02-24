## Local server

Run `docker-compose up --build -d` to build the application with Docker and start all services
Move to note-web: `cd note-web`
Install dependencies: `npm install`
Start the angular application: `npm run start`
Access the app: visit http://localhost:4200/


## Running e2e test (headless)

Run the local server, as explained above
Move to note-test: `cd note-test`
Open another process and run `npm run cy:run`
