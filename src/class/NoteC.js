export default class NoteC {
  /** 
   * @param {Number} id 
   * @param {String} text 
   * @param {Date} date 
   * @param {String} bg 
   */
  constructor(id, text, date, bg) {
    this.id = id;
    this.text = text.trim();
    this.date = date;
    this.bg = bg;
  }
}