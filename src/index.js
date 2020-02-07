let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  displayToys();
  addToys();
  toyLikes();
})


function displayToys(){
  fetch("http://localhost:3000/toys")
  .then(response => {
    return response.json(); 
  })
  .then((myJson) => {
      myJson.forEach(toy => { renderToy(toy);
        
      })
  })
}

function renderToy(toy){
  let toyCards = document.getElementById("toy-collection");
  toyCards.innerHTML += `<div class='card' id="toy-${toy.id}">
  <h2> Name: ${toy.name}</h2>
  <img class="toy-avatar" src="${toy.image}" >
  <p> Likes: ${toy.likes}</p>
  <button class="like-btn" type="button"> Like! </button>
  </div>`
}

function addToys(){
  let form = document.querySelector(".add-toy-form");
  const toy = {
    name: form.name.value,
    image: form.image.value ,
    likes: 0
  }

  let add = document.querySelector(".submit");
  add.addEventListener("click", function(e){
    e.preventDefault();
    fetch("http://localhost:3000/toys", {
      method: 'POST',
      body: JSON.stringify(toy),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => {
      return response.json(); 
    })
    .then((myJson) => {
        myJson.forEach(toy => { renderToy(toy);
          
        })
    })
  })
}

function toyLikes(){
  let toyCards = document.querySelectorAll(".card");
     toyCards.forEach( toy => {
       let likes = toy.querySelector(".like-btn")
       likes.addEventListener("click", function(e){
         console.log("e", e)
     })
  })
}