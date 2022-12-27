# Birdnest

Birdnest is a project made as a pre-assignment for a job application for Reaktor Developer Trainee program.

https://assignments.reaktor.com/birdnest/

### What does it do?


### What is it built with?

Frontend is built using Next.js, React and TypeScript. Backend is written in Golang and it uses OpenCV's laplacian function. Connection between frontend and backend is implemented using Go's built in http server and API requests.

- React
- TypeScript
- Next.js
- Tailwind CSS / Daisy UI

### How can I run it?

Repository includes docker-compose and Makefile files that can be used to build and run the project. Docker is required to take advantage of these.

1. Clone the repository
2. Use command line `make install` to install client
3. Use command line `make up` to build and run the project
4. The app can be accessed at http://localhost:3000
