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

// CORS configuration with function for better control
const allowedOrigins = [
    process.env.CLIENT_URL || "http://localhost:3000",
    "https://kambaz-next-js-cs5016-fall2025-a5.vercel.app",
];

app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, Postman, or curl)
        if (!origin) {
            console.log('✅ No origin header - allowing request');
            return callback(null, true);
        }

        // Check exact matches
        if (allowedOrigins.includes(origin)) {
            console.log('✅ Origin allowed (exact match):', origin);
            return callback(null, true);
        }

        // Check regex pattern for Vercel preview deployments
        const vercelPattern = /^https:\/\/kambaz-next-js-cs5016-fall2025-a5-.*\.vercel\.app$/;
        if (vercelPattern.test(origin)) {
            console.log('✅ Origin allowed (regex match):', origin);
            return callback(null, true);
        }

        console.log('❌ Origin blocked:', origin);
        callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Debug logging
console.log('🌍 Environment:', process.env.SERVER_ENV);
console.log('🔑 Client URL:', process.env.CLIENT_URL);
console.log('🍪 Session Secret:', process.env.SESSION_SECRET ? 'SET' : 'NOT SET');

// Request logging middleware
app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.path} from origin: ${req.headers.origin || 'no origin'}`);
    next();
});

// Session configuration
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.SERVER_ENV === "production",
    sameSite: process.env.SERVER_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }
};

if (process.env.SERVER_ENV === "production") {
  sessionOptions.proxy = true;
  sessionOptions.cookie.secure = true;
  sessionOptions.cookie.sameSite = "none";
}

console.log('🍪 Cookie settings:', {
    secure: sessionOptions.cookie.secure,
    sameSite: sessionOptions.cookie.sameSite
});

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

const PORT = process.env.PORT || 4000;
app.listen(PORT);
console.log(`🚀 Server is running on port ${PORT}`);