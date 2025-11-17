// Lab5/WorkingWithObjects.js - Server Side
const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

const module = {
  id: 1,
  name: "NodeJS Module",
  description: "Learn about NodeJS",
  course: "CS5610"
};

export default function WorkingWithObjects(app) {
  // ========== ASSIGNMENT ROUTES ==========
  
  // Get full assignment object
  const getAssignment = (req, res) => {
    res.json(assignment);
  };

  // Get assignment title
  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };

  // Update assignment title
  const setAssignmentTitle = (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  };

  // ========== MODULE ROUTES - REQUIRED FOR RUBRIC ==========
  
  // Get full module object
  const getModule = (req, res) => {
    res.json(module);
  };

  // Get module name
  const getModuleName = (req, res) => {
    res.json(module.name);
  };

  // Update module name (optional but good to have)
  const setModuleName = (req, res) => {
    const { newName } = req.params;
    module.name = newName;
    res.json(module);
  };

  // Register all routes
  app.get("/lab5/assignment", getAssignment);
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);
  
  app.get("/lab5/module", getModule);
  app.get("/lab5/module/name", getModuleName);
  app.get("/lab5/module/name/:newName", setModuleName);
}