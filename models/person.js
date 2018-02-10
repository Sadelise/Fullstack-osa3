const mongoose = require('mongoose')

const url = 'mongodb://auser:moresekred@ds119258.mlab.com:19258/agile-beach-puhelinluettelo'

mongoose.connect(url)
mongoose.Promise = global.Promise

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

const formatPerson = (person) => {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

module.exports = Person