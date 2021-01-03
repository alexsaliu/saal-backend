const express = require('express');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');
const db = require('./db.js').dbConnection;
const controller = require('./controller.js');
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => { res.send({json: "SAAL Backend API"}) })

app.get('/data', async (req, res) => {
    const selectQuery = {
        text: 'SELECT * FROM results LIMIT 100',
    }
    db.query(selectQuery)
        .then(data => {
            res.status(200).json(data.rows);
        })
        .catch(err => {
            res.status(400).send(err);
        })
})

app.get('/athlete/:athlete', async (req, res) => {
    const { athlete } = req.params
    const selectQuery = {
        text: `SELECT date, meetings.name AS meeting, distance, round, mark, time, adj_time, position FROM results
    	JOIN athletes
    	ON results.athlete_id = athletes.id
    	JOIN events
    	ON results.event_id = events.id
    	JOIN meetings
    	ON events.meeting_id = meetings.id
    	WHERE athletes.name = $1`,
        values: [athlete]
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
