# SalesStore

## Table of Contents
* [About the Project and Features](#about-the-project)
* [How to download?](#how-to-download)
* [How to install?](#how-to-install)
* [Built With](#built-with)

### About the Project and Features
- The Project is a Sales Store API focused on automating customer orders.
- User and client creation required.
- Product creation and inventory.

## How to download?
- To download the project, execute the command:
```bash
// Clone the application repository
$ git clone https://github.com/viniciusperrone/SalesStore.git
```

## How to install?
1. To run the folswe, follow these steps:
- Navigate to the main folder and install the dependencies:
```bash
// Navigate to the main folder
$ cd SalesStore

// Install application dependencies
$ yarn
```
- Install Postgres, MongoDB, Redis and Adminer Docker images using docker-compose:
```bash
// Run the Docker images
$ docker-compose up -d
```
- Create a file called .env based on .env.example and enter your database credentials;
- Configure database connection with TypeORM in version 0.3 with DataSource object;
```bash
// Enter the DataSource object configuration folder
$ cd shared/infra/typeorm
```
- Run the database migrations using the command:
```bash
// Run the migrations
$ yarn typeorm -- -d src/shared/infra/typeorm/index.ts migration:run
```
- Add a no-restart configuration for each Docker image using the command:
```bash
// Change the configuration of the Docker images
$ docker update --restart=unless-stopped ID_DA_IMAGEM
```
- Start the server using the command:
```bash
// Start the server
$ yarn dev
```
## Built With
- The application's backend was developed using the following technologies:
  - [Node.js](https://nodejs.org/en/)
  - [Express](https://expressjs.com/pt-br/)
  - [Postgres](https://www.mysql.com/)
  - [TypeORM](https://www.mongodb.com/)
  - [Redis](https://redis.io/)
  - [Docker](https://reactnative.dev/)
