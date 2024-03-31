<p align="center">
  <a href="https://www.alphamudigital.com/" target="blank"><img src="./alpha-mu-digital-ventures_horizontal.webp" width="500" alt="Nest Logo" /></a>
</p>


<p align="center">
  <strong>Built using NestJS</strong>
  <a href="http://nestjs.com/" target="_blank"><img src="https://nestjs.com/img/logo-small.svg" width="20" alt="Nest Logo" /></a>
</p>

<p align="center">
  A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.
</p>

---
## Run the backend using Docker

| After making sure the docker daemon is running we can build the backend using the following commands:

##### Create an image named 'backend' from the Dockerfile in the current directory
```bash
$ docker build -t backend .
```
##### Create a Docker container from the image
```bash
$ docker run -d --publish 5000:5000 --name backend-container backend
```
After running the above command, the backend will be running on port 5000.

##### Check the logs of the container
```bash
$ docker logs backend-container
```

##### Stop the container
```bash
$ docker stop backend-container
```

---

## Run the backend without using Docker

| make sure the system has node and npm installed

### Using npm

#### Installation
```bash
$ npm install
```

#### Running the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

#### Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

### Using pnpm

#### Installation
```bash
$ pnpm install
```

#### Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

#### Test

```bash
# unit tests
$ pnpm run test

# test coverage
$ pnpm run test:cov
```
---
#### License

Nest is [MIT licensed](LICENSE).
