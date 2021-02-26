// import timeRelative from '/dayjs/plugin/timeRelative'
// dayjs.extend(timeRelative)
// // timeRelative plugin for day.js-library

// checking for existing data saved
let notes = loadSavedData()

const filters = {
  searchText: '',
  sortBy: 'byEdited'
}

//render all notes
renderedNotes(notes, filters)

// filter notes
document.querySelector('#search-text').addEventListener('input', (e) => {
  filters.searchText = e.target.value
  renderTodos(todos, filters)
})

document.querySelector('#create-note').addEventListener('click', (e) => {
  const id = uuidv4()
  const timestamp = moment().valueOf()
  notes.push({
    id: id,
    title: '',
    body: '',
    createdAt: timestamp,
    updatedAt: timestamp
  })
  location.assign(`/edit.html#${id}`)
  saveData(notes)
  renderedNotes(notes, filters)
})

// drowpdown menu
document.querySelector('#sorting-option').addEventListener('change', (e) => {
  filters.sortBy = e.target.value
  renderedNotes(notes, filters)
})

// sync data from the mainpage to the edit page
window.addEventListener('storage', (e) => {
  if(e.key === notes) {
    notes = JSON.parse(e.newValue)
    renderedNotes(notes, filters)
  }
})

// DAY JS
// //setup day.js library
// const now = dayjs()

// const myBirthday = now.subtract(34, 'year').subtract(8, 'month').add(4, 'days')
// console.log(myBirthday.format('MMM D,YYYY'))


// console.log(myBirthday.fromNow())
