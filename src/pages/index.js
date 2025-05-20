import "./index.css";
import { enableValidation, resetValidation, disableButton, settings } from "../scripts/validation.js";
import Api from "../utils/Api.js";

// const initialCards = [
//   {
//     name: "Home Office Goals",
//     link: "https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//   },

//   {
//     name: "Financial Freedom",
//     link: "https://images.unsplash.com/photo-1596313398625-2c16b75031b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//   },

//   {
//     name: "Frequent Travels",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg"
//   },

//   {
//     name: "Reliable Vehicle",
//     link: "https://images.unsplash.com/photo-1497564245203-66a1216f073a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//   },

//   {
//     name: "Home Ownership",
//     link: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//   },

//   {
//     name: "Dream Career",
//     link: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//   },
// ];

const editProfileButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");

const profileModal = document.querySelector("#edit-modal");
const profileForm = document.forms["profile-form"];
const profileModalName = profileModal.querySelector("#modal-name");
const profileModalDescription = profileModal.querySelector("#modal-description");

const addPostButton = document.querySelector(".profile__add-button");

const postModal = document.querySelector("#post-modal");
const postForm = document.forms["post-form"];
const postSubmitButton = postModal.querySelector(".modal__submit-button");
const postModalLink = postModal.querySelector("#modal-link");
const postModalCaption = postModal.querySelector("#modal-caption");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const photoModal = document.querySelector("#photo-modal");
const photoModalImage = photoModal.querySelector(".modal__image");
const photoModalCaption = photoModal.querySelector(".modal__caption");

let selectedCard;
let selectedCardId;

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "dbd91921-c78f-4c03-af14-561b6abbc01c",
    "Content-Type": "application/json"
  }
});


api.getAppInfo()
.then(([cards, userInfo]) => {
  cards.forEach(function (initialCards) {
  renderCard(initialCards);
});
  profileAvatar.src = userInfo.avatar;
  profileName.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
})
.catch(console.error);




function getCardElement(data) {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardNameElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  const deleteModal = document.querySelector("#delete-modal");
  const deleteForm = deleteModal.querySelector("#delete-form");
  const cancelDeleteButton = deleteModal.querySelector(".modal__cancel-button");

  // if card is liked, set active class to card

  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  function handleLike(evt, cardId) {
    const isLiked = evt.target.classList.contains("card__like-button_liked");
    api.changeLikeStatus(cardId, isLiked)
        .then((res) => {
            evt.target.classList.toggle("card__like-button_liked");
        })
        .catch(console.error);
}

  cardLikeButton.addEventListener("click", (evt) => handleLike(evt, data._id));

  cardDeleteButton.addEventListener(
    "click",
    () => handleDeleteCard(cardElement, data._id)
  );

  function handleDeleteCard(cardElement, cardId) {
    selectedCard = cardElement;
    selectedCardId = cardId;
    openModal(deleteModal);
  }

  function handleDeleteSubmit(evt) {
    evt.preventDefault();
  api
  .deleteCard(selectedCardId)
  .then(() => {
    selectedCard.remove();
    closeModal(deleteModal);
  })
  .catch(console.error);
  };

  deleteForm.addEventListener("submit", handleDeleteSubmit);

  cancelDeleteButton.addEventListener("click", () => closeModal(deleteModal));

  cardImageElement.addEventListener("click", () => {
    openModal(photoModal);
    photoModalCaption.textContent = data.name;
    photoModalImage.src = data.link;
    photoModalImage.alt = data.name;
  });

  return cardElement;
};



function openModal(modal) {
  modal.classList.add("modal_open");
  modal.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleEscapeKey);
};

editProfileButton.addEventListener("click", () => {
  openModal(profileModal);
  profileModalName.value = profileName.textContent;
  profileModalDescription.value = profileDescription.textContent;
  resetValidation(profileForm, [profileModalName, profileModalDescription], settings);
});

addPostButton.addEventListener("click", () => {
  openModal(postModal);
});

const closeButtons = document.querySelectorAll(".modal__close-button");

function closeModal(modal) {
  modal.classList.remove("modal_open");
  modal.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleEscapeKey);
}

closeButtons.forEach((button) => {
 const popup = button.closest('.modal');
 button.addEventListener('click', () => closeModal(popup))
});

function handleEscapeKey(e) {
  if (e.key === "Escape") {
    const currentModal = document.querySelector(".modal_open");
    closeModal(currentModal);
  }
};

function handleClickOutside(e) {
  if (e.target.classList.contains("modal")) {
    closeModal(e.target);
  };
};

function submitProfile(evt) {
  evt.preventDefault();
  api.editUserInfo({name: profileModalName.value, about: profileModalDescription.value})
  .then((data) => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    closeModal(profileModal);
  })
  .catch(console.error);
}

profileForm.addEventListener("submit", submitProfile);

function addPost(evt) {
  evt.preventDefault();
  api.addNewPost({name: postModalCaption.value, link: postModalLink.value})
  .then((data) => {
  const inputValues = {name: postModalCaption.value, link: postModalLink.value};
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  evt.target.reset();
  disableButton(postSubmitButton, settings);
  closeModal(postModal);
  })
  .catch(console.error);
}

postForm.addEventListener("submit", addPost);



function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[ method ](cardElement);
};

enableValidation(settings);