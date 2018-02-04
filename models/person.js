const mongoose = require('mongoose')

const url = 'mongodb://auser:moresekred@ds119258.mlab.com:19258/agile-beach-puhelinluettelo'

mongoose.connect(url)
mongoose.Promise = global.Promise;

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

module.exports = Person