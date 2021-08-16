const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
app.use(express.static("public"))

let noteData =[];

app.get("/api/notes",(err,res) =>{
    try{
        noteData = fs.readFileSync("db/db.json", "utf8");
  
    console.log("Data from server!");
    noteData = JSON.parse(noteData);
} catch (err){
    console.log(err);
}
    res.json(noteData);
});

app.post("api/notes", (req,res) =>{
    try{
        noteData = fs.readFileSync("db/db.json", "utf8");
   console.log("noteData");
   noteData = JSON.parse(noteData);
   
   req.body.id = noteData.length;
 // Data goes to db.json.
 noteData.push(req.body);
 noteData = JSON.stringify(noteData);
 fs.writeFile("db/db.json", noteData, "utf8",  (err) => {
     if (err) throw err;
          
 });
 
 res.json(JSON.parse(noteData))

} catch (err) {
    console.log("\n error (catch err app.get):");
    console.log(err);
}
});


app.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/notes.html"))
})
app.get("*",(req,res)=>{
res.sendFile(path.join(__dirname,"/public/index.html"))
})

app.get("/api/notes",(req,res)=>{
    return res.sendFile(path.json(__dirname,"db/db.json"))
    });

app.listen(3000,()=>{
    console.log("server is running");
});