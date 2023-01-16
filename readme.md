# Birdnest

Birdnest is a project made as a pre-assignment for a job application for Reaktor Developer Trainee program.

https://assignments.reaktor.com/birdnest/

### What does it do?

Birdnest displays information about drones violating a No Drone Zone. The radar on the page shows all drones within a 500m x 500m area. The NDZ is a circle with radius of 100m at the center of the area. All the drones violating the NDZ are listed on the page with pilot information from a drone registry.

All information is fictional its fetched from Reaktor's APIs. The drone location information is fetched from one API, cached in the back end and delivered to the client via sockets. The pilot information for the violating drones is fetched from another API. The closest distance to the center of the NDZ is calculated and saved as well as the last time of violation.

The back end takes API refresh interval from response's meta data and uses it as interval for API requests. The requests are started when the first user arrives to the page and stops when the last active user leaves. 

### What is it built with?

* [React.js](https://reactjs.org/)
* [Next.js](https://nextjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Prisma](https://prisma.io)
* [Socket.io](https://socket.io/)
* [Docker](https://docker.com)

The front end is built using Next.js, React and TypeScript. The back end uses Next.js' built in API functionality. The project is test driving Next 13's new app directory but server components are used in a very limited fashion due to the nature of the app. The connection between the front end and the back end happens using sockets with Socket.io. The radar is an SVG composed of React components based on live data.

- Next.js/React
- TypeScript
- Socket.io
- Prisma (Postresql)
- Tailwind CSS

### How can I run it?

The app is deployed at:
https://birdnest-jukkay.fly.dev/

If you wish to run the project yourself the repository includes docker-compose and Makefile files that can be used to build and run the project. Docker is required to take advantage of these. [Make](https://linuxhint.com/make-command-linux/) is required to use make commands.

Using make:

1. Clone the repository
2. Use command line `make install` to install client
3. Use command line `make up` to build and run the project
4. Use command line `make init-db` to initialize the database connection
5. The app can be accessed at http://localhost:3000

Using docker-compose:

1. Clone the repository
2. Use command line `make install` to install client
3. Use command line `make up` to build and run the project
4. Use command line `make init-db` to initialize the database connection
5. The app can be accessed at http://localhost:3000
