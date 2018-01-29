const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')
morgan.token('content', function (req, res) { return JSON.stringify(req.body) })
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :content :status :res[content-length] - :response-time ms'))
app.use(express.static('build'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
    },
    {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
    },
    {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
    }
]

app.get('/api/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})
app.post('/api/persons', (req, res) => {
    const body = req.body

    if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({ error: 'name must be unique' })
    }
    if (body.name === undefined) {
        return res.status(400).json({ error: 'name missing' })
    }
    if (body.number === undefined) {
        return res.status(400).json({ error: 'number missing' })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * Math.floor(10000000))
    }
    persons = persons.concat(person)
    res.json(person)
})
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})
app.get('/api/info', (req, res) => {
    const date = new Date()
    res.send('puhelinluettelossa ' + persons.length + ' henkilön tiedot <br><br>' + date)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})