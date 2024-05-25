

const notesContainer = document.querySelector('.note');
const taskTitle = document.querySelector('#newNoteTitle');
const taskDesc = document.querySelector('#textInput');
const taskDone = document.querySelector('#closenote');
const pintaskDone = document.querySelector('#closepinnote');

const pinnedNotesCont = document.querySelector('.pinned-notes-cont');
const pinnedNotes = document.querySelector('.pinned-notes')


function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.classList.add('notification', `notification-${type}`);
  notification.textContent = message;

  const progressBar = document.createElement('div');
  progressBar.classList.add('notification-progress');
  notification.appendChild(progressBar);

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.top = `-${notification.offsetHeight}px`;
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 3000);
}




// Function to find a note by its ID
function findNoteById(id) {
  const notesString = localStorage.getItem('notes');

  // Parse the JSON string into a JavaScript object
  const notes = JSON.parse(notesString);
  // Iterate through the array of notes
  for (const note of notes) {
    // Check if the current note's ID matches the provided ID
    if (note.id === id) {
      // Return the note object if found
      return note;
    }
  }
  // Return null if no note with the provided ID is found

}


function findPinnedNoteById(id) {
  const pinnotesString = localStorage.getItem('pinned');

  // Parse the JSON string into a JavaScript object
  const pinnotes = JSON.parse(pinnotesString);
  // Iterate through the array of notes
  for (const pinnote of pinnotes) {
    // Check if the current note's ID matches the provided ID
    if (pinnote.pinId === id) {
      // Return the note object if found
      //console.log(pinnote)
      return pinnote;
    }
  }
  // Return null if no note with the provided ID is found

}

 


function deleteNoteById(noteIdToDelete) {
  // Retrieve the value of the 'notes' key from local storage
  let notesString = localStorage.getItem('notes');

  // Parse the JSON string into a JavaScript object
  let notes = JSON.parse(notesString);

  // Filter out the note with the specified ID and keep remaining objects
  notes = notes.filter(note => note.id !== noteIdToDelete);

  // Update the 'notes' array in local storage
  localStorage.setItem('notes', JSON.stringify(notes));

  console.log('Note deleted successfully.');
}


function deleteNote(noteId) {
  const initDeleteTask = new Promise((resolve, reject) => {
    deleteNoteById(`${noteId}`);
    resolve();
  })

  initDeleteTask.then(() => {
    notesContainer.innerHTML = "";
    checkExistingNotes();
    showNotification("Note deleted successfully", "warn");
  }).catch((err) => {
    showNotification("Unable to delete note", "warn");

  })


}



function editNote(noteId) {
  const foundNote = findNoteById(`${noteId}`);
  const initEditTask = new Promise((resolve, reject) => {
    document.getElementById(`${noteId}`).outerHTML = "";

    document.querySelector('.add-note-small').style.display = 'none';
    document.querySelector('.add-note-big').style.display = 'flex';
    taskTitle.value = foundNote.title;
    taskDesc.value = foundNote.description;
    resolve();

  })

  initEditTask.then(() => {
    deleteNoteById(`${noteId}`);

  }).then(() => {
    showNotification("Note edited Successfuly !", "success");
  }).catch((err) => {
    showNotification("Unable to edit note!", "warn");
    console.log(err)
  })

  //checkExistingNotes();
}



taskDone.addEventListener('click', () => {
  const initAddTask = new Promise((resolve, reject) => {
    addNote(taskTitle.value, taskDesc.value);
    resolve();

  })
  initAddTask.then(() => {
    notesContainer.innerHTML = "";
    checkExistingNotes();
    taskTitle.value = "";
    taskDesc.value = "";
  }).then(() => {
    showNotification("Note Created Successfuly !", "success");
  }).catch((err) => {
    showNotification("Unable to create note!", "warn");
  })

})



const checkExistingNotes = () => {
  try {
    var notes = localStorage.getItem("notes");
    if (notes == null || notes == "[]") {
      localStorage.setItem("notes", "[]");
    } else {
      document.querySelector(".empty").style.display = "none";
      notes = JSON.parse(notes);

      notes.forEach((note) => {
        const title = note.title;
        const desc = note.description;
        const uid = note.id;

        notesContainer.appendChild(createNoteBox(uid, title, desc));
        console.log("created")
      });
    }
  } catch (err) {
    console.log(err)
  }
}


function updatepinnedcont(){
  var pinnednotes = localStorage.getItem("pinned");
  if (pinnednotes == null || pinnednotes == "[]") {
    pinnedNotesCont.style.display = "none";
  }
}

