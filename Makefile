create:
	docker-compose up -d --force-recreate birdnest_app

up:
	docker-compose up

restart:
	docker-compose up -d

down:
	docker-compose down

clean:
	docker-compose down --remove-orphans
	rm -rf .next

install:
	docker-compose run --rm birdnest_app "npm install"

goto-app:
	docker-compose exec birdnest_app bash

init-db:
	docker-compose exec birdnest_app npx prisma migrate dev --name init

logs:
	docker-compose logs -f

build:
	docker-compose run --rm birdnest_app "npm run build"

birdnest: install build up-production-detached init-db logs

up-production-detached:
	docker compose -f docker-compose.yml -f production.yml up -d