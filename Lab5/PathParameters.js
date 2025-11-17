// Lab5/PathParameters.js - Server Side
export default function PathParameters(app) {
  // Addition
  const add = (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) + parseInt(b);
    res.send(sum.toString());
  };
  
  // Subtraction
  const subtract = (req, res) => {
    const { a, b } = req.params;
    const difference = parseInt(a) - parseInt(b);
    res.send(difference.toString());
  };

  // Multiplication - REQUIRED FOR RUBRIC
  const multiply = (req, res) => {
    const { a, b } = req.params;
    const product = parseInt(a) * parseInt(b);
    res.send(product.toString());
  };

  // Division - REQUIRED FOR RUBRIC
  const divide = (req, res) => {
    const { a, b } = req.params;
    const quotient = parseInt(a) / parseInt(b);
    res.send(quotient.toString());
  };

  // Register routes
  app.get("/lab5/add/:a/:b", add);
  app.get("/lab5/subtract/:a/:b", subtract);
  app.get("/lab5/multiply/:a/:b", multiply);
  app.get("/lab5/divide/:a/:b", divide);
}