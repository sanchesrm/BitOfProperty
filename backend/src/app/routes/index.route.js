import express from "express";
import { checkToken, findLogin } from "../controllers/loginController";
import {
  fetchUsers,
  createUser,
  deleteUser
} from "../controllers/usersControllers";

const router = express.Router();

router.put("/signin", findLogin);

router.use(checkToken);
router.get("/fetchUsers", fetchUsers);
router.post("/createUser", createUser);
router.delete("/deleteUser/:userId", deleteUser);

export default router;
