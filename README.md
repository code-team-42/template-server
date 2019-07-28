# template-server

CT42 Server Template

## Getting Started

### Installing packages

Navigate to the working directory and install all dependencies using:

```
$ npm i
```

### Configuring to your project

In the server.js change the `'mongodb://localhost/DBName'` in

```
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/DBName', {
    useNewUrlParser: true
});
```

to match the URI of your development database.

Create a `.env` file with

```
SESSION_SECRET='Your session secret'
```

### Built With

-   [Express](https://expressjs.com/) - Web framework for Node.js

-   [Mongoose](https://mongoosejs.com/) - A MongoDB ODM

-   [Passport](http://www.passportjs.org/) - Authentication middleware for Node.js

-   [Bcrypt](https://www.npmjs.com/package/bcrypt) - A package for hashing passwords

-   [Morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for Node.js

### License

This project is licensed under the MIT License - see the LICENSE file for details
