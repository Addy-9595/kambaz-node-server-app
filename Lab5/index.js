import PathParameters from "./PathParameters.js";
import QueryParameters from "./QueryParameters.js";
import WorkingWithObjects from "./WorkingWithObjects.js";
import WorkingWithArrays from "./WorkingWithArrays.js";
import express from 'express';
import cors from "cors";

export default function Lab5(app) {
    app.use(cors());
    app.use(express.json());
 app.get("/lab5/welcome", (req, res) => {
  res.send("Welcome to Lab 5");
 });
 PathParameters(app);
 QueryParameters(app);
WorkingWithObjects(app);
 WorkingWithArrays(app);
}
