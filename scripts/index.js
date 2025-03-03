const initialCards = [
  {
    name: "Home Office Goals",
    link: "https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },

  {
    name: "Financial Freedom",
    link: "https://images.unsplash.com/photo-1596313398625-2c16b75031b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },

  {
    name: "Frequent Travels",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg"
  },

  {
    name: "Reliable Vehicle",
    link: "https://images.unsplash.com/photo-1497564245203-66a1216f073a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },

  {
    name: "Home Ownership",
    link: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },

  {
    name: "Dream Career",
    link: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
];

const editProfileButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const profileModal = document.querySelector("#edit-modal");
const profileForm = profileModal.querySelector(".modal__form");
const profileModalName = profileModal.querySelector("#modal-name");
const profileModalDescription = profileModal.querySelector("#modal-description");

const addPostButton = document.querySelector(".profile__add-button");

const postModal = document.querySelector("#post-modal");
const postForm = postModal.querySelector(".modal__form");
const postModalLink = postModal.querySelector("#modal-link");
const postModalCaption = postModal.querySelector("#modal-caption");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardNameElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  const photoModal = document.querySelector("#photo-modal");
  const photoModalImage = photoModal.querySelector(".modal__image");
  const photoModalCaption = photoModal.querySelector(".modal__caption");

  const closePhotoButton = photoModal.querySelector(".modal__close-photo-button");

  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_liked")
  });

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    openModal(photoModal);
    photoModalCaption.textContent = data.name;
    photoModalImage.src = data.link;
    photoModalImage.alt = data.name;
  });

  closePhotoButton.addEventListener("click", () => {
    closeModal(photoModal);
  });

  return cardElement;
};

function openModal(modal) {
  modal.classList.add("modal_open");
};

editProfileButton.addEventListener("click", () => {
  openModal(profileModal);
  profileModalName.value = profileName.textContent;
  profileModalDescription.value = profileDescription.textContent;
});

addPostButton.addEventListener("click", () => {
  openModal(postModal);
});

const closeProfileButton = document.querySelector(".modal__close-button");
const closePostButton = postModal.querySelector(".modal__close-button");

function closeModal(modal) {
  modal.classList.remove("modal_open");
}

closeProfileButton.addEventListener("click", () => {
  closeModal(profileModal);
});

closePostButton.addEventListener("click", () => {
  closeModal(postModal);
});

function submitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileModalName.value;
  profileDescription.textContent = profileModalDescription.value;
  closeModal(profileModal);
}

profileForm.addEventListener("submit", submitProfile);

function addPost(evt) {
  evt.preventDefault();
  const inputValues = {name: postModalCaption.value, link: postModalLink.value};
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  closeModal(postModal);
}

postForm.addEventListener("submit", addPost);

initialCards.forEach(function (initialCards) {
  const cardElement = getCardElement(initialCards);
  cardsList.prepend(cardElement);
});