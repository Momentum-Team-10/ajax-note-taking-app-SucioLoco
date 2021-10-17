// Grabs the url for the notes API
const url = `http://localhost:3000/notes/`

// Grabs the list ul element from the DONM
const noteList = document.getElementById('note-list')

// Grab the form element from the DOM
const form = document.querySelector('note-form')

// Have form element listen for a submit event
// Once submit event is triggered, render my newly created todo item on the DOM
form.addEventListener('submit', (event) => {
    event.preventDefault()
    const noteText = document.getElementByClass('form-field').value
    createNote(noteText)
    // Clear form after a note has been created
    form.reset()
})

// Creates a li to hold the body of notes
function renderNewNote(noteObj) {
    const li = document.createElement('li')
// make the id of the li element the id of my todo object
    li.id = noteObj.id
    renderNewNote(li, noteObj)
    todoList.appendChild(li)
}

// Set the innerHTML of the li render
// the value at the key of body in my todo objects
function renderNoteText(li, noteObj) {
    li.innerHTML = `<span>${noteObj.body}</span> ${noteObj.updated_at ? moment(noteObj.updated_at).format('MMM DD, YYYY') : ""}`
}

// Run this function to render
// elements to DOM
listNotes()


// GET Request: gets all of the notes in the database
function listNotes() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            for (let item of data) {
                renderNoteText(item)
            }
        })
}

// POST request: adds a new note to the database
function createNote(noteText) {
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: noteText,
            body: noteText,
            created_at: moment().format()
        })
    })
        .then(res => res.json())
        .then(data => renderNoteText(data))
}


// DELETE request: delete a todo based on id
function deleteNote(noteEl) {
    fetch(url + '/' + `${noteEl.id} `, {
        method: 'DELETE'
    }).then(() => noteEl.parentElement.remove())
}


// PUT request: update a todo based on id
function updateNote(noteEl) {
    const noteText = document.getElementById('note-text').value
    fetch(url + '/' + `${noteEl.parentElement.id} `, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: noteText,
            body: noteText,
            updated_at: moment().format()
        })
    })
        .then(res => res.json())
        .then(data => {
            renderNoteText(noteEl.parentElement, data)
        })
}

