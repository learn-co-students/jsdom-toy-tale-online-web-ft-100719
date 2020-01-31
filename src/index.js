let addToy = false

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toys = document.getElementById('toy-collection')
  const submitButton = document.querySelector('input[type="submit"]')

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  fetch("http://localhost:3000/toys")
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      for (toy of json) {
        addToyToDOM(toy)
      }
    })

  function addToyToDOM(toy) {
    const div = document.createElement("div")
    div.setAttribute('class', 'card')
    const h2 = document.createElement('h2')
    h2.innerHTML = toy.name
    div.appendChild(h2)
    const img = document.createElement('img')
    img.setAttribute('src', toy.image)
    img.setAttribute('class', 'toy-avatar')
    div.appendChild(img)
    const p = document.createElement('p')
    p.setAttribute('id', `${toy.name}-likes`)
    p.innerHTML = `${toy.likes} likes`
    div.appendChild(p)
    const button = document.createElement('button')
    button.setAttribute('class', 'like-btn')
    button.addEventListener('click', function (e) {
      like(e, toy)
    })
    button.innerHTML = "Like <3"
    div.appendChild(button)
    toys.appendChild(div)
  }

  submitButton.addEventListener('click', function (e) {
    e.preventDefault()
    addToy = false
    toyForm.style.display = 'none'
    let toyDetails = document.querySelectorAll('input[type="text"')
    let toy = { likes: 0, name: toyDetails[0].value, image: toyDetails[1].value }
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toy)
    }

    fetch("http://localhost:3000/toys", configObj)
      .then(function (response) {
        return response.json()
      })
      .then(function (object) {
        addToyToDOM(object)
      })
    document.getElementsByClassName('add-toy-form')[0].reset()
  })

  function like(e, toy) {
    e.preventDefault()
    let newLikes = parseInt(toy.likes) + 1
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ "likes": newLikes })
    }

    fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
      .then(function (response) {
        return response.json()
      })
      .then(function (toy) {
        document.getElementById(`${toy.name}-likes`).innerHTML = `${toy.likes} likes`
      })
  }
})