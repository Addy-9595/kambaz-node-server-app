import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import UserRoutes from "./Users/routes.js";
import CourseRoutes from "./Courses/routes.js";
import ModuleRoutes from "./Modules/routes.js";
import AssignmentRoutes from "./Assignments/routes.js";
import EnrollmentRoutes from "./Enrollments/routes.js";

const app = express();
// Connect to MongoDB
const CONNECTION_STRING = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING);

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL || "http://localhost:3000" }));

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "super secret session phrase",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.SERVER_ENV === "production",
    sameSite: process.env.SERVER_ENV === "production" ? "none" : "lax",
  },
};

if (process.env.SERVER_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(session(sessionOptions));
app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});