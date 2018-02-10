const mongoose = require('mongoose')

const url = 'mongodb://auser:moresekred@ds119258.mlab.com:19258/agile-beach-puhelinluettelo'

mongoose.connect(url)
mongoose.Promise = global.Promise

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

if (process.argv[2] && process.argv[3]) {
  const newperson = new Person({
    name: process.argv[2],
    number: process.argv[3]
  })
  newperson
    .save()
    .then(response => {
      console.log('lisätään henkilö', newperson.name, 'numero', newperson.number, 'luetteloon')
      mongoose.connection.close()
    })
} else {
  console.log('puhelinluettelo:')
  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    })
}