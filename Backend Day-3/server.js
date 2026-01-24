const express=require("express");
const app=express();
app.use(express.json());
const notes=[
    {
        title:"test title 1",
        description:"test description 1"
    },
    {
        title:"test title 2",
        description:"test description 2"
    }
]
app.post("/notes",(req,res)=>{
    console.log(req.body);
    notes.push(req.body);
    res.send("This note is Created");
})
app.get("/notes",(req,res)=>{
    res.send(notes);
})
app.listen(3000,()=>{
    console.log("Server is running")
});