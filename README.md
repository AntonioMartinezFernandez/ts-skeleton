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

### Development deploy

0. Navigate to https://github.com/AntonioMartinezFernandez/ts-skeleton and click on 'Use this template'
1. Install git
2. Install NodeJS and NPM
3. Install MongoDB
4. Open a terminal and run:

```
# git clone https://github.com/yourUser/yourRepoName
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
