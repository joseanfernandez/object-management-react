import Item from './Item'

function Employee(id, name, type, date, assigned, desktop) {
  Item.call(this, id, name, type, date, assigned)
  this.desktop = desktop
}

export default Employee