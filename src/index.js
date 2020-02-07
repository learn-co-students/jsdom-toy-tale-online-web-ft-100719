let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      document.querySelector(".add-toy-form").addEventListener("submit", (e)=> {
        e.preventDefault();
        addToys(e);
      } )
    } else {
      toyForm.style.display = 'none'
    }
  })
  displayToys();
  
  
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

  toyLikes();
}

function addToys(e){
  const toy = {
    name: e.target.name.value,
    image: e.target.image.value ,
    likes: 0
  }

  let add = document.querySelector(".submit");
  add.addEventListener("click", function(e){
    e.preventDefault();
    fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(toy)
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
      let toLike = toy.querySelector(".like-btn")
      toLike.addEventListener("click", (e) => {
        //e.preventDefault();
        let newnum = toy.querySelector('p')
        let total = toy.querySelector('p').innerText.split(" ")[1]
        let integer =  parseInt(total, 10);
        var newtotal = 0;
        newtotal += (integer + 1) ;
        newnum.innerHTML = `Likes: ${newtotal}`
        //console.log(newtotal)
    })
    
  })
}