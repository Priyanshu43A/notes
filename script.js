let cut = document.getElementById("cut");
let search = document.getElementById("search");

search.addEventListener('input', () => {
  if (search.value.length > 0) {
    cut.style.display = "block";
  }
  else {
    cut.style.display = "none";
  }
});


search.addEventListener('focusin', () => {
  document.querySelector('.search-bar').classList.add('searching');
});

search.addEventListener('focusout', () => {
  document.querySelector('.search-bar').classList.remove('searching');
})

cut.addEventListener('click', () => {
  search.value = "";
  cut.style.display = "none";
});



let mobsearch = document.getElementById('mobsearch');
let firstDiv = document.getElementById('first');
let thirdDiv = document.getElementById('third');
let searchBar = document.querySelector('.mob-searchbar');
let input = document.getElementById('mob-input');
let mobcut = document.getElementById('mob-cut');
let back = document.getElementById('mob-back');


mobsearch.addEventListener('click', () => {
  mobsearch.style.display = 'none';
  firstDiv.style.display = 'none';
  thirdDiv.style.width = '100%';
  searchBar.style.display = 'flex';
  input.style.display = 'block';
  mobcut.style.display = 'hidden';
  back.style.display = 'block';
  console.log('clicked');
});

input.addEventListener('input', () => {
  console.log('tye')
  if (input.value.length > 0) {
    mobcut.style.display = "block";
  }
  else {
    mobcut.style.display = "none";
  }
});

mobcut.addEventListener('click', () => {
  input.value = "";
  mobcut.style.display = "none";
});


back.addEventListener('click', () => {
  mobsearch.style.display = 'block';
  firstDiv.style.display = 'flex';
  thirdDiv.style.width = '40%';
  searchBar.style.display = 'flex';
  input.style.display = 'none';
  mobcut.style.display = 'none';
  back.style.display = 'none';
  console.log('clicked');
});



const grid = () => {
  document.getElementById('view').innerHTML = '<i onclick="list()" class="fa-solid fa-table-list"></i>';
}


const list = () => {
  document.getElementById('view').innerHTML = '<i onclick="grid()" class="fa-solid fa-border-all"></i>';
}



function toggleBoolean(bool) {
    return !bool;
}

var expanded = false;
//let checkExpanded;
const handleMediaQuery = (mediaQuery)=>{
    if (mediaQuery.matches) {
        // Media query matches (viewport width is less than 600px)
        console.log('Small screen');
      return false;
    } else {
        // Media query does not match
        console.log('Large screen');
      return true;
    }
}

const mediaQuery = window.matchMedia('(max-width: 600px)');

const handelExpanded = handleMediaQuery(mediaQuery);




const menu = document.getElementById('menu');
const sidebar = document.querySelector('.sidebar');
const sidebarItem = document.querySelectorAll('.sidebar-item');

menu.addEventListener('click', () => {
  //console.log('clicked on menu');
   expanded = toggleBoolean(expanded);


  // Call handleMediaQuery function initially
  //console.log(handleMediaQuery(mediaQuery));
  if(handelExpanded == true){

    sidebar.style.position = 'static';

  }

  sidebar.classList.toggle('expandedSidebar');
  sidebarItem.forEach(item => {
    item.classList.toggle('expandedSidebarItem');
  })
});

function expand() {
  //const mediaQuery = window.matchMedia('(max-width: 600px)');

  if(handelExpanded == true){
    sidebar.style.position = 'absolute';
    sidebar.style.left = '0px';

  }
 
  sidebar.classList.add('expandedSidebar');
  sidebarItem.forEach(item => {
    item.classList.add('expandedSidebarItem');
  })
}

function shrink() {
  //const mediaQuery = window.matchMedia('(max-width: 600px)');

  if(handelExpanded == true){
    sidebar.style.position = 'static';
    sidebar.style.left = '0px';

  }
  sidebar.classList.remove('expandedSidebar');
  sidebarItem.forEach(item => {
    item.classList.remove('expandedSidebarItem');
  })
}



