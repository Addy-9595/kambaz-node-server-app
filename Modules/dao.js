import { v4 as uuidv4 } from "uuid";

export default function ModulesDao(db) {
  function findModulesForCourse(courseId) {
    return db.modules.filter((module) => module.course === courseId);
  }

  function createModule(module) {
    const newModule = { ...module, _id: uuidv4() };
    db.modules = [...db.modules, newModule];
    return newModule;
  }

  function updateModule(moduleId, moduleUpdates) {
    db.modules = db.modules.map((module) =>
      module._id === moduleId ? { ...module, ...moduleUpdates } : module
    );
    return db.modules.find((m) => m._id === moduleId);
  }

  function deleteModule(moduleId) {
    db.modules = db.modules.filter((module) => module._id !== moduleId);
  }

  return {
    findModulesForCourse,
    createModule,
    updateModule,
    deleteModule,
  };
}