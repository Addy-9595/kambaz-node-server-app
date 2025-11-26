import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function UsersDao() {
  const createUser = (user) => model.create({ ...user, _id: uuidv4() });
  const findAllUsers = () => model.find();
  const findUserById = (userId) => model.findById(userId);
  const findUserByUsername = (username) => model.findOne({ username });
  const findUserByCredentials = (username, password) => model.findOne({ username, password });
  const findUsersByRole = (role) => model.find({ role: role });
  const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i");
    return model.find({ $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }] });
  };
  const updateUser = (userId, userUpdates) => model.updateOne({ _id: userId }, { $set: userUpdates });
  const deleteUser = (userId) => model.deleteOne({ _id: userId });

  return { createUser, findAllUsers, findUserById, findUserByUsername, findUserByCredentials, findUsersByRole, findUsersByPartialName, updateUser, deleteUser };
}