const titleElement = document.querySelector('#title')
const editElement = document.querySelector('#updated-at')
const bodyElement = document.querySelector('#body-text')

// only show edit.html when real note to display
const noteId = location.hash.substring(1)
let notes = loadSavedData()
let note = notes.find((note) =>  note.id === noteId)

if (note === undefined) {
  location.assign('/index.html')
}

titleElement.value = note.title
bodyElement.value = note.body
editElement.textContent = lastEditedMessage(note.updatedAt)

//add updatedAt Element



// setup input event for title
titleElement.addEventListener('input', (e) => {
  e.preventDefault()
  note.title = e.target.value
  note.updatedAt = moment().valueOf()
  // editElement.textContent = lastEditedMessage(note.updatedAt)
  saveData(notes)
})


// setup input event for body
bodyElement.addEventListener('input', (e) => {
  note.body = e.target.value
  note.updatedAt = moment().valueOf()
  // editElement.textContent = lastEditedMessage(note.updatedAt)
  saveData(notes)
})

// remove button: removes note and sends user back to main page
document.querySelector('#remove-note').addEventListener('click', () => {
  removeNote(note.id)
  saveData(notes)
  location.assign('/index.html')
})

// sync data across the same tab, which is open multiple times
window.addEventListener('storage', (e) => {
  if (e.key === notes) {
    notes = JSON.parse(e.newValue)
    note = notes.find((note) => note.id === noteId)

    if (note === undefined) {
      location.assign('/index.html')
    }

    titleElement.value = note.title
    bodyElement.value = note.body
    editElement.textContent = lastEditedMessage(note.updatedAt)
  }
})
