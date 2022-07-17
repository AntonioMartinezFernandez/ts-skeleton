# ts-skeleton

## _Express / Typescript boilerplate for microservices and complete RESTful APIs_

### **Development in progress...**

## Description

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
- Service Repository Pattern
- Git commit linter
- HTTP Requests Security
- Body Requests validation with JSONSchema
- Compressed HTTP Responses
- Logger
- Configurable environment variables
- JWT Authentication
- Easy to use

### Endpoints

- **GET /user** - _Public access_
- **POST /user/signup** - _Register a new user_
- **POST /user/login** - _Login user and return JWT token_
- **PUT /user/profile** - _Update user profile. Accesible only for logged users -sending Bearer Token in the HTTP request-_
- **GET /user/profile** - _Return user profile. Accesible only for logged users -sending Bearer Token in the HTTP request-_
- **DELETE /user** - _Delete user. Accesible only for logged users -sending Bearer Token in the HTTP request-_

### Run linter

```
# npm run lint
```

### Run tests

1. Edit the _development.env_ file with correct MongoDB parameters
2. Open a terminal and run:

```
# npm run test
```

### Development

1. Navigate to https://github.com/AntonioMartinezFernandez/ts-skeleton and click on 'Use this template'
2. Install git
3. Install NodeJS and NPM
4. Install MongoDB
5. Open a terminal and run:

```
# git clone https://github.com/yourUser/yourRepoName
# cd mini-ts-skeleton
# npm install
```

6. Edit the _development.env_ file with configuration parameters
7. Be sure that your MongoDB server is running
8. Open the terminal and run:

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

### Build with Docker

1. Install Docker
2. Open a terminal, go to the root folder of the project, and run:

```
# docker compose up
```

_Author: Antonio Martínez_
