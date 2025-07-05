const mongoose = require('mongoose')

if (process.argv.length < 3){
  console.log('give password as argument')
}

const password = process.argv[2]

// const url = `mongodb+srv://yusufbadr:${password}@cluster0.lubp1jj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const url = `mongodb://yusufbadr:${password}@ac-qkdclhr-shard-00-02.lubp1jj.mongodb.net:27017,ac-qkdclhr-shard-00-01.lubp1jj.mongodb.net:27017,ac-qkdclhr-shard-00-00.lubp1jj.mongodb.net:27017/phonebookApp?authSource=admin&replicaSet=atlas-gha0t1-shard-0&tls=true`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length <= 3){
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length <= 5){

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })


} else {
  console.log('invalid number of arguments')
  mongoose.connection.close()

}




