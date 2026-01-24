// App.js server create karta hai.
//or server ko config karna .

const { json } = require("body-parser");
const express = require("express");
const app = express();
app.use(express.json());
const notes = [{
    name: "Haish",
    email: "harish@gmail.com"
},
{
    name: "Jagdish",
    email: "jagga@gmail.com"
}];
app.get("/", (req, res) => {
    res.send("Hello world")
});
app.post("/notes", (req, res) => {
    notes.push(req.body);
    res.send("note is created")
    console.log(notes);
});
app.get("/notes", (req, res) => {
    res.send(notes);
});
app.delete("/notes/:id", (req, res) => {
    delete notes[req.params.id];
    res.send("Note is Deleted")
})
app.patch("/notes/:id", (req, res) => {
    notes[req.params.id].email = req.body.email;
    res.send("Note is modified")
})
module.exports = app;