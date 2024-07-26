const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connectDb = require('./config/dbConnection');
require('dotenv').config();

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
const static_path = path.join(__dirname, 'public');
app.use(express.static(static_path));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDb();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', require('./routes/userRoutes'));

app.listen(2000, () => {
    console.log('Server is running on port 2000');
});
