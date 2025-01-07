const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = 3000;
//middleware
app.use(express.json());

app.get("/" ,(req,res)=>{
    res.json({
        message: "server is running perfectly"
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})