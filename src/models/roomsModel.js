export default class Room {
  constructor(roomNumber, type, capacity, price) {
    this.roomNumber = roomNumber;
    this.type = type; // e.g., Single, Double, Suite
    this.capacity = capacity; // Maximum number of guests
    this.price = price; // Price per night
  }
}
