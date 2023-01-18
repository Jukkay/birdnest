# Birdnest

Birdnest is a web app that visualizes drone location data from an API and lists drones violating a no drone zone.

https://birdnest-jukkay.fly.dev/

### What does it do?

Birdnest displays information about drones violating a No Drone Zone. The radar on the page shows all drones within a 500m x 500m area. The NDZ is a circle with radius of 100m at the center of the area. All the drones violating the NDZ are listed on the page with pilot information from a drone registry.

All information is fictional its fetched from [Reaktor's](https://www.reaktor.com/) APIs. The drone location information is fetched from one API, cached in the back end and delivered to the client via sockets. The pilot information for the violating drones is fetched from another API. The closest distance to the center of the NDZ is calculated and saved as well as the last time of violation. The pilot and the drone data is removed automatically 10minutes after the last violation.

The back end takes API refresh interval from response's meta data and uses it as interval for API requests. The requests are started when the first user arrives to the page and stops when the last active user leaves. 

### What is it built with?

* [React.js](https://reactjs.org/)
* [Next.js](https://nextjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Prisma](https://prisma.io)
* [Socket.io](https://socket.io/)
* [TailwindCSS](https://tailwindcss.com/)
* [Docker](https://docker.com)

The front end is built using Next.js, React, TypeScript and TailwindCSS. The back end uses Next.js' built in API functionality. The project is test driving Next 13's new app directory but server components are used in a very limited fashion due to the nature of the app. The connection between the front end and the back end happens using sockets with Socket.io. The radar is an SVG composed of React components based on live data.

### Where can I see it?

The app is deployed at:
https://birdnest-jukkay.fly.dev/

### How can I run it locally?

Prerequisites:
* [Docker](https://docker.com) must be installed
* [Make](https://www.gnu.org/software/make/) is optional but highly recommended `sudo apt-get update && sudo apt-get -y install make`

Using make:

1. Clone the dev branch of this repository `git clone -b dev git@github.com:Jukkay/birdnest.git birdnest`
2. Move to the created directory `cd birdnest`
3. Use command line `make` to start install script
4. When the script is complete, the app can be accessed at http://localhost:3000

Using docker-compose:

1. Clone the dev branch of this repository `git clone -b dev git@github.com:Jukkay/birdnest.git birdnest`
2. Use command line `docker-compose run --rm birdnest_app "npm install"` to install packages
3. Use command line `docker-compose run --rm birdnest_app "npm run build"` to build the project
4. Use command line `docker compose -f docker-compose.yml -f production.yml up -d` to start the containers detached
5. Use command line `docker-compose exec birdnest_app npx prisma migrate dev --name init` initialize Prisma
6. Use command line `docker-compose logs -f` to see the back end log (optional)
7. The app can be accessed at http://localhost:3000

### Background

Birdnest is a project made as a pre-assignment for a job application for Reaktor Developer Trainee program.

https://assignments.reaktor.com/birdnest/
