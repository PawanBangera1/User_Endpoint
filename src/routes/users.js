import express from "express";
import multer from "multer";
import {
  handleAllusers,
  handleSingleUser,
  handleNewUser,
  handleUpdateUser,
  handleDeleteUser,
} from "../controller/userController.js";

const upload = multer();

const route = express.Router();

route.get("/", handleAllusers);
route.get("/:id", handleSingleUser);
route.post("/", upload.none(), handleNewUser);
route.put("/:id", upload.none(), handleUpdateUser);
route.delete("/:id", handleDeleteUser);

export default route;