document.addEventListener("click",()=>{
  updatepinnedcont();
})


const checkExistingPinnedNotes = () => {
  try {
    var pinnednotes = localStorage.getItem("pinned");
    if (pinnednotes == null || pinnednotes == "[]") {
      localStorage.setItem("pinned", "[]");
    } else {
      document.querySelector(".empty").style.display = "none";
      pinnedNotesCont.style.display = "flex";
      pinnednotes = JSON.parse(pinnednotes);

      pinnednotes.forEach((note) => {
        const title = note.pinTitle;
        const desc = note.pinDesc;
        const uid = note.pinId;

        pinnedNotes.appendChild(createPinnedNoteBox(uid, title, desc));
        console.log("created")
      });
    }
  } catch (err) {
    console.log(err)
  }
}


checkExistingPinnedNotes()
checkExistingNotes()




//function to pin note.......................................

function pinNote(noteId) {
  const foundNote = findNoteById(`${noteId}`);

  const initPinTask = new Promise((resolve, reject) => {
    let existingPinnedNotes = JSON.parse(localStorage.getItem('pinned')) || [];

    const newPinNote = {
      pinTitle: foundNote.title,
      pinDesc: foundNote.description,
      pinId: foundNote.id,
    };

    existingPinnedNotes.push(newPinNote)
    localStorage.setItem('pinned', JSON.stringify(existingPinnedNotes))
    console.log("pinned noted saved to local storage");
    resolve();
  })

  initPinTask.then(() => {
    document.getElementById(`${noteId}`).outerHTML = "";
    pinnedNotesCont.style.display = "flex";
    const pinTitle = foundNote.title;
    const pinDesc = foundNote.description;
    const pinId = foundNote.id;
    pinnedNotes.appendChild(createPinnedNoteBox(pinId, pinTitle, pinDesc));
    console.log("Styles applied");
  }).then(() => {
    deleteNoteById(`${noteId}`);
    console.log("orignal note deleted")
  }).then(() => {
    showNotification("Note pinned Successfuly !", "success");
  }).catch((err) => {
    showNotification("Unable to pin note!", "warn");
    console.log(err)
  })

}

// Function to add a new note to local storage
function addNote(title, description) {
  // Retrieve existing notes from local storage or initialize an empty array
  let existingNotes = JSON.parse(localStorage.getItem('notes')) || [];

  // Create a unique ID for the new note
  const noteId = Date.now().toString();

  // Create the new note object
    const newNote = {
    id: noteId,
    title: title,
    description: description
  };

  // Add the new note to the existing notes array
  existingNotes.push(newNote);

  // Store the updated array back into local storage
  localStorage.setItem('notes', JSON.stringify(existingNotes));

  // Return the ID of the newly added note
  //checkExistingNotes()
  return noteId;
}

// Example usage

//console.log('New note added with ID:', noteId);

function createNoteBox(id, title, desc) {
  const noteBox = document.createElement('div');
  noteBox.classList.add('note-item');
  noteBox.setAttribute('id', id);
  noteBox.innerHTML = `
    <h4 class="title">${title}</h4>
    <p class="description">${desc}</p>
    <div class="task-options">
        <i class="fa-solid fa-pen edit-note" onclick="editNote(${id})" ></i>
        <i class="fa-solid fa-trash" onclick="deleteNote(${id})"></i>
        <i onclick="showAlert()" class="fa-solid fa-palette"></i>
        <i class="fa-solid fa-thumbtack" onclick="pinNote(${id})"></i>
        <i onclick="showAlert()" class="fa-solid fa-tag"></i>
    </div>`;
  //console.log(noteBox)

  return noteBox;
}

function createPinnedNoteBox(id, title, desc) {
  const pinnedNoteBox = document.createElement('div');
  pinnedNoteBox.classList.add('note-item');
  pinnedNoteBox.setAttribute('id', id);
  pinnedNoteBox.innerHTML = `
    <h4 class="title">${title}</h4>
    <p class="description">${desc}</p>
    <div class="task-options">
        <i class="fa-solid fa-pen edit-note" onclick="editPinnedNote(${id})" ></i>
        <i class="fa-solid fa-trash" onclick="deletePinnedNote(${id})"></i>
        <i onclick="showAlert()" class="fa-solid fa-palette"></i>
       <i class="ri-unpin-fill" onclick="unpinNote(${id})"></i>
        <i onclick="showAlert()" class="fa-solid fa-tag"></i>
    </div>`;
  //console.log(pinnedNoteBox)

  return pinnedNoteBox;
}


