let addToy = false;
const toysUrl = "http://localhost:3000/toys";

const newToyData = (name, imageUrl) => {
  return {
    name: name,
    image: imageUrl,
    likes: 0
  };
};

const patchToyData = likes => {
  return {
    likes: likes
  };
};

const configObj = (data, method) => {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  };
};
const fetchToys = () => {
  fetch(toysUrl)
    .then(parseJson)
    .then(renderToys);
};

const submitToy = (name, imageUrl) => {
  fetch(toysUrl, configObj(newToyData(name, imageUrl), "POST"))
    .then(parseJson)
    .then(renderToy);
};

const patchToy = (id, likes) => {
  fetch(toysUrl + `/${id}`, configObj(patchToyData(likes), "PATCH"))
    .then(parseJson)
    .then(renderToy);
};

const parseJson = response => {
  return response.json();
};

const renderToys = json => {
  const toyCollection = document.querySelector("#toy-collection");
  json.forEach(toy => {
    toyCollection.prepend(
      createToyCard(toy.id, toy.name, toy.image, toy.likes)
    );
  });
};

const renderToy = json => {
  const toyCard = document.querySelector(`#toyCard_${json.id}`);
  if (toyCard) {
      updateToyCard(json.id, json.name, json.image, json.likes)
  } else {
    const toyCollection = document.querySelector("#toy-collection");
    toyCollection.prepend(
      createToyCard(json.id, json.name, json.image, json.likes)
    );
  }
};

const createToyCard = (id, name, imageUrl, likes) => {
  const toyCard = document.createElement("div");
  toyCard.id = `toyCard_${id}`;
  toyCard.className = "card";
  toyCard.innerHTML = `<h2>${name}</h2>
    <img src='${imageUrl}' class="toy-avatar" />
    <p>${likes} Likes </p>`;
  toyCard.append(createLikeButton(id, likes));
  return toyCard;
};

const updateToyCard = (id, name, imageUrl, likes) => {
  const toyCard = document.querySelector(`#toyCard_${id}`);
  toyCard.innerHTML = `<h2>${name}</h2>
    <img src='${imageUrl}' class="toy-avatar" />
    <p>${likes} Likes </p>`;
  toyCard.append(createLikeButton(id, likes));
};

const createLikeButton = (id, likes) => {
  const likeButton = document.createElement("button");
  likeButton.className = "like-btn";
  likeButton.innerText = "Like <3";
  likes = likes + 1;
  likeButton.addEventListener("click", () => {
    patchToy(id, likes);
  });
  return likeButton;
};

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();

  const addToyForm = document.querySelector(".add-toy-form");
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");

  addToyForm.addEventListener("submit", e => {
    e.preventDefault();
    submitToy(addToyForm.name.value, addToyForm.image.value);
    e.target.reset();
  });

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
});
