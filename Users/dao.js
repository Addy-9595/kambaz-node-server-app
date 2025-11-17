// Kambaz/Users/dao.js
import { v4 as uuidv4 } from "uuid";

export default function UsersDao(db) {
  // Create a new user
  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    db.users = [...db.users, newUser];  // Update db object
    return newUser;  // Return the created user
  };

  // Get all users
  const findAllUsers = () => db.users;

  // Find user by ID
  const findUserById = (userId) =>
    db.users.find((user) => user._id === userId);

  // Find user by username
  const findUserByUsername = (username) =>
    db.users.find((user) => user.username === username);

  // Find user by credentials (login)
  const findUserByCredentials = (username, password) =>
    db.users.find((user) =>
      user.username === username &&
      user.password === password
    );

  // Update user
  const updateUser = (userId, userUpdates) => {
    db.users = db.users.map((u) =>
      u._id === userId ? { ...u, ...userUpdates } : u
    );
    return db.users.find((u) => u._id === userId);
  };

  // Delete user
  const deleteUser = (userId) => {
    db.users = db.users.filter((u) => u._id !== userId);
  };

  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser
  };
}