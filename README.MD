# MKS Backend Challenge

This challenge was proposed for a backend developer position, where a simple CRUD should be created, using Typescript, Nest.Js, Swagger and TypeORM.

Access the application requirements **[here](hhttps://github.com/robsoncezario/mks-backend-challenge/blob/main/README.md)** (pt-BR).

## Stacks used

- Node.Js
- Typescript
- Docker, docker-compose
- NestJs
- TypeORM (PostgreSQL)

## Running the project

To run the project, follow the next steps:

- Clone the repository and browse to it:
```bash
  git clone https://github.com/Torr7s/mks-backend-challenge.git

  cd mks-backend-challenge
```

- Install the dependencies
```bash
npm install 

yarn
```

- Setup environment variables
```bash
TYPEORM_USERNAME

TYPEORM_DATABASE

TYPEORM_PASSWORD
```

- Build Dockerfile image
```bash
docker build -t mks .
```

- Run Docker containers
```bash
docker-compose up -d
```

## Api Documentation

Once the application is set up, you will be able to access OpenSwagger documentation, all you have to do is browse to **[http://localhost:8080/api](http://localhost:8080/api)**.

#### **Book Creation**

```http
  POST /api/books
```

| **Body**   | **Type** | **Description**   | **Required** |
| :--------- | :------- | :---------------- | :----------- |
| `name`     | `string` | Book name     | ✅           |
| `author`    | `string` | Book email    | ✅           |
| `pages` | `number` | Book pages | ✅           |
| `url` | `string` | Book password | ✅           |


#### **Book Listing**

```http
  GET /api/books/
```


#### **Book Finding**

```http
  GET /api/books/{id}
```

| **Param** | **Type** | **Description** |
| :-------- | :------- | :-------------- | 
| `id`      | `string` | Book id         |


#### **Book Updating**

```http
  PUT /api/books/
```

| **Body**   | **Type** | **Description**   | **Required** |
| :--------- | :------- | :---------------- | :----------- |
| `id`     | `string` | Book id     |            |
| `name`     | `string` | Book name     |            |
| `author`    | `string` | Book email    |            |
| `pages` | `number` | Book pages |         |
| `url` | `string` | Book password |            |


#### **Book Deletion**

```http
  DELETE /api/books/{id}
```

| **Param** | **Type** | **Description** |
| :-------- | :------- | :-------------- | 
| `id`      | `string` | Book id         |