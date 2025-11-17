// Lab5/QueryParameters.js - Server Side
export default function QueryParameters(app) {
  const calculator = (req, res) => {
    const { a, b, operation } = req.query;
    let result = 0;
    
    switch (operation) {
      case "add":
        result = parseInt(a) + parseInt(b);
        break;
      case "subtract":
        result = parseInt(a) - parseInt(b);
        break;
      case "multiply":  // REQUIRED FOR RUBRIC
        result = parseInt(a) * parseInt(b);
        break;
      case "divide":    // REQUIRED FOR RUBRIC
        result = parseInt(a) / parseInt(b);
        break;
      default:
        result = "Invalid operation";
    }
    
    res.send(result.toString());
  };
  
  app.get("/lab5/calculator", calculator);
}