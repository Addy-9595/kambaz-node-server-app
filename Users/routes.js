// Kambaz/Users/routes.js
import UsersDao from "./dao.js";

export default function UserRoutes(app, db) {
  const dao = UsersDao(db);

  // Create a new user
  const createUser = (req, res) => {
    const newUser = dao.createUser(req.body);
    res.json(newUser);
  };

  // Get all users
  const findAllUsers = (req, res) => {
    const users = dao.findAllUsers();
    res.json(users);
  };

  // Get user by ID
  const findUserById = (req, res) => {
    const { userId } = req.params;
    const user = dao.findUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  };

  // Update user
  const updateUser = (req, res) => {
    const { userId } = req.params;
    const userUpdates = req.body;
    const updatedUser = dao.updateUser(userId, userUpdates);
    
    // Update session if updating current user
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = updatedUser;
    }
    
    res.json(updatedUser);
  };

  // Delete user
  const deleteUser = (req, res) => {
    const { userId } = req.params;
    dao.deleteUser(userId);
    res.sendStatus(204);
  };

  // Sign up - Create new user and start session
  const signup = (req, res) => {
    const existingUser = dao.findUserByUsername(req.body.username);
    if (existingUser) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const newUser = dao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  // Sign in - Authenticate and start session
  const signin = (req, res) => {
    const { username, password } = req.body;
    const user = dao.findUserByCredentials(username, password);
    if (user) {
      req.session["currentUser"] = user;
      res.json(user);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };

  // Get current user profile
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  // Sign out - Destroy session
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const findUsersForCourse = (req, res) => {
  const { courseId } = req.params;
  const { users, enrollments } = db;
  
  console.log("Finding users for course:", courseId);
  
  const enrolledUsers = users.filter((user) =>
    enrollments.some((enrollment) => 
      enrollment.user === user._id && enrollment.course === courseId
    )
  );

   console.log("Found users:", enrolledUsers);
  
  res.json(enrolledUsers);
};



  // Register all routes
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.get("/api/courses/:courseId/users", findUsersForCourse);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}