sidebar.addEventListener('mouseenter', () => {
  if (expanded == true) {
    //console.log('expanded')
  } else {

    expand();
  }

});

sidebar.addEventListener('mouseleave', () => {
  if (expanded == true) {
    //console.log('expanded')
  } else {

    shrink();
  }
});


const notesCont = document.querySelector('.notes-container');
notesCont.addEventListener('scroll', (e) => {
  document.querySelector('nav').classList.add('shadow')

  console.log('clicked on notes container', e);
});





const inputField = document.getElementById('textInput');
const pininputField = document.getElementById('pintextInput');


inputField.addEventListener('input', function(event) {
  adjustRows();
});

inputField.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    inputField.value += '\n'; // Append new line character
    adjustRows();
  } else if (event.key === 'Backspace' && inputField.rows > 1 && inputField.selectionStart === 0 && inputField.selectionEnd === 0) {
    event.preventDefault();
    inputField.rows -= 1; // Decrease rows by 1
  }
});

function adjustRows() {
  const newRows = inputField.value.split('\n').length;
  inputField.rows = newRows;
}


pininputField.addEventListener('input', function(event) {
  adjustPinRows();
});

pininputField.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    pininputField.value += '\n'; // Append new line character
    adjustPinRows();
  } else if (event.key === 'Backspace' && pininputField.rows > 1 && pininputField.selectionStart === 0 && pininputField.selectionEnd === 0) {
    event.preventDefault();
    pininputField.rows -= 1; // Decrease rows by 1
  }
});

function adjustPinRows() {
  const newRows = pininputField.value.split('\n').length;
  pininputField.rows = newRows;
}



const addInput = document.getElementById('add-input');

addInput.addEventListener('focusin', () => {
   
  document.querySelector('.add-note-small').style.display = 'none';
  document.querySelector('.add-note-big').style.display = 'flex';
  inputField.focus();

});

document.querySelector('#close').addEventListener('click', () => {
  document.querySelector('.add-note-small').style.display = 'flex';
  document.querySelector('.add-note-big').style.display = 'none';
  //inputField.focus();

});


const noteMenuBtns = document.querySelector('#menuBtns');

function fontstyle() {
  console.log('clicked on style');
  noteMenuBtns.innerHTML = '<i class="fa-solid fa-bold"></i> <i class="fa-solid fa-italic"></i> <i class="fa-solid fa-strikethrough"></i> <i class="fa-solid fa-underline"></i> <i class="fa-solid fa-align-left"></i> <i onclick="closefontstyle()" class="fa-solid fa-text-slash"></i>';
}

const pinnoteMenuBtns = document.querySelector('#pinmenuBtns');


function pinfontstyle() {
  console.log('clicked on style');
  pinnoteMenuBtns.innerHTML = '<i class="fa-solid fa-bold"></i> <i class="fa-solid fa-italic"></i> <i class="fa-solid fa-strikethrough"></i> <i class="fa-solid fa-underline"></i> <i class="fa-solid fa-align-left"></i> <i onclick="closepinfontstyle()" class="fa-solid fa-text-slash"></i>';
}


function closefontstyle() {
  console.log('clicked on style');
  noteMenuBtns.innerHTML = '<i class="fa-solid fa-bell"></i><i class="fa-solid fa-palette"></i> <i class="fa-regular fa-image"></i> <i class="fa-solid fa-box-archive"></i><i onclick="fontstyle()" id="text-style" class="fa-solid fa-font"></i> <i class="fa-solid fa-ellipsis-vertical"></i>';
}

function closepinfontstyle() {
  console.log('clicked on style');
  pinnoteMenuBtns.innerHTML = '<i class="fa-solid fa-bell"></i><i class="fa-solid fa-palette"></i> <i class="fa-regular fa-image"></i> <i class="fa-solid fa-box-archive"></i><i onclick="pinfontstyle()" id="text-style" class="fa-solid fa-font"></i> <i class="fa-solid fa-ellipsis-vertical"></i>';
}


