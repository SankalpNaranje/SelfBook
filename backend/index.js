const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000

// app.get('/', (req, res) => {
    //   res.send('Hello Sankalp !')
    // })

//setting up cors
app.use(cors(
  {
    origin: ['https://self-book-frontend.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
));
app.use(express.json())


//using the middleWare - to run the contents in the request of the body.
app.use(express.json())

app.get("/api", (req, res) => {
  res.json("Hello");
})

//Available Routes.
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.use('/api/songRoutes', require('./routes/songRoutes'));
    



app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})
  


