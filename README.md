# Templat-test

Test template for CodeTeam42/Zadruga

## Table Of Contents

- [Templat-test](#templat-test)
  - [Table Of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Setup](#setup)
    - [Database](#database)
    - [Environment Variables](#environment-variables)
    - [Seed Data](#seed-data)
    - [Seed Script](#seed-script)
  - [Running the template](#running-the-template)
  - [Built With](#built-with)
  - [Authors](#authors)
  - [License](#license)

## Installation

---

In the terminal navigate to the working directory and install all dependencies:

```
$ npm install
```

## Setup

---

### Database

Create the databases if they do not already exist, then in the config/config.js change the values to match your databases:

```
development: {
    username: <username>,
    password: <password>,
    database: <dev_dbname>,
    host: '127.0.0.1',
    dialect: 'mysql'
},
local: {
  username: <username>,
  password: <password>,
  database: 'local',
  host: '127.0.0.1',
  dialect: 'mysql'
},
test: {
  username: <username>,
  password: <password>,
  database: <test_dbname>,
  host: '127.0.0.1',
  dialect: 'mysql'
},
production: {
  use_env_variable: 'JAWSDB_URL',
  dialect: 'mysql'
}
```

### Environment Variables

Create a `.env` file with

```
AUTH_SECRET='Your authentication secret'
```

### Seed Data

To add data to be seeded into your database edit the scripts/seedData.js file. Create an export using the name of the model holding the data to be seeded into the database:

```
module.exports.User = [
  {
    email: 'user@test.com',
    password: 'user',
    role: 'user'
  },
  {
    email: 'admin@test.com',
    password: 'admin',
    role: 'admin'
  }
];
```

### Seed Script

In the working directory run the seed script:

```
$ npm run seed
```

## Running the template

In the working directory run the start script:

```
$ npm start
```

## Built With

- [Express](https://expressjs.com/) - Web framework for Node.js

- [Sequelize](/https://sequelize.org) - A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server

- [React](https://react.org) - A JavaScript library for building user interfaces

- [Passport](http://www.passportjs.org/) - Authentication middleware for Node.js

- [JSONWebToken](https://www.npmjs.com/package/jsonwebtoken) - A implementation of JSON Web Tokens for Node.js

- [Bcrypt](https://www.npmjs.com/package/bcrypt) - A package for hashing passwords

- [Morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for Node.js

## Authors

- Ben Houston - _Initial Back-End Work_
- Will Houston - _Initial Front-End Work_

## License

This project is licensed under the MIT License - see the [LICENSE](./license) for details
