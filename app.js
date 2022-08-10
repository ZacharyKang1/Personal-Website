import express from "express";
const app = express();
import ejs from "ejs";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import * as model from "./models/student.js";

const Student = model.getStudent();
console.log(Student);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get("/", (req, res) => {
  res.send("This is a homepage.");
});

app.get("/students", async (req, res) => {
  console.log("This is the students page.");
  let data = await Student.find();
  res.render("students.ejs", { data });
});

app.get("/students/insert", (req, res) => {
  res.render("studentInsert.ejs");
});

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
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
