import express from 'express'
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import db from "./Database/index.js";
import UserRoutes from "./Users/routes.js"
import CourseRoutes from "./Courses/routes.js"
import EnrollmentRoutes from "./Enrollments/routes.js"
import ModuleRoutes from "./Modules/routes.js"
import AssignmentRoutes from './Assignments/routes.js';
import "dotenv/config";
import session from "express-session";
import cors from "cors";

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,  // Set to true in production with HTTPS
    sameSite: process.env.SERVER_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }
};

if (process.env.SERVER_ENV === "production") {
  sessionOptions.proxy = true;
  sessionOptions.cookie.secure = true;
  sessionOptions.cookie.sameSite = "none";
}

app.use(session(sessionOptions));
app.use(express.json());

// Register routes
UserRoutes(app, db);
CourseRoutes(app, db);
EnrollmentRoutes(app, db);
ModuleRoutes(app, db);
AssignmentRoutes(app, db);
Lab5(app)
Hello(app)

app.listen(process.env.PORT || 4000)
console.log(`Server is running on port ${process.env.PORT || 4000}`)