import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);

  // Get all assignments for a course
  const findAssignmentsForCourse = (req, res) => {
  const { courseId } = req.params;
  console.log("🔍 Finding assignments for course:", courseId);  // ✅ Add
  const assignments = dao.findAssignmentsForCourse(courseId);
  console.log("📤 Returning assignments:", assignments.length, "items");  // ✅ Add
  console.log("📝 Assignment IDs:", assignments.map(a => a._id));  // ✅ Add
  res.json(assignments);
};

  // Get a single assignment by ID
  const findAssignmentById = (req, res) => {
    const { assignmentId } = req.params;
    const assignment = dao.findAssignmentById(assignmentId);
    if (assignment) {
      res.json(assignment);
    } else {
      res.status(404).json({ message: "Assignment not found" });
    }
  };

  // Create a new assignment for a course
  const createAssignment = (req, res) => {
  console.log("📥 Received assignment creation request");  // ✅ Add this
  console.log("📥 Course ID:", req.params.courseId);       // ✅ Add this
  console.log("📥 Request body:", req.body);               // ✅ Add this
  
  const { courseId } = req.params;
  const newAssignment = {
    ...req.body,
    course: courseId,
  };
  
  console.log("📝 Creating assignment:", newAssignment);   // ✅ Add this
  
  const assignment = dao.createAssignment(newAssignment);
  
  console.log("✅ Assignment created:", assignment);       // ✅ Add this
  
  res.json(assignment);
};

  // Update an assignment
  const updateAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const status = dao.updateAssignment(assignmentId, req.body);
    res.json(status);
  };

  // Delete an assignment
  const deleteAssignment = (req, res) => {
    const { assignmentId } = req.params;
    dao.deleteAssignment(assignmentId);
    res.sendStatus(204);
  };

  // Register routes
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.get("/api/assignments/:assignmentId", findAssignmentById);
  app.post("/api/courses/:courseId/assignments", createAssignment);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}