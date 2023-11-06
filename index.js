const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const jsonParser = bodyParser.json()
const {Book} = require('./models')

app.use('/css',express.static(__dirname+'/css'))
app.use('/js',express.static(__dirname+'/js'))
app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the tem

// VIIEWS
app.get('/beranda',async (req, res) =>{
    const resp = await fetch('http://127.0.0.1:7070/api/books')
    const data = await resp.json()
    console.log(data)
    res.render('beranda',{ books : data})
})


// CREATE
app.post('/api/books', jsonParser,async (req,res)=>{
    try {
        const dataBook = await Book.create({
            title : req.body.title,
            author : req.body.author,
            summary : req.body.summary,
            publisher : req.body.publisher
        });
        res.status(201).send(dataBook)
    } catch (error) {
        res.status(422).send("tdk bisa creatae data")
    }
})
// READ
app.get('/api/books',jsonParser,async(req,res)=>{
    const dataBook = await Book.findAll()
    res.send(dataBook)
})

// UPDATE
app.put('/api/books/:id',jsonParser,async(req,res) => {
    try {
        const dataBook = await Book.findByPk(req.params.id)
        dataBook.title = req.body.title
        dataBook.author = req.body.author
        dataBook.summary = req.body.summary
        dataBook.publisher = req.body.publisher
        await dataBook.save()
        res.status(202).send(dataBook)
    } catch (error) {
        res. status(422).send('tidak teririm')
    }
})
// DELETE
app.delete('/api/books/:id',jsonParser,async(req,res) => {
    try {
        const dataBook = await Book.findByPk(req.params.id)
        dataBook.destroy()
        res.status(202).send(dataBook)
    } catch (error) {
        res. status(422).send('tidak teririm')
    }  
    }

)
app.listen(7070, (req,res) => {
    console.log("server sedang running")
});