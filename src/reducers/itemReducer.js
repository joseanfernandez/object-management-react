const initState = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
const moment = require('moment')

const itemReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      state = [...state, action.item]
      localStorage.setItem('items', JSON.stringify(state))
      return state
    case 'DELETE_ITEM':
      state = state.filter(item => item.id !== action.id)
      localStorage.setItem('items', JSON.stringify(state))
      return state
    case 'EDIT_ITEM':
      const index = state.map((item) => { return item.id }).indexOf(action.item.id)
      state[index] = action.item
      localStorage.setItem('items', JSON.stringify(state))
      return state
    case 'FILTERED_ITEMS':
      if (action.filter === '') return state
      return filterItems(state, action.filter)
    case 'ALL_ITEMS':
      return initState
    case 'ASSIGN_ITEM':
      action.item.assigned = true
      state[state.map((item) => { return item.id }).indexOf(action.item.id)] = action.item
      localStorage.setItem('items', JSON.stringify(state))
      return state
    case 'DISCHARGE_ITEM':
      action.item.assigned = false
      state[state.map((item) => { return item.id }).indexOf(action.item.id)] = action.item
      localStorage.setItem('items', JSON.stringify(state))
      return state
    default:
      return state
  }
}

const filterItems = (items, filter) => {
  const lowercasedFilter = filter.toLowerCase()
  const filteredData = items.filter(item => {
    return Object.keys(item).some(() =>
      item['name'].toLowerCase().includes(lowercasedFilter) || item['type'].toLowerCase().includes(lowercasedFilter) || moment(new Date(item['date'])).format('YYYY-MM-DD').includes(lowercasedFilter)
    )
  })
  return filteredData
}

export default itemReducer