const express = require('express');
require('dotenv').config();
const cors = require('cors');

const connection = require('./config/db');
const userRoute = require('./routes/users.route');
const notesRoute = require('./routes/notes.route')
const authenticator = require('./middlewares/authenticator');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/user', userRoute);
app.use('/notes', authenticator, notesRoute);

app.get('/', (req, res) => {
    res.send('Welcome to the Homepage');
});

app.listen(8080, async (req, res) => {
    try {
        await connection;
        console.log('Connected to DB');
    }
    catch (err) {
        console.log(err);
    }
    console.log(`Listening...`);
});