function addPinNote(title, description) {
  // Retrieve existing notes from local storage or initialize an empty array
  let existingPinnedNotes = JSON.parse(localStorage.getItem('pinned')) || [];

  // Create a unique ID for the new note
  const noteId = Date.now().toString();

  // Create the new note object
  const newPinNote = {
    pinTitle: title,
    pinDesc: description,
    pinId: noteId,
  };

  existingPinnedNotes.push(newPinNote)
  localStorage.setItem('pinned', JSON.stringify(existingPinnedNotes))

  // Return the ID of the newly added note
  //checkExistingNotes()
  return noteId;
}




pintaskDone.addEventListener('click', () => {
  
  const initAddTask = new Promise((resolve, reject) => {
    addPinNote(document.getElementById('newPinNoteTitle').value, document.getElementById('pintextInput').value);
    resolve();

  })
  initAddTask.then(() => {
    pinnedNotes.innerHTML = "";
    checkExistingPinnedNotes();
  document.getElementById('newPinNoteTitle').value = "";
  document.getElementById('pintextInput').value = "";
  }).then(() => {
    document.getElementById("pin-note-big").style.display = "none";
    document.querySelector(".add-note-small").style.display = "flex";
    showNotification("Note Edited Successfuly !", "success");
  }).catch((err) => {
    showNotification("Unable to create note!", "warn");
    console.log(err)
  })

})




//edit pinneded note........................................
function editPinnedNote(noteId){
    const foundPinNote = findPinnedNoteById(`${noteId}`);
  console.log(`user trying to unpin note with id ${foundPinNote.pinId}..\n title: ${foundPinNote.pinTitle} \n description: ${foundPinNote.pinDesc}`);

  const initEditTask = new Promise((resolve, reject) => {
    document.getElementById(`${noteId}`).outerHTML = "";

    document.querySelector('.add-note-small').style.display = 'none';
    document.querySelector('#pin-note-big').style.display = 'flex';
    document.getElementById('newPinNoteTitle').value = foundPinNote.pinTitle;
      document.getElementById('pintextInput').value = foundPinNote.pinDesc;
    
    resolve();

  })

  initEditTask.then(() => {
    deletePinnedNoteById(`${noteId}`);
    
  }).then(() => {
    //showNotification("Note edited Successfuly !", "success");
  }).catch((err) => {
    showNotification("Unable to edit note!", "warn");
    console.log(err)
  })

  
}



//delete pinned task
function deletePinnedNoteById(noteIdToDelete) {
  // Retrieve the value of the 'notes' key from local storage
  let notesString = localStorage.getItem('pinned');

  // Parse the JSON string into a JavaScript object
  let notes = JSON.parse(notesString);

  // Filter out the note with the specified ID and keep remaining objects
  notes = notes.filter(note => note.pinId !== noteIdToDelete);

  // Update the 'notes' array in local storage
  localStorage.setItem('pinned', JSON.stringify(notes));

  console.log('Note deleted successfully.');
}

function deletePinnedNote(noteId){
  const foundPinNote = findPinnedNoteById(`${noteId}`);
  //console.log(`user trying to delete note with id ${foundPinNote.pinId}..\n title: ${foundPinNote.pinTitle} \n description: ${foundPinNote.pinDesc}`);

  const initDeleteTask = new Promise((resolve, reject) => {
    deletePinnedNoteById(`${noteId}`);
    resolve();
  })

  initDeleteTask.then(() => {
    pinnedNotes.innerHTML = "";
    checkExistingPinnedNotes();
    showNotification("Note deleted successfully", "warn");
  }).catch((err) => {
    showNotification("Unable to delete note", "warn");

  })
  
}

function unpinNote(noteId){
  const foundPinNote = findPinnedNoteById(`${noteId}`);
  const oldtitle = foundPinNote.pinTitle;
  const olddesc = foundPinNote.pinDesc;
  const initunpintask = new Promise((resolve,reject)=>{
   
    resolve();
  })
    initunpintask.then(()=>{
    addNote(oldtitle,olddesc);
    notesContainer.innerHTML = "";
    checkExistingNotes();
  }).then(()=>{
    deletePinnedNoteById(`${noteId}`)
    document.getElementById(`${noteId}`).outerHTML = "";
  }).then(()=>{
    showNotification( "Note unpinned successfully", "success");
  }).catch((err)=>{
    showNotification("Unable to unpin note", "warn");
      console.log(err)
  })
  
  //console.log(`user trying to unpin note with id ${foundPinNote.pinId}..\n title: ${foundPinNote.pinTitle} \n description: ${foundPinNote.pinDesc}`);
}