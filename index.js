const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')
morgan.token('content', function (req, res) { return JSON.stringify(req.body) })
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :content :status :res[content-length] - :response-time ms'))
app.use(express.static('build'))

// let persons = [
//     {
//         "name": "Arto Hellas",
//         "number": "040-123456",
//         "id": 1
//     },
//     {
//         "name": "Martti Tienari",
//         "number": "040-123456",
//         "id": 2
//     },
//     {
//         "name": "Arto Järvinen",
//         "number": "040-123456",
//         "id": 3
//     },
//     {
//         "name": "Lea Kutvonen",
//         "number": "040-123456",
//         "id": 4
//     }
// ]

const formatPerson = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}

app.get('/api/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(persons => {
            res.json(persons.map(formatPerson))
        })
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    Person
        .find({})
        .then(persons => {
            if (persons.find(person => person.name === body.name)) {
                return res.status(400).json({ error: 'name must be unique' })
            }
        })
    if (body.name === undefined) {
        return res.status(400).json({ error: 'name missing' })
    } else if (body.number === undefined) {
        return res.status(400).json({ error: 'number missing' })
    } else {
        const person = new Person({
            name: body.name,
            number: body.number,
        })

        person
            .save()
            .then(newperson => {
                res.json(formatPerson(newperson))
            })
    }
})

app.get('/api/persons/:id', (req, res) => {
    Person
        .findById(req.params.id)
        .then(person => {
            res.json(formatPerson(person))
        })
})

app.delete('/api/persons/:id', (req, res) => {
    Person
        .findByIdAndRemove(req.params.id)
        .then(res.status(204).end())
})

app.get('/api/info', (req, res) => {
    const date = new Date()
    Person
        .find({})
        .then(persons => {
            res.send('puhelinluettelossa ' + persons.length + ' henkilön tiedot <br><br>' + date)
        })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})