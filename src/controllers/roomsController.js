import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const roomsFilePath = path.join(__dirname, "../data/rooms.json");

export const getAllRooms = async (req, res) => {
  try {
    const data = fs.readFileSync(roomsFilePath, "utf-8");
    const rooms = JSON.parse(data);
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving rooms" });
  }
};

export const getRoomByNumber = async (req, res) => {
  const roomNumber = req.params.number;
  try {
    const data = fs.readFileSync(roomsFilePath, "utf-8");
    const rooms = JSON.parse(data);
    const foundRoom = rooms.find(
      (room) => room.roomNumber === parseInt(roomNumber)
    );
    if (foundRoom) {
      res.json(foundRoom);
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving room" });
  }
};

export const createRoom = async (req, res) => {
  try {
    const newRoom = req.body;

    // Basic validation (optional)
    if (
      !newRoom.roomNumber ||
      !newRoom.type ||
      !newRoom.capacity ||
      typeof newRoom.price !== "number"
    ) {
      return res
        .status(400)
        .json({ message: "Missing required room information" });
    }

    const data = fs.readFileSync(roomsFilePath, "utf-8");
    const rooms = JSON.parse(data);

    // Generate a unique room number
    let newNumber = 1;
    if (rooms.length > 0) {
      newNumber = rooms[rooms.length - 1].roomNumber + 1;
    }

    rooms.push({ ...newRoom, roomNumber: newNumber });

    fs.writeFileSync(roomsFilePath, JSON.stringify(rooms, null, 2));

    res
      .status(201)
      .json({ message: "Room created successfully", room: newRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating room" });
  }
};

export const updateRoom = async (req, res) => {
  const roomNumber = req.params.number;
  const updatedRoomData = req.body;

  try {
    const data = fs.readFileSync(roomsFilePath, "utf-8");
    const rooms = JSON.parse(data);
    const roomIndex = rooms.findIndex(
      (room) => room.roomNumber === parseInt(roomNumber)
    );

    if (roomIndex === -1) {
      return res.status(404).json({ message: "Room not found" });
    }

    rooms[roomIndex] = { ...rooms[roomIndex], ...updatedRoomData };

    fs.writeFileSync(roomsFilePath, JSON.stringify(rooms, null, 2));

    res.json({ message: "Room updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating room" });
  }
};

export const deleteRoom = async (req, res) => {
  const roomNumber = req.params.number;

  try {
    const data = fs.readFileSync(roomsFilePath, "utf-8");
    const rooms = JSON.parse(data);
    const roomIndex = rooms.findIndex(
      (room) => room.roomNumber === parseInt(roomNumber)
    );

    if (roomIndex === -1) {
      return res.status(404).json({ message: "Room not found" });
    }

    rooms.splice(roomIndex, 1);

    fs.writeFileSync(roomsFilePath, JSON.stringify(rooms, null, 2));

    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting room" });
  }
};
