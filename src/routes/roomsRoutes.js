import { Router } from "express";
import {
  getAllRooms,
  getRoomByNumber,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/roomsController.js";

const router = Router();

router.get("/", getAllRooms);
router.get("/:number", getRoomByNumber);
router.post("/", createRoom);
router.put("/:number", updateRoom);
router.delete("/:number", deleteRoom);

export default router;
