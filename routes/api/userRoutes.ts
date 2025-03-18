import { Router } from "express";
import userController from "../../controllers/ControllerUser";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);
router.post("/:userId/friends/:friendId", userController.addFriend);
router.delete("/:userId/friends/:friendId", userController.removeFriend);

export default router;
