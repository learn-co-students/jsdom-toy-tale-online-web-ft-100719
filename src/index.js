let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then((toys) => {
      toyCollectionDiv = document.getElementById("toy-collection");
      for (const toy of toys) {
        toyCollectionDiv.appendChild(createToyCard(toy));
      }
    });


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

  const actualToyForm = document.querySelector(".add-toy-form");
  actualToyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": actualToyForm.querySelector('[name="name"]').value,
        "image": actualToyForm.querySelector('[name="image"]').value,
        "likes": 0
      })
    })
      .then(resp => resp.json())
      .then(newToy => {
        if (newToy) {
          document.getElementById("toy-collection").appendChild(createToyCard(newToy));
        }
      });
    actualToyForm.reset();
  }, false);
});



function createToyDiv() {
  div = document.createElement("div");
  div.classList.add("card");
  return div;
}

function createToyCard(toy) {
  div = createToyDiv();

  h2 = document.createElement("h2");
  h2.textContent = toy.name;
  div.appendChild(h2);

  img = document.createElement("img");
  img.setAttribute("src", toy.image);
  img.classList.add("toy-avatar");
  div.appendChild(img);

  p = document.createElement("p");
  p.setAttribute("data-toy-name", toy.name);
  p.textContent = `${toy.likes} Likes `;
  div.appendChild(p);

  btn = document.createElement("button");
  btn.classList.add("like-btn")
  btn.innerHTML = "Like <3";
  btn.addEventListener("click", () => {
    document.querySelector(`[data-toy-name="${toy.name}"]`).textContent = `${toy.likes + 1} Likes `;
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify({
        "likes": toy.likes + 1
      })
    })
  });
  div.appendChild(btn);

  return div;
}
