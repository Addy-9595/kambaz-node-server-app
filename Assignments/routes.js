import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  const dao = AssignmentsDao();

  const findAssignmentsForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignments = await dao.findAssignmentsForCourse(courseId);
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const findAssignmentById = async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const assignment = await dao.findAssignmentById(assignmentId);
      if (assignment) {
        res.json(assignment);
      } else {
        res.status(404).json({ message: "Assignment not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const createAssignment = async (req, res) => {
    try {
      const { courseId } = req.params;
      const newAssignment = { ...req.body, course: courseId };
      const assignment = await dao.createAssignment(newAssignment);
      res.json(assignment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateAssignment = async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const status = await dao.updateAssignment(assignmentId, req.body);
      res.json(status);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const deleteAssignment = async (req, res) => {
    try {
      const { assignmentId } = req.params;
      await dao.deleteAssignment(assignmentId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.get("/api/assignments/:assignmentId", findAssignmentById);
  app.post("/api/courses/:courseId/assignments", createAssignment);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}