import { getNotes, createNote, removeNote, updateNote } from './notes'
import { getFilters, setFilters } from './filters'

console.log(getFilters())
setFilters({
  searchText: 'office',
  sortBy: 'byCreated'
})
console.log(getFilters())

console.log(getNotes())
createNote()
updateNote('e3860696-b019-4b1b-be45-88c07c385c97', {
  title: 'New title',
  body: 'Thats what happening!'
})
console.log(getNotes())
