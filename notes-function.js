//library to create unique ids for each note
uuidv4()

// load data
const loadSavedData = () => {
  const notesJSON = localStorage.getItem('notes')
  return notesJSON !== null ? JSON.parse(notesJSON) : []
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
  notes = sortNotes(notes, filters.sortBy)
  let filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

  document.querySelector('#notes').innerHTML = ''

  filteredNotes.forEach((note)  => {
    document.querySelector('#notes').appendChild(generateNoteDOM(note))
  })
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
  let p = document.createElement('div')
  const textElement = document.createElement('a')
  const button = document.createElement('button')
  // const createdAt = document.createElement('span')
  // let updatedAt = document.createElement('span')

  // set up remove button
  button.textContent = 'x'
  p.appendChild(button)
  button.addEventListener('click', () => {
    removeNote(note.id)
    saveData(notes)
    renderedNotes(notes, filters)
  })

  // set up title
  if (note.title.length > 0) {
    textElement.textContent = note.title
  } else {
    textElement.textContent = 'Untitled'
  }
  textElement.setAttribute('href', `/edit.html#${note.id}`)
  p.appendChild(textElement)

  // //created at
  // createdAt.textContent = `Note created at ${note.createdAt}`
  // p.appendChild(createdAt)

  // //updated at
  // updatedAt.textContent = `Last edited at ${note.updatedAt}`
  // p.appendChild(updatedAt)

  return p
}


// generate Last Edited Message
const lastEditedMessage = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`
