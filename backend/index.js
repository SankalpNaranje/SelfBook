const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();
const app = express();
const port = process.env.PORT || 5000;

// Setup CORS
app.use(cors({
    origin: 'https://self-book-frontend.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Middleware to parse JSON
app.use(express.json());

// Default route
app.get('/api', (req, res) => {
    res.json("Hello");
});

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/songRoutes', require('./routes/songRoutes'));

app.listen(port, () => {
    console.log(`iNotebook backend listening at http://localhost:${port}`);
});
