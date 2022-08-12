import express from "express";
const app = express();
import ejs from "ejs";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import * as model from "./models/student.js";
import methodOverride from "method-override";

const Student = model.getStudent();
// console.log(Student);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//connecct to the mongoDB
mongoose
  .connect("mongodb://localhost:27017/studentDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((e) => {
    console.log("Error occured.");
    console.log(e);
  });

//get all students name
app.get("/students", async (req, res) => {
  console.log("This is the students list page.");
  try {
    let data = await Student.find();
    res.send(data);
  } catch (e) {
    res.send({ message: "Error!" });
  }
});

//student personal page
app.get("/student/:id", async (req, res) => {
  let { id } = req.params;
  // console.log(req.params);
  try {
    let data = await Student.findOne({ id });
    res.send(data);
  } catch (e) {
    res.send({ message: "Error!" });
  }
});

//student insertion form
app.get("/students/insert", (req, res) => {
  res.render("studentInsert.ejs");
});
//record the form action and save information into the database
app.post("/students/insert", (req, res) => {
  console.log(req.body);
  let { id, name, age, merit, other } = req.body;
  let newStudent = new Student({
    id,
    name,
    age,
    scholarship: { merit, other },
  });
  newStudent
    .save()
    .then(() => {
      console.log("Student accepted.");
      res.render("accept.ejs");
    })
    .catch((e) => {
      console.log("Student not accepted.");
      console.log(e);
      res.render("reject.ejs");
    });
});

//update the data
app.get("/students/edit/:id", async (req, res) => {
  let { id } = req.params;
  // console.log(id);
  try {
    let data = await Student.findOne({ id });
    // console.log(data);
    if (data !== null) {
      res.render("studentEdit.ejs", { data });
    }
  } catch {
    res.send("Error!");
  }
});
//update the database
app.put("/students/edit/:id", async (req, res) => {
  let { id, name, age, merit, other } = req.body;
  console.log(req.body);
  try {
    let data = await Student.findOneAndUpdate(
      { id },
      { id, name, age, scholarship: { merit, other } },
      {
        new: true,
        runValidators: true,
      }
    );
    res.redirect(`/student/${id}`);
  } catch (e) {
    res.render("reject.ejs");
    console.log(e);
  }
});

//delete
app.delete("/students/delete/:id", (req, res) => {
  let { id } = req.params;
  Student.deleteOne({ id })
    .then((msg) => {
      console.log(msg);
      res.render("/students");
    })
    .catch((e) => {
      console.log(e);
      res.send("Delete failed.");
    });
});

//other situation, showing "not allowed"
app.get("/*", (req, res) => {
  res.status(404);
  res.send("Not allowed.");
});

//listen to the port
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
