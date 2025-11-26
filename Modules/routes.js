import ModulesDao from "./dao.js";

export default function ModuleRoutes(app) {
  const dao = ModulesDao();

  const findModulesForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const modules = await dao.findModulesForCourse(courseId);
      res.json(modules);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const createModule = async (req, res) => {
    try {
      const { courseId } = req.params;
      const newModule = { ...req.body, course: courseId };
      const module = await dao.createModule(newModule);
      res.json(module);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateModule = async (req, res) => {
    try {
      const { moduleId } = req.params;
      const status = await dao.updateModule(moduleId, req.body);
      res.json(status);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const deleteModule = async (req, res) => {
    try {
      const { moduleId } = req.params;
      await dao.deleteModule(moduleId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModule);
  app.put("/api/modules/:moduleId", updateModule);
  app.delete("/api/modules/:moduleId", deleteModule);
}