create:
	docker-compose up -d --force-recreate birdnest_app

up:
	docker-compose up

up-production:
	docker image rm -f birdnest_app
	docker build
	docker-compose up

restart:
	docker-compose up -d

down:
	docker-compose down

clean:
	docker-compose down --remove-orphans
	docker image rm -f birdnest_app

install:
	docker-compose run --rm birdnest_app "npm install"

goto-app:
	docker-compose exec birdnest_app bash

logs:
	docker-compose logs -f
