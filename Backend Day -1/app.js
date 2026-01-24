const express = require('express');
const app = express();

// route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// server start
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
