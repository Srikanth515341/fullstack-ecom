const express = require('express');
const cors = require('cors');
const pool = require('./database'); // Import database connection
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test API route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Test Database Connection
pool.connect()
    .then(() => console.log('✅ Connected to PostgreSQL'))
    .catch(err => console.error('❌ Database connection error:', err));

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
