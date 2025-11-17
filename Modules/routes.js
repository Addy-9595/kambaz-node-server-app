import ModulesDao from "./dao.js";

export default function ModuleRoutes(app, db) {
  const dao = ModulesDao(db);

  const findModulesForCourse = (req, res) => {
    const { courseId } = req.params;
    const modules = dao.findModulesForCourse(courseId);
    res.json(modules);
  };

  const createModule = (req, res) => {
    const { courseId } = req.params;
    const newModule = { ...req.body, course: courseId };
    const module = dao.createModule(newModule);
    res.json(module);
  };

  const updateModule = (req, res) => {
    const { moduleId } = req.params;
    const status = dao.updateModule(moduleId, req.body);
    res.json(status);
  };

  const deleteModule = (req, res) => {
    const { moduleId } = req.params;
    dao.deleteModule(moduleId);
    res.sendStatus(204);
  };

  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModule);
  app.put("/api/modules/:moduleId", updateModule);
  app.delete("/api/modules/:moduleId", deleteModule);
}