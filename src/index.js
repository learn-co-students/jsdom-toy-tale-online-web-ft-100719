let addToy = false

function getToys(){
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(obj => renderToys(obj))
    .catch(error => alert(error.message))
}

function renderToys(toys){
  let toyCollection = document.getElementById("toy-collection")
  for(toy of toys){
    let toyDiv = document.createElement("div")
    toyDiv.classList.add("card")
    toyDiv.id = toy["name"]
    let heading = document.createElement("h2")
    toyDiv.appendChild(heading)
    heading.innerText = toy["name"]
    let image = document.createElement("img")
    image.classList.add("toy-avatar")
    image.src = `${toy["image"]}`
    toyDiv.appendChild(image)
    let likes = document.createElement("p")
    likes.innerText = toy["likes"]
    toyDiv.appendChild(likes)
    let likeButton = document.createElement("button")
    likeButton.innerText = "Like"
    likeButton.classList.add("like-btn")
    likeButton.setAttribute("href", `http://localhost:3000/toys/${toy["id"]}`)
    likeButton.addEventListener("click", () => {
      let toyUrl = likeButton.attributes["href"].value
      let toyLikes = likes.innerText  
      addLikes(toyUrl, toyLikes)
    })
    toyDiv.appendChild(likeButton)
    toyCollection.appendChild(toyDiv)
  }
}

function addLikes(toyURL, toyLikes){
  fetch(toyURL, {
    method: "PATCH",
    headers: 
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": `${parseInt(toyLikes) + 1}`
    })
  }) 
  .then(resp => resp.json())
  .then(obj => updateLikes(obj))
}

function updateLikes(toy){
  let toyDiv = document.getElementById(toy["name"])
  let likes = toyDiv.getElementsByTagName("p")
  likes[0].innerText = toy["likes"] 
}

document.addEventListener("DOMContentLoaded", ()=>{

  getToys();

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
})
