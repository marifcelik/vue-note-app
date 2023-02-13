export default class NoteC {
  constructor(id, body, date, bg, color) {
    this.id = id;
    this.body = body;
    this.date = date.toLocaleDateString('tr-TR') + ' - ' + date.toLocaleTimeString('tr-TR', { timeStyle: 'short' });
    this.bg = `bg-${bg}-500`;
    this.color = color;
  }
}