/*
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const guestsFilePath = path.join(__dirname, '../data/guests.json');

export const getAllGuests = async (req, res) => {
  try {
    const data = fs.readFileSync(guestsFilePath, "utf-8");
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
    const data = fs.readFileSync(guestsFilePath, "utf-8");
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

    const data = fs.readFileSync(guestsFilePath, "utf-8");
    const guests = JSON.parse(data);

    //Generate a unique id
    let newId = 1;
    if (guests.length > 0) {
      newId = guests[guests.length - 1].id + 1;
    }

    guests.push({ ...newGuest, id: newId });

    fs.writeFileSync(guestsFilePath, JSON.stringify(guests, null, 2));

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
    const data = fs.readFileSync(guestsFilePath, "utf-8");
    const guests = JSON.parse(data);
    const guestIndex = guests.findIndex(
      (guest) => guest.id === parseInt(guestId)
    );

    if (guestIndex === -1) {
      return res.status(404).json({ message: "Guest not found" });
    }

    guests[guestIndex] = { ...guests[guestIndex], ...updatedGuestData };

    fs.writeFileSync(guestsFilePath, JSON.stringify(guests, null, 2));

    res.json({ message: "Guest updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating guest" });
  }
};

export const deleteGuest = async (req, res) => {
  const guestId = req.params.id;

  try {
    const data = fs.readFileSync(guestsFilePath, "utf-8");
    const guests = JSON.parse(data);
    const guestIndex = guests.findIndex(
      (guest) => guest.id === parseInt(guestId)
    );

    if (guestIndex === -1) {
      return res.status(404).json({ message: "Guest not found" });
    }

    guests.splice(guestIndex, 1);

    fs.writeFileSync(guestsFilePath, JSON.stringify(guests, null, 2));

    res.json({ message: "Guest deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting guest" });
  }
};
*/

import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

type FilePath = string;

const __filename = fileURLToPath(import.meta.url) as FilePath;
const __dirname = path.dirname(__filename) as FilePath;

interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

type Guests = Guest[];

const guestsFilePath: FilePath = path.join(__dirname, '../data/guests.json');

export const getAllGuests = async (req: any, res: any) => {
  try {
    const data: string = fs.readFileSync(guestsFilePath, "utf-8");
    const guests: Guests = JSON.parse(data);
    res.json(guests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving guests" });
  }
};

export const getGuestById = async (req: any, res: any) => {
  const guestId: string = req.params.id;
  try {
    const data: string = fs.readFileSync(guestsFilePath, "utf-8");
    const guests: Guests = JSON.parse(data);
    const foundGuest: Guest | undefined = guests.find((guest) => guest.id === parseInt(guestId));
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

export const createGuest = async (req: any, res: any) => {
  try {
    const newGuest: Guest = req.body;

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

    const data: string = fs.readFileSync(guestsFilePath, "utf-8");
    const guests: Guests = JSON.parse(data);

    //Generate a unique id
    let newId = 1;
    if (guests.length > 0) {
      newId = guests[guests.length - 1].id + 1;
    }

    guests.push({ ...newGuest, id: newId });

    await fs.promises.writeFile(guestsFilePath, JSON.stringify(guests, null, 2));

    res
      .status(201)
      .json({ message: "Guest created successfully", guest: newGuest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating guest" });
  }
};

export const updateGuest = async (req: any, res: any) => {
  const guestId: string = req.params.id;
  const updatedGuestData: Partial<Guest> = req.body;

  try {
    const data: string = fs.readFileSync(guestsFilePath, "utf-8");
    const guests: Guests = JSON.parse(data);
    const guestIndex = guests.findIndex(
      (guest) => guest.id === parseInt(guestId)
    );

    if (guestIndex === -1) {
      return res.status(404).json({ message: "Guest not found" });
    }

    guests[guestIndex] = { ...guests[guestIndex], ...updatedGuestData };

    await fs.promises.writeFile(guestsFilePath, JSON.stringify(guests, null, 2));

    res.json({ message: "Guest updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating guest" });
  }
};

export const deleteGuest = async (req: any, res: any) => {
  const guestId: string = req.params.id;

  try {
    const data: string = fs.readFileSync(guestsFilePath, "utf-8");
    const guests: Guests = JSON.parse(data);
    const guestIndex = guests.findIndex(
      (guest) => guest.id === parseInt(guestId)
    );

    if (guestIndex === -1) {
      return res.status(404).json({ message: "Guest not found" });
    }

    guests.splice(guestIndex, 1);

    await fs.promises.writeFile(guestsFilePath, JSON.stringify(guests, null, 2));

    res.json({ message: "Guest deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting guest" });
  }
};
