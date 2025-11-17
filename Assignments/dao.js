import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {

  // Find all assignments for a specific course
  function findAssignmentsForCourse(courseId) {
    console.log("🔍 DAO: Finding assignments for course:", courseId);
    const filtered = db.assignments.filter((assignment) => assignment.course === courseId);
    console.log("📊 DAO: Found", filtered.length, "assignments");
    return filtered;
  }

  // Find a single assignment by ID
  function findAssignmentById(assignmentId) {
    return db.assignments.find((assignment) => assignment._id === assignmentId);  // ✅ Use db.assignments
  }

  // Create a new assignment for a course
  function createAssignment(assignment) {
    console.log("💾 Creating assignment in DAO:", assignment);
    const newAssignment = { ...assignment, _id: uuidv4() };
    db.assignments = [...db.assignments, newAssignment];
    console.log("✅ DAO: Assignment added. Total assignments:", db.assignments.length);
    console.log("📋 All assignment IDs:", db.assignments.map(a => a._id));
    return newAssignment;
  }

  // Update an existing assignment
  function updateAssignment(assignmentId, assignmentUpdates) {
    db.assignments = db.assignments.map((assignment) =>
      assignment._id === assignmentId
        ? { ...assignment, ...assignmentUpdates }
        : assignment
    );
    return db.assignments.find((a) => a._id === assignmentId);
  }

  // Delete an assignment
  function deleteAssignment(assignmentId) {
    db.assignments = db.assignments.filter(
      (assignment) => assignment._id !== assignmentId
    );
  }

  return {
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}