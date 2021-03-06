import {EventEmitter} from 'events'
import Model from './model'

class SimpleStore extends EventEmitter {
  constructor(stores, data=[]) {
    super()

    this._stores = stores
    this._items = []
    this._maxId = 0

    data.forEach(this._addItem)
  }

  get hasData() {
    return this._items.length > 0
  }

  change() {
    this.emit('STORE_CHANGE')
  }

  addEventListener(callback) {
    this.on('STORE_CHANGE', callback)
  }

  removeEventListener(callback) {
    this.removeListener('STORE_CHANGE', callback)
  }

  deleteById(id) {
    console.log('--- store will delete item by id', id);
  }

  _addItem = (itemData) => {
    if (this._items.filter(item => item.id == itemData.id).length) {
      return
    }

    this._items.push(new Model(itemData, this._stores))
    this._maxId = itemData.id
  }

  getItem = (id) => {
    const filtered = this._items.filter(itemData => itemData.id == id)

    return filtered.length === 1 ? filtered[0] : null
  }

  getAll() {
    return this._items.slice()
  }

  deleteItem(id) {
    this._items = this._items.filter(itemData => itemData.id != id)
  }

  generateNextId() {
    return ++this._maxId
  }

  getLastId() {
    const lastItem = this._items[this._items.length - 1]

    if (!lastItem) {
      return 0
    }

    return lastItem.id
  }
}

export default SimpleStore
