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
    link: "https://images.unsplash.com/photo-1553697388-94e804e2f0f6?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardNameElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");

  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  return cardElement;
}

function openModal() {
  profileModalName.value = profileName.textContent;
  profileModalDescription.value = profileDescription.textContent;
  profileModal.classList.add("modal_open");
}

editProfileButton.addEventListener("click", openModal);

const closeProfileButton = document.querySelector(".modal__close-button");

function closeModal() {
  profileModal.classList.remove("modal_open");
}

closeProfileButton.addEventListener("click", closeModal);

function submitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileModalName.value;
  profileDescription.textContent = profileModalDescription.value;
  closeModal();
}

profileForm.addEventListener("submit", submitProfile);

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardsList.prepend(cardElement);
}