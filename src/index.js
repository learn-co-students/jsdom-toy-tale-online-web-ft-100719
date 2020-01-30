let addToy = false

function getToys(){
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(obj => renderToys(obj))
    .catch(error => alert(error.message))
}

function renderToys(toys){
  for(toy of toys){
    toyCreation(toy)
  }
}

function toyCreation(toy){
  let toyCollection = document.getElementById("toy-collection")
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
          // listen for clicks on like button etc 
          likeButton.addEventListener("click", () => {
            let toyUrl = likeButton.attributes["href"].value
            let toyLikes = likes.innerText  
            updateLikes(toyUrl, toyLikes)
          })
          toyDiv.appendChild(likeButton)
          toyCollection.appendChild(toyDiv)
}

// Methods to add likes to toys 
function updateLikes(toyURL, toyLikes){
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
  .then(obj => addLikes(obj))
}

function addLikes(toy){
  let toyDiv = document.getElementById(toy["name"])
  let likes = toyDiv.getElementsByTagName("p")
  likes[0].innerText = toy["likes"] 
}

//Methods to add a new toys

  function addNewToy(name,imageUrl){

    let formData = {
      "name": name,
      "image": imageUrl,
      "likes": "0"
    }
    
    let config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }

    fetch("http://localhost:3000/toys", config)
      .then(resp => resp.json())
      .then(toy => {
        toyCreation(toy)
      })
      .catch((err, blah) => {
        alert(err)
        alert(blah)
      })
  }

  // this method listens for toy submission clicks and handles submission
  function createNewToys() {
    let newToyForm = document.getElementsByClassName("add-toy-form")[0]
    let submit = newToyForm.getElementsByClassName("submit")[0]
    submit.addEventListener("click", (event) => {
      let toyName = newToyForm.children["name"].value
      let imageUrl = newToyForm.children["image"].value
      addNewToy(toyName,imageUrl)
      newToyForm.children["name"].value = ""
      imageUrl = newToyForm.children["image"].value = ""
      event.preventDefault()
      // submit onclick currently returning fetch failure? 
    })
  }


document.addEventListener("DOMContentLoaded", ()=>{

  getToys();
  createNewToys();

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
