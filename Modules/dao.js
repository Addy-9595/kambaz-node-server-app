import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function ModulesDao() {
  const findModulesForCourse = (courseId) => model.find({ course: courseId });
  const createModule = (module) => model.create({ ...module, _id: uuidv4() });
  const updateModule = (moduleId, moduleUpdates) => model.updateOne({ _id: moduleId }, { $set: moduleUpdates });
  const deleteModule = (moduleId) => model.deleteOne({ _id: moduleId });
  const findModuleById = (moduleId) => model.findById(moduleId);

  return { findModulesForCourse, createModule, updateModule, deleteModule, findModuleById };
}