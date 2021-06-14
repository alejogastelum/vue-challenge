export default class Item {
  id: number
  title: string
  text: string
  date: Date

  constructor() {
    this.id = 0
    this.title = ''
    this.text = ''
    this.date = new Date()
  }
}
