import Guest from './guestsModel.js';

export default class Reservation {
  constructor(guest, room, checkInDate, checkOutDate) {
    this.guest = guest instanceof Guest ? guest : new Guest('', '', '', '');
    this.room = room;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
  }
}
