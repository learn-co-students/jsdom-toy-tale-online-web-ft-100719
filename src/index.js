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

  const newToyForm = document.querySelector('.add-toy-form')
  const newToySubmit = newToyForm.querySelector('.submit')

  newToySubmit.addEventListener('click', (event) =>{
    event.preventDefault()
    let newToyName = newToyForm.querySelectorAll('.input-text')[0]
    let newToyImg = newToyForm.querySelectorAll('.input-text')[1]
    let newToyNameVal = newToyName.value
    let newToyImgVal = newToyImg.value

    let configObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: newToyNameVal,
        image: newToyImgVal,
        likes: 0
      })
    }
    return fetch("http://localhost:3000/toys", configObject)
      .then(resp => resp.json())
  })

  const createToyCard = (toy) => {
    let div = document.createElement('div')
    let h2Tag = document.createElement('h2')
    let imgTag = document.createElement('img')
    let pTag = document.createElement('p')
    let buttonTag = document.createElement('button')

    div.setAttribute('class', 'card')
    h2Tag.textContent = toy["name"]
    imgTag.setAttribute('class', 'toy-avatar')
    imgTag.src = toy["image"]
    pTag.textContent = `${toy["likes"]} people liked this`
    buttonTag.textContent = "Like <3"
    buttonTag.setAttribute('class', 'like-btn')

    buttonTag.addEventListener('click', event =>{
      event.preventDefault()

      let likes = parseInt(event.target.previousElementSibling.innerText)
      likes += 1

      let configObject = {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: likes
      })
      }

      fetch(`http://localhost:3000/toys/${toy["id"]}`, configObject)
        .then(resp => resp.json())
        .then(toy => {
          event.target.previousElementSibling.innerText = `${toy["likes"]} people liked this`
        })

      pTag.textContent = `${toy["likes"]} people liked this`
    })

    let allContent = [h2Tag, imgTag, pTag, buttonTag]

    allContent.forEach(tag => {
      div.appendChild(tag)
    })
    return div
  }

  const renderToy = toy => {
    let div = createToyCard(toy)
    document.getElementById('toy-collection').appendChild(div)
  }

  return fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toy => {
      toy.forEach(toy => renderToy(toy))
    })

})
