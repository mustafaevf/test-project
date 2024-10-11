const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const connection = require('./connection');
const models = require('./models/index');

const app = express();

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: 'http://localhost:3000', 
        methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    }
));
app.use('/api', routes);

connection.authenticate()
    .then(() => {
        console.log("DATABASE COOL");
        app.listen(8080, () => {
            console.log("Server started");
        });
        return connection.sync({alter: false});
    })
    .then(() => console.log("Модели норм"))
    .catch((error) => {
        console.log(error);
    });

