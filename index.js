const express = require('express');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');
const db = require('./db.js').dbConnection;
const controller = require('./controller.js');
const port = process.env.PORT;

const { userJoin, getCurrentUser } = require('./helpers.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => { res.send({json: "SAAL Backend API"}) })

app.get('/data', async (req, res) => {
    const selectQuery = {
        text: 'SELECT * FROM results',
    }
    db.query(selectQuery)
        .then(data => {
            res.status(200).json(data.rows);
        })
        .catch(err => {
            res.status(400).send(err);
        })
})

/////////////////////////////////////////////////////////////////

server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
