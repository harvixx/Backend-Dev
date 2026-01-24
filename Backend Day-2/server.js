const express = require("express"); 
const app = express()    //express import and create instance of it. 
app.get('/', (req, res) => {
    res.send("App is Running");
})
app.get('/about', (req, res) => {
    res.send("This is About Page");
})
app.get('/home', (req, res) => {
    res.send("This is home Page");
})
app.listen(3000);