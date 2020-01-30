let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  fetchToys();

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        createToy(e.target) })
      } else {
      toyForm.style.display = 'none'
    }
  })

})

function fetchToys() {
  const toysUrl = "http://localhost:3000/toys"
  return fetch(toysUrl)
  .then((response) => response.json())
  .then((toysData) => {
    toysData.forEach((toy) => renderToy(toy));
  }); 
}

function renderToy(myToy) {
  const toyCollection = document.getElementById('toy-collection');

  let toyCard = document.createElement('div');
  toyCard.setAttribute('class', 'card')
  //////
  let h2 = document.createElement('h2')
  h2.innerText = myToy.name

  let img = document.createElement('img')
  img.setAttribute('src', myToy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${myToy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', myToy.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    //console.log(e.target.dataset);
    likes(e)
  })

  toyCard.append(h2, img, p, btn)
  
  // //////
  //   toyCard.innerHTML += `
  //   <div class="card" id="toy-${myToy.id}">
  //   <h2> ${myToy.name} </h2>
  //   <img src="${myToy.image}" class="toy-avatar"/>
  //   <p> ${myToy.likes} Likes </p>
  //   <button class="like-btn">Like </button>
  //   ` 
    toyCollection.appendChild(toyCard);
    toyCard.addEventListener('click', (e) => {
      likes(e)
    });
}

function createToy (toyData) {
    let formData = {
        name: toyData.name.value,
        image: toyData.image.value,
        likes: 0
      };
       
      let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      };
       
      return fetch("http://localhost:3000/toys", configObj)
        .then(function(response) {
          return response.json();
        })
        .then(function(object) {
          renderToy(object)
        })
        .catch(function(error) {
            console.log("Unexpected error");
        });
}

function likes(myToy){
  myToy.preventDefault();
  let thisId = myToy.target.id;
  let updateUrl = `http://localhost:3000/toys/${thisId}`
  let likesPhrase = myToy.target.previousElementSibling.innerText; 
  let numLikes = parseInt(likesPhrase) + 1
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": numLikes
    })
  };
   
  return fetch(updateUrl, configObj)
    .then(function(response) {
      return response.json();
    })
    .then(object => {
      fetchToys();
    })
    .catch(function(error) {
        console.log("Unexpected error");
    });
}
