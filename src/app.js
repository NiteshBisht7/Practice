const express = require("express");
require("./db/conn");
const Student = require("./models/students");

const app = express();
const port = process.env.PORT || 5000 ;

app.use(express.json()) ;

//create a new students 

app.post("/students", async(req,res) => {

    try{
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }
    catch(e){
        res.status(400).send(e);
    }
})


//read the data of registered students
app.get("/students", async(req,res) => {

    try{
       const studentsData =  await Student.find();
       res.send(studentsData);
    }
    catch(e)
    {
        res.send(e);

    }
})

//get the individual Student data using id
app.get("/students/:id", async (req, res) => {

    try{
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        console.log(studentData);
        if(!studentData){
            return res.status(404).send();
        }
        else{
            res.send(studentData);
        }
    }
    catch(e){
        res.send(e);
    }
})

//update the students by it id

app.patch("/students/:id", async(req,res) =>{

    try{
        const _id=req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(_id, req.body);
        res.send(updateStudents);
    }
    catch(e){
        res.status(404).send(e);
    }
})

//delete the student

app.delete("/students/:id", async(req,res) =>{

    try{ 
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
            
        }
        res.send(deleteStudent);
    }
    catch(e){
        res.status(500).send(e);
    }
})


app.listen(port, () => {
    console.log("connection is set up at ", 5000);
})