import EnrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
  const dao = EnrollmentsDao();

  const enrollInCourse = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      const { courseId } = req.params;
      await dao.enrollUserInCourse(currentUser._id, courseId);
      res.sendStatus(200);
    } catch (error) {
      if (error.code === 11000) {
        res.sendStatus(200);
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  const unenrollFromCourse = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      const { courseId } = req.params;
      await dao.unenrollUserFromCourse(currentUser._id, courseId);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getMyEnrollments = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      const courses = await dao.findCoursesForUser(currentUser._id);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  app.post("/api/enrollments/:courseId", enrollInCourse);
  app.delete("/api/enrollments/:courseId", unenrollFromCourse);
  app.get("/api/enrollments/me", getMyEnrollments);
}