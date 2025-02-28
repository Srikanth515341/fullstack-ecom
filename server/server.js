const express = require('express');
const cors = require('cors');
const pool = require('./database'); // Import database connection
require('dotenv').config();

const { createUserTable } = require('./models/User');
const { createProductTable } = require('./models/Product');
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const productRoutes = require('./routes/productRoutes'); // Import product routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test API route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Authentication Routes
app.use('/api/auth', authRoutes);

// Product Routes
app.use('/api/products', productRoutes);

// Test Database Connection
pool.connect()
    .then(() => console.log('✅ Connected to PostgreSQL'))
    .catch(err => console.error('❌ Database connection error:', err));

// Initialize database tables
const initDB = async () => {
    try {
        await createUserTable();
        await createProductTable();
        console.log('✅ Database tables are set up');
    } catch (error) {
        console.error('❌ Error initializing database:', error);
    }
};

initDB();

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
