const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const connection = require('./connection');
const models = require('./models/index');
require('dotenv').config();

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
        app.listen(process.env.PORT, () => {
            console.log("Server started");
        });
        return connection.sync({alter: false});
    })
    .then(() => console.log("Модели"))
    .catch((error) => {
        console.log(error);
    });