const settings = document.getElementById('settings');

settings.addEventListener('click',()=>{
  document.querySelector('.setting-container').classList.toggle( 'hide');
})


function checkMode(){
  const isDarkModeOn = localStorage.getItem('darkMode');
 


  console.log(isDarkModeOn)
  if(isDarkModeOn == 'true'){
    document.getElementById("mode").innerHTML = "Disable Dark Mode";

      //document.body.classList.add('dark-mode');
      
      document.documentElement.style.setProperty('--primary-color', '#202124');
      document.documentElement.style.setProperty('--secondary-color', '#ffffff');
      document.documentElement.style.setProperty('--tertiary-color', '#3c3c3e');
       document.documentElement.style.setProperty('--hover-color', 'rgba(255, 255, 255, 0.12)'); // Update hover color to a lighter shade with the same opacity
      document.documentElement.style.setProperty('--background-color', '#41341c'); // Update background color to a darker shade
      document.documentElement.style.setProperty('--active-color', '#rgba(255, 255, 255, 0.12)');
    
  } else {
    document.getElementById("mode").innerHTML = "Enable Dark Mode";
     document.querySelector(".search-bar").style.background = "";

    document.documentElement.style.setProperty('--primary-color', '#fff');
    document.documentElement.style.setProperty('--secondary-color', '#202124');
    document.documentElement.style.setProperty('--tertiary-color', '#f1f3f4');
    document.documentElement.style.setProperty('--hover-color', 'rgba(60, 64, 67, 0.12)');
    document.documentElement.style.setProperty('--background-color', '#feefc3');
    document.documentElement.style.setProperty('--active-color', '#fcefc2');
  }
}

checkMode();


function controlMode(){
  const isDarkMode = localStorage.getItem('darkMode');
  //localStorage.setItem('darkMode', 'false');

  if(isDarkMode == 'true'){
    localStorage.setItem('darkMode', 'false');
    document.getElementById("mode").innerHTML = "Enable Dark Mode";
    document.documentElement.style.setProperty('--primary-color', '#fff');
    document.documentElement.style.setProperty('--secondary-color', '#202124');
    document.documentElement.style.setProperty('--tertiary-color', '#f1f3f4');
    document.documentElement.style.setProperty('--hover-color', 'rgba(60, 64, 67, 0.12)');
    document.documentElement.style.setProperty('--background-color', '#feefc3');
    document.documentElement.style.setProperty('--active-color', '#fcefc2');

  } else{
    localStorage.setItem('darkMode', 'true');
    document.getElementById("mode").innerHTML = "Disable Dark Mode";

    //document.body.classList.add('dark-mode');
    document.documentElement.style.setProperty('--primary-color', '#202124');
    document.documentElement.style.setProperty('--secondary-color', '#ffffff');
    document.documentElement.style.setProperty('--tertiary-color', '#3c3c3e');
     document.documentElement.style.setProperty('--hover-color', 'rgba(255, 255, 255, 0.12)'); // Update hover color to a lighter shade with the same opacity
    document.documentElement.style.setProperty('--background-color', '#41341c'); // Update background color to a darker shade
    document.documentElement.style.setProperty('--active-color', '#rgba(255, 255, 255, 0.12)');
  }
}






document.getElementById("mode").addEventListener("click",()=>{
  document.querySelector('.setting-container').classList.toggle( 'hide');

  controlMode();
})


const view = document.getElementById('view');


view.addEventListener('click', ()=>{
    
   document.querySelector(".note").classList.toggle('listView');

  
  document.querySelector(".pinned-notes").classList.toggle('listView');
})


function showAlert(){
   document.querySelector(".alert-box").style.display = "flex";
}


document.getElementById("cancel").addEventListener("click",()=>{
  document.querySelector(".alert-box").style.display = "none";
})