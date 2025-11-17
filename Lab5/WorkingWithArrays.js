// Lab5/WorkingWithArrays.js - Server Side
let todos = [
  { id: 1, title: "Task 1", completed: false, description: "First task" },
  { id: 2, title: "Task 2", completed: true, description: "Second task" },
  { id: 3, title: "Task 3", completed: false, description: "Third task" },
  { id: 4, title: "Task 4", completed: true, description: "Fourth task" },
];

export default function WorkingWithArrays(app) {
  
  // ========== READ OPERATIONS ==========
  
  // Get all todos or filter by completed status
  const getTodos = (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const completedTodos = todos.filter((t) => t.completed === completedBool);
      res.json(completedTodos);
      return;
    }
    res.json(todos);
  };

  // Get todo by ID
  const getTodoById = (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  };

  // ========== CREATE OPERATIONS ==========
  
  // Create new todo (GET method for testing)
  const createNewTodo = (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
      description: "New task description"
    };
    todos.push(newTodo);
    res.json(todos);
  };

  // Create new todo (POST method - proper RESTful)
  const postNewTodo = (req, res) => {
    const newTodo = {
      ...req.body,
      id: new Date().getTime(),
    };
    todos.push(newTodo);
    res.json(newTodo);
  };

  // ========== UPDATE OPERATIONS ==========
  
  // Update todo title using GET (for testing)
  const updateTodoTitle = (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.title = title;
      res.json(todos);
    } else {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
    }
  };

  // Update todo using PUT (proper RESTful)
  const updateTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }
    todos = todos.map((t) => {
      if (t.id === parseInt(id)) {
        return { ...t, ...req.body };
      }
      return t;
    });
    res.sendStatus(200);
  };

  // Update todo description (optional but complete)
  const updateTodoDescription = (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.description = description;
      res.json(todos);
    } else {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
    }
  };

  // Update todo completed status (optional but complete)
  const updateTodoCompleted = (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.completed = completed === "true";
      res.json(todos);
    } else {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
    }
  };

  // ========== DELETE OPERATIONS ==========
  
  // Remove todo using GET (for testing)
  const removeTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
      res.json(todos);
    } else {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
    }
  };

  // Delete todo using DELETE (proper RESTful)
  const deleteTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }
    todos.splice(todoIndex, 1);
    res.sendStatus(200);
  };

  // ========== ROUTE REGISTRATIONS ==========
  // Order matters! More specific routes should come before generic ones
  
  // CREATE routes
  app.get("/lab5/todos/create", createNewTodo);
  app.post("/lab5/todos", postNewTodo);
  
  // READ routes
  app.get("/lab5/todos", getTodos);
  app.get("/lab5/todos/:id", getTodoById);
  
  // UPDATE routes
  app.get("/lab5/todos/:id/title/:title", updateTodoTitle);
  app.get("/lab5/todos/:id/description/:description", updateTodoDescription);
  app.get("/lab5/todos/:id/completed/:completed", updateTodoCompleted);
  app.put("/lab5/todos/:id", updateTodo);
  
  // DELETE routes
  app.get("/lab5/todos/:id/delete", removeTodo);
  app.delete("/lab5/todos/:id", deleteTodo);
}