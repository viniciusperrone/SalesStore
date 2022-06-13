# SalesStore

## Table of Contents
* [About the Project](#about-the-project)
* [How to download?](#how-to-download)
* [How to install?](#how-to-install)
* [Built With](#built-with)

### About the Project
- Inventory with all the food the user has in the kitchen, divided into several categories.
- Registration of food manually according to several attributes (optional) - quantity, brand, validity, etc.
- Consultation of recipes.
- Publication of recipes.
- Possible and not possible recipes based on the availability of ingredients from the user's inventory.
- User-defined favorite recipes.
- Recipes filtered by categories (favorites, low calorie, vegetarian, etc).

## How to download?
- To download the project, execute the command:
```bash
// Clone the application repository
$ git clone https://github.com/viniciusperrone/SalesStore.git
```

## How to install?
1. To run the backend, follow these steps:
- Navigate to the backend folder and install the dependencies:
```bash
// Navigate to the backend folder
$ cd backend

// Install application dependencies
$ yarn
```
- Install MySQL, MongoDB, Redis and Adminer Docker images using docker-compose:
```bash
// Run the Docker images
$ docker-compose up -d
```
- Create a file called .env based on .env.example and enter your AWS credentials;
- Create a file called .ormconfig.json based on .ormconfig.example.json and insert the MySQL and MongoDB host and port according to the previously installed Docker images, in addition to exchanging the src recipient for dist and .ts for .js;
- Configure the credentials of the MySQL Docker image using the following commands:
```bash
// Enter the MySQL image bash
$ docker exec -it IMAGE_NAME bash
// Enter the MySQL image root
$ mysql -u root -p
// Change the password
$ ALTER USER root IDENTIFIED WITH mysql_native_password BY ‘ROOT_USER_PASSWORD’;
```
- Run the database migrations using the command:
```bash
// Run the migrations
$ node_modules/.bin/typeorm migration:run
```
- Add a no-restart configuration for each Docker image using the command:
```bash
// Change the configuration of the Docker images
$ docker update --restart=unless-stopped ID_DA_IMAGEM
```
- Start the server using the command:
```bash
// Start the server
$ yarn dev:server
```
## Built With
- The application's backend was developed using the following technologies:
  - [Node.js](https://nodejs.org/en/)
  - [Express](https://expressjs.com/pt-br/)
  - [Postgres](https://www.mysql.com/)
  - [TypeORM](https://www.mongodb.com/)
  - [Redis](https://redis.io/)
  - [Docker](https://reactnative.dev/)
