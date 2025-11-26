import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function CoursesDao() {
  const findAllCourses = () => model.find();
  const createCourse = (course) => model.create({ ...course, _id: uuidv4() });
  const updateCourse = (courseId, courseUpdates) => model.updateOne({ _id: courseId }, { $set: courseUpdates });
  const deleteCourse = (courseId) => model.deleteOne({ _id: courseId });
  const findCourseById = (courseId) => model.findById(courseId);
  const findCourseByNumber = (number) => model.findOne({ number });

  return { findAllCourses, createCourse, updateCourse, deleteCourse, findCourseById, findCourseByNumber };
}