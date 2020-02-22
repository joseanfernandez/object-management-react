import Item from './Item'

function Desktop(id, name, type, date, assigned, calculator, keyboard) {
  Item.call(this, id, name, type, date, assigned)

  this.calculator = calculator
  this.keyboard = keyboard
}

export default Desktop