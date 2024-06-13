import fs from "fs/promises";
import { Reservation, Guest, Room } from "../models";

const guestsFilePath = "../data/guests.json";
const roomsFilePath = "../data/rooms.json";
const reservationsFilePath = "../data/reservations.json";

export const getAllReservations = async (req, res) => {
  try {
    const data = await fs.readFile(reservationsFilePath, "utf-8");
    const reservations = JSON.parse(data);
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving reservations" });
  }
};

export const getReservationById = async (req, res) => {
  const reservationId = req.params.id;
  try {
    const data = await fs.readFile(reservationsFilePath, "utf-8");
    const reservations = JSON.parse(data);
    const foundReservation = reservations.find(
      (reservation) => reservation.id === parseInt(reservationId)
    );
    if (foundReservation) {
      res.json(foundReservation);
    } else {
      res.status(404).json({ message: "Reservation not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving reservation" });
  }
};

export const createReservation = async (req, res) => {
  try {
    const newReservationData = req.body;

    // Basic validation
    if (
      !newReservationData.guestId ||
      !newReservationData.roomId ||
      !newReservationData.checkInDate ||
      !newReservationData.checkOutDate
    ) {
      return res
        .status(400)
        .json({ message: "Missing required reservation information" });
    }

    const guestId = newReservationData.guestId;
    const roomId = newReservationData.roomId;
    const checkInDate = new Date(newReservationData.checkInDate);
    const checkOutDate = new Date(newReservationData.checkOutDate);

    // Ensure guest and room exist
    const guestData = await fs.readFile(guestsFilePath, "utf-8");
    const guests = JSON.parse(guestData);
    const foundGuest = guests.find((guest) => guest.id === guestId);

    const roomData = await fs.readFile(roomsFilePath, "utf-8");
    const rooms = JSON.parse(roomData);
    const foundRoom = rooms.find((room) => room.roomNumber === roomId);

    if (!foundGuest || !foundRoom) {
      return res
        .status(400)
        .json({ message: "Invalid guest or room information" });
    }

    // Bonus : Check room availability for the requested dates
    /**
     *
     */

    const newReservation = new Reservation(
      foundGuest,
      foundRoom,
      checkInDate,
      checkOutDate
    );

    // Generate a unique reservation id
    let newId = 1;
    const existingReservations = await fs.readFile(
      reservationsFilePath,
      "utf-8"
    );
    if (existingReservations.length > 0) {
      newId =
        JSON.parse(existingReservations)[existingReservations.length - 1].id +
        1;
    }

    //Add new reservation
    const reservations = [
      ...((await fs.readFile(reservationsFilePath, "utf-8")).length === 0
        ? []
        : JSON.parse(await fs.readFile(reservationsFilePath, "utf-8"))),
      { ...newReservation, id: newId },
    ];

    await fs.writeFile(
      reservationsFilePath,
      JSON.stringify(reservations, null, 2)
    );

    res.status(201).json({
      message: "Reservation created successfully",
      reservation: newReservation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating reservation" });
  }
};

// Update reservation
export const updateReservation = async (req, res) => {
  const reservationId = req.params.id;
  const updatedReservationData = req.body;

  try {
    const data = await fs.readFile(reservationsFilePath, "utf-8");
    const reservations = JSON.parse(data);
    const reservationIndex = reservations.findIndex(
      (reservation) => reservation.id === parseInt(reservationId)
    );

    if (reservationIndex === -1) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // Bonus : Check room availability
    /**
     *
     */

    //Update reservation
    reservations[reservationIndex] = {
      ...reservations[reservationIndex],
      ...updatedReservationData,
    };

    await fs.writeFile(
      reservationsFilePath,
      JSON.stringify(reservations, null, 2)
    );

    res.json({ message: "Reservation updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating reservation" });
  }
};

// Delete reservation
export const deleteReservation = async (req, res) => {
  const reservationId = req.params.id;

  try {
    const data = await fs.readFile(reservationsFilePath, "utf-8");
    const reservations = JSON.parse(data);
    const reservationIndex = reservations.findIndex(
      (reservation) => reservation.id === parseInt(reservationId)
    );

    if (reservationIndex === -1) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    //Delete reservation
    reservations.splice(reservationIndex, 1);

    await fs.writeFile(
      reservationsFilePath,
      JSON.stringify(reservations, null, 2)
    );

    res.json({ message: "Reservation deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting reservation" });
  }
};
