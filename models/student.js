//create data for Mongoose studentDB
import mongoose from "mongoose";
export function getStudent() {
  const studentSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: 18,
      max: [80, "Too old for school"],
    },
    scholarship: {
      merit: {
        type: Number,
        min: 0,
        max: [5000, "Too much merit scholarship"],
      },
      other: {
        type: Number,
        min: 0,
      },
    },
  });
  //this is a DB named "students"
  const Student = mongoose.model("Student", studentSchema);
  return Student;
}
