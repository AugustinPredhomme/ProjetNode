import fs from "fs/promises";
import { Guest } from "../models";

const guestsFilePath = "./data/guests.json";

export const getAllGuests = async (req, res) => {
  try {
    const data = await fs.readFile(guestsFilePath, "utf-8");
    const guests = JSON.parse(data);
    res.json(guests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving guests" });
  }
};

export const getGuestById = async (req, res) => {
  const guestId = req.params.id;
  try {
    const data = await fs.readFile(guestsFilePath, "utf-8");
    const guests = JSON.parse(data);
    const foundGuest = guests.find((guest) => guest.id === parseInt(guestId));
    if (foundGuest) {
      res.json(foundGuest);
    } else {
      res.status(404).json({ message: "Guest not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving guest" });
  }
};

export const createGuest = async (req, res) => {
  try {
    const newGuest = req.body;

    // Basic validation
    if (
      !newGuest.firstName ||
      !newGuest.lastName ||
      !newGuest.email ||
      !newGuest.phone
    ) {
      return res
        .status(400)
        .json({ message: "Missing required guest information" });
    }

    const data = await fs.readFile(guestsFilePath, "utf-8");
    const guests = JSON.parse(data);

    //Generate a unique id
    let newId = 1;
    if (guests.length > 0) {
      newId = guests[guests.length - 1].id + 1;
    }

    guests.push({ ...newGuest, id: newId });

    await fs.writeFile(guestsFilePath, JSON.stringify(guests, null, 2));

    res
      .status(201)
      .json({ message: "Guest created successfully", guest: newGuest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating guest" });
  }
};

export const updateGuest = async (req, res) => {
  const guestId = req.params.id;
  const updatedGuestData = req.body;

  try {
    const data = await fs.readFile(guestsFilePath, "utf-8");
    const guests = JSON.parse(data);
    const guestIndex = guests.findIndex(
      (guest) => guest.id === parseInt(guestId)
    );

    if (guestIndex === -1) {
      return res.status(404).json({ message: "Guest not found" });
    }

    guests[guestIndex] = { ...guests[guestIndex], ...updatedGuestData };

    await fs.writeFile(guestsFilePath, JSON.stringify(guests, null, 2));

    res.json({ message: "Guest updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating guest" });
  }
};

export const deleteGuest = async (req, res) => {
  const guestId = req.params.id;

  try {
    const data = await fs.readFile(guestsFilePath, "utf-8");
    const guests = JSON.parse(data);
    const guestIndex = guests.findIndex(
      (guest) => guest.id === parseInt(guestId)
    );

    if (guestIndex === -1) {
      return res.status(404).json({ message: "Guest not found" });
    }

    guests.splice(guestIndex, 1);

    await fs.writeFile(guestsFilePath, JSON.stringify(guests, null, 2));

    res.json({ message: "Guest deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting guest" });
  }
};
