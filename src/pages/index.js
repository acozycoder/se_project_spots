import "./index.css";
import { enableValidation, resetValidation, disableButton, settings } from "../scripts/validation.js";
import Api from "../utils/Api.js";
import { setButtonText } from "../utils/helpers.js";

const editProfileButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const profileAvatar = document.querySelector(".profile__avatar");
const editAvatarButton = document.querySelector(".profile__avatar-button");
const avatarModal = document.querySelector("#avatar-modal");
const avatarInput = avatarModal.querySelector("#modal-avatar");
const avatarForm = document.forms["avatar-form"];

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

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector("#delete-form");
const cancelDeleteButton = deleteModal.querySelector(".modal__cancel-button");


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
  renderCard(initialCards, "append");
});
  profileAvatar.src = userInfo.avatar;
  profileName.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
})
.catch(console.error);

function handleLike(evt, cardId) {
  const isLiked = evt.target.classList.contains("card__like-button_liked");
  api.changeLikeStatus(cardId, isLiked)
  .then((res) => {
    evt.target.classList.toggle("card__like-button_liked");
    })
  .catch(console.error);
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
    evt.preventDefault();

    const submitButton = evt.submitter;
    setButtonText(submitButton, true, "Delete", "Deleting...");

    api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
    setButtonText(submitButton, false, "Delete", "Deleting...");
    })
};

cancelDeleteButton.addEventListener("click", () => closeModal(deleteModal));
deleteForm.addEventListener("submit", handleDeleteSubmit);

function getCardElement(data) {
  const cardElement = cardTemplate.content.cloneNode(true).querySelector('.card');
  const cardNameElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  cardLikeButton.addEventListener("click", (evt) => handleLike(evt, data._id));

  cardDeleteButton.addEventListener(
      "click",
      () => handleDeleteCard(cardElement, data._id)
  );

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

  const submitButton = evt.submitter;
  setButtonText(submitButton, true, "Save", "Saving...");

  api.editUserInfo({name: profileModalName.value, about: profileModalDescription.value})
  .then((data) => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    closeModal(profileModal);
  })
  .catch(console.error)
  .finally(() => {
    setButtonText(submitButton, false, "Save", "Saving...");
  });
}

profileForm.addEventListener("submit", submitProfile);

editAvatarButton.addEventListener("click", () => {
  openModal(avatarModal);
});

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  setButtonText(submitButton, true, "Save", "Saving...");

  api.changeUserAvatar(avatarInput.value)
  .then((data) => {
    profileAvatar.src = data.avatar;
    evt.target.reset();
    disableButton(submitButton, settings);
    closeModal(avatarModal);
  })
  .catch(console.error)
  .finally(() => {
    setButtonText(submitButton, false, "Save", "Saving...");
  });
}

avatarForm.addEventListener("submit", handleAvatarSubmit);

function addPost(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  setButtonText(submitButton, true, "Save", "Saving...");

  api.addNewPost({name: postModalCaption.value, link: postModalLink.value})
  .then((data) => {
  renderCard(data);
  evt.target.reset();
  disableButton(postSubmitButton, settings);
  closeModal(postModal);
  })
  .catch(console.error)
  .finally(() => {
    setButtonText(submitButton, false, "Save", "Saving...");
  });
}

postForm.addEventListener("submit", addPost);



function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[ method ](cardElement);
};

enableValidation(settings);