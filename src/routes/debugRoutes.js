import express from "express";
import path from "path";
import { dirname } from "path";
import { getAllGuests } from "../controllers/guestsController.js";
import { getAllReservations } from "../controllers/reservationsController.js";
import { getAllRooms } from "../controllers/roomsController.js";

const router = express.Router();

// Debug route for guests
router.get("/debug/guests", async (req, res) => {
    const guests = await getAllGuests(req, res);
    const filePath = new URL('.', import.meta.url).pathname;
    const absolutePath = dirname(filePath);

    res.render(path.join(absolutePath, "../src/views/guests.ejs"), {
      dataName: "Guests",
      dataCount: guests.length,
      data: guests,
    });
});

router.get("/debug/reservations", async (req, res) => {
  const reservations = await getAllReservations(req, res);
  const filePath = new URL('.', import.meta.url).pathname;
  const absolutePath = dirname(filePath);

  res.render(path.join(absolutePath, "../src/views/reservations.ejs"), {
    dataName: "Reservations",
    dataCount: reservations.length,
    data: reservations,
  });
});

router.get("/debug/rooms", async (req, res) => {
  const rooms = await getAllRooms(req, res);
  const filePath = new URL('.', import.meta.url).pathname;
  const absolutePath = dirname(filePath);

  res.render(path.join(absolutePath, "../src/views/rooms.ejs"), {
    dataName: "Rooms",
    dataCount: rooms.length,
    data: rooms,
  });
});

export default router;
