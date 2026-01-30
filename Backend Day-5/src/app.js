const express=require("express");
const app = express();
app.use(express.json());
const notes=[];
app.get("/notes",(req,res)=>{
    res.status(200).json({
        notes:notes
    })
})
app.post("/notes",(req,res)=>{
    notes.push(req.body);
    res.status(201).json({
        message:" note created successfully"
    });
})
app.delete("/notes/:i",(req,res)=>{
    delete notes[req.params.i];
    res.status(200).json({
        message:" note deleted successfully"
    });
})
app.patch("/notes/:i",(req,res)=>{
    notes[req.params.i].email=req.body.email;
    res.status(200).json({
        message:" note updated successfully"
    });
})
module.exports = app;