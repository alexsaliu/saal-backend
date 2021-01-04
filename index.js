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

app.get('/results', async (req, res) => {
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

app.get('/data', async (req, res) => {

    const getTableRows = (table) => {
        return {text: `SELECT * FROM ${table}`}
    }

    const athletes = await db.query(getTableRows('athletes'))
    const meetings = await db.query(getTableRows('meetings'))
    const events = await db.query(getTableRows('events'))

    const data = {
        athletes: athletes.rows,
        meetings: meetings.rows,
        events: events.rows
    }

    res.status(200).json(data)
})

app.get('/athlete', async (req, res) => {
    const { athlete, distance, meeting, year } = req.query

    const whereQuery = () => {
        let q = ''
        if (meeting && athlete || meeting && distance) q = 'AND '
        if (athlete) {
            q += `athletes.name = '${athlete}'`
            if (distance) q += ' AND '
        }
        if (distance) q += `events.distance = '${distance}'`
        return q
    }

    const selectQuery = `SELECT date, meetings.name AS meeting, distance, round, mark, time, adj_time, position, zscore, zscore_1u1d FROM results
    	JOIN athletes
    	ON results.athlete_id = athletes.id
    	JOIN events
    	ON results.event_id = events.id
    	JOIN meetings
    	ON events.meeting_id = meetings.id `

    const Q1 = {
        text: selectQuery + `WHERE meetings.name LIKE '%' || $1 || '%' ${whereQuery()}`,
        values: [meeting]
    }

    const Q2 = {
        text: selectQuery + `WHERE ${whereQuery()}`,
    }

    const Q = meeting ? Q1 : Q2

    db.query(Q)
        .then(data => {
            console.log(data);
            res.status(200).send(data.rows);
        })
        .catch(err => {
            res.status(400).send(err);
        })
})

/////////////////////////////////////////////////////////////////

server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
