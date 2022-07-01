# ts-skeleton

## _Express / Typescript boilerplate for microservices and complete RESTful APIs_

## **Development in progress...**

### Technologies

- NodeJS
- Typescript
- Express web framework
- Dependencies container
- Unit & Integration Testing
- MongoDB and MySQL

### Features

- Clean Architecture
- SOLID Principles
- Service Repository pattern
- Git commit linter
- HTTP Requests Security
- Compressed HTTP Responses
- Morgan Logger & Beautiful console messages
- Configurable environment variables
- Basic User Auth implemented

### Endpoints

- **GET /** - _Public access_
- **POST /auth/signup** - _Register a new user_
- **POST /auth/login** - _Login user and return JWT token_
- **GET /protected** - _Accesible only for logged users -sending Bearer Token in the HTTP request-_

### Development deploy

1. Install git
2. Install NodeJS and NPM
3. Install MongoDB
4. Open a terminal and run:

```
# git clone https://github.com/AntonioMartinezFernandez/mini-ts-skeleton
# cd mini-ts-skeleton
# npm install
```

5. Edit the _development.env_ file with configuration parameters
6. Open the terminal and run:

```
# npm run dev
```

### Build for production

1. Edit the _production.env_ file with configuration parameters
2. Open a terminal, go to the root folder of the project, and run:

```
# npm run build
```

3. Execute the start script:

```
# npm start
```

_Author: Antonio Martínez_
