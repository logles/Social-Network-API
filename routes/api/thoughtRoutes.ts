import { Router } from "express";
import thoughtController from "../../controllers/ControlerThought";

const router = Router();

router.get("/", thoughtController.getAllThoughts);
router.get("/:thoughtId", thoughtController.getThoughtById);
router.post("/", thoughtController.createThought);
router.put("/:thoughtId", thoughtController.updateThought);
router.delete("/:thoughtId", thoughtController.deleteThought);
router.post("/:thoughtId/reactions", thoughtController.addReaction);
router.delete(
  "/:thoughtId/reactions/:reactionId",
  thoughtController.removeReaction
);

export default router;
