let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-toy-btn");
    const toyForm = document.querySelector(".container");
    addBtn.addEventListener("click", () => {
        // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
            toyForm.style.display = "block";
        } else {
            toyForm.style.display = "none";
        }
    });
    //execute function for code to work - this happens first
    fetchToys()
    addNewToy()
});


//MY CODE

//this happens second - need toys BEFORE iterating through them
function fetchToys() {
    fetch("http://localhost:3000/toys")
        .then(resp => resp.json())
        //.then(data => console.log(data))
        .then(toys => {
            //iterate through toys - this happens third
            toys.forEach(toy => displayToy(toy))
        })
}

//this happens fourth
function displayToy(toy) {
    //display each toy on page
    //attach to DOM
    let toyCollection = document.querySelector("#toy-collection")
    toyCollection.innerHTML += toyCard(toy)
}

//this happens fifth
function toyCard(toy) {
    //backticks to do string interpolation
    //html template for card
    return ` 
  <div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} </p>
    <button class="like-btn">Like <3</button>
  </div>
`
}

function addNewToy() {
    //first grabbing form, then adding eventListener
    const newToyForm = document.querySelector(".add-toy-form")
    newToyForm.addEventListener('submit', function(e) {
        e.preventDefault()
        let newToyName = newToyForm.querySelectorAll('.input-text')[0].value
        let newToyImage = newToyForm.querySelectorAll('.input-text')[1].value
            //post request instead of get - to grab info in form and post to page
        fetch("http://localhost:3000/toys", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    name: `${newToyName}`,
                    image: `${newToyImage}`,
                    likes: 0
                })
            }).then(resp => resp.json())
            .then(data => displayToy(data))
            //reset form after submission
        newToyForm.reset()
    })
}