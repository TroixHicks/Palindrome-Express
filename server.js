
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

let db, collection;


const url = 'mongodb+srv://troi:Troiana123@cluster0.lyfc9.mongodb.net/star-wars?retryWrites=true&w=majority'
const dbName = "star-wars";


app.listen(4000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        const dbName = "star-wars";
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('words').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {word: result})
  })
})

app.post('/words', (req, res) => {
  
  let userword = req.body.word
  let checkPalindrome = req.body.word
  let result = checkPalindrome ? "is a palindrome" : "is not a palindrome"
  if(userword === ""){
    result = "enter a word"
  }
  db.collection('words').insertOne({
    word: req.body.word,
    palindrome: result

    }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})










