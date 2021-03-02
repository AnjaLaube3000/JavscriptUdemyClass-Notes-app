//library to create unique ids for each note
uuidv4()

// load data
const loadSavedData = () => {
  const notesJSON = localStorage.getItem('notes')
  return notesJSON ? JSON.parse(notesJSON) : []
}

// save data
const saveData = (notes) => {
  localStorage.setItem('notes', JSON.stringify(notes))
}

// sort notes by one of the options in dropdown menu
const sortNotes = (notes, sortBy) => {
  if (sortBy === 'byEdited') {
    return notes.sort ((a,b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1
      } else if (a.updatedAt < b.updatedAt) {
        return 1
      } else {
        return 0
      }
    })
  } else if (sortBy === 'byCreated') {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1
      } else if (a.createdAt < b.createdAt) {
        return 1
      } else {
        return 0
      }
    })
  } else if (sortBy === 'alphabetical') {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1
      } else if ( a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1
      } else {
        return 0
      }
    })
  } else {
    return notes
  }
}


//render all notes
const renderedNotes = (notes, filters) => {
  const notesEl = document.querySelector('#notes')
  notes = sortNotes(notes, filters.sortBy)
  let filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

  notesEl.innerHTML = ''

  if (filteredNotes.length > 0) {
    filteredNotes.forEach((note)  => {
      notesEl.appendChild(generateNoteDOM(note))
    })
  } else {
    const emptyMessage = document.createElement("p")
    emptyMessage.textContent = "No notes yet."
    emptyMessage.classList.add("empty-message")
    notesEl.appendChild(emptyMessage)
  }
}

// remove item from list of notes via index
const removeNote = (id) => {
  const index = notes.findIndex((note) => note.id === id)
  if (index > -1) {
    notes.splice(index, 1)
  }
}

// generate the DOM structure for a note
const generateNoteDOM = (note) => {
  let p = document.createElement('a')
  const textElement = document.createElement('a')
  // const button = document.createElement('button')

  // // set up remove button
  // button.textContent = 'x'
  // p.appendChild(button)
  // button.addEventListener('click', () => {
  //   removeNote(note.id)
  //   saveData(notes)
  //   renderedNotes(notes, filters)
  // })
  const statusEl = document.createElement("p")

  // set up title
  if (note.title.length) {
    textElement.textContent = note.title
  } else {
    textElement.textContent = 'Untitled'
  }
  textElement.classList.add('list-item__title')
  p.appendChild(textElement)

  // Setup the link
  p.setAttribute('href', `/edit.html#${note.id}`)
  p.classList.add('list-item')

  // Setup status message
  statusEl.textContent = lastEditedMessage(note.updatedAt)
  statusEl.classList.add('list-item__subtitle')
  p.appendChild(statusEl)

  return p
}

// generate Last Edited Message
const lastEditedMessage = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`
