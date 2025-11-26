import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  const dao = CoursesDao();
  const enrollmentsDao = EnrollmentsDao();

  const findAllCourses = async (req, res) => {
    try {
      const courses = await dao.findAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const findCoursesForEnrolledUser = async (req, res) => {
    try {
      let { userId } = req.params;
      if (userId === "current") {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
          res.sendStatus(401);
          return;
        }
        userId = currentUser._id;
      }
      const courses = await enrollmentsDao.findCoursesForUser(userId);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const createCourse = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      const newCourse = await dao.createCourse(req.body);
      await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
      res.json(newCourse);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      await enrollmentsDao.unenrollAllUsersFromCourse(courseId);
      await dao.deleteCourse(courseId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const status = await dao.updateCourse(courseId, req.body);
      res.json(status);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const findUsersForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const users = await enrollmentsDao.findUsersForCourse(courseId);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateAllCoursesImages = async (req, res) => {
  try {
    const coursesData = [
      { _id: "RS101", image: "/images/rocket-propulsion.jpg" },
      { _id: "RS102", image: "/images/aerodynamics.jpg" },
      { _id: "RS103", image: "/images/spacecraft-design.jpg" },
      { _id: "RS104", image: "/images/organic-chemistry.jpg" },
      { _id: "RS105", image: "/images/inorganic-chemistry.jpg" },
      { _id: "RS106", image: "/images/physical-chemistry.jpg" },
      { _id: "RS107", image: "/images/ancient-languages.jpg" },
      { _id: "RS108", image: "/images/wizards-elves-men.jpg" },
    ];

    for (const course of coursesData) {
      await dao.updateCourse(course._id, { image: course.image });
    }

    res.json({ message: "All courses updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

app.post("/api/courses/update-images", updateAllCoursesImages);
  app.get("/api/courses", findAllCourses);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/current/courses", createCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
  app.get("/api/courses/:courseId/users", findUsersForCourse);
}