export default class NoteC {
  /** 
   * @param {Number} id 
   * @param {String} body 
   * @param {Date} date 
   * @param {String} bg 
   */
  constructor(id, body, date, bg) {
    this.id = id;
    this.body = body;
    this.setDate(date)
    this.bg = bg;
  }
  /**
   * @param {Date} d - method for make date propertie updatable
   */
  setDate(d) {
    this.date = d.toLocaleDateString('tr-TR') + ' - ' + d.toLocaleTimeString('tr-TR', { timeStyle: 'short' });
  }
}