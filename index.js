const initialCards = [
  {
    name: "Home Office Goals",
    link: "https://unsplash.com/photos/two-black-computer-monitors-on-black-table-p-xSl33Wxyc"
  },

  {
    name: "Financial Freedom",
    link: "https://unsplash.com/photos/100-us-dollar-bill-xYaMK5p3vCA"
  },

  {
    name: "Frequent Travels",
    link: "https://unsplash.com/photos/person-holding-passports-0QcSnCM0aMc"
  },

  {
    name: "Reliable Vehicle",
    link: "https://unsplash.com/photos/person-holding-on-black-steering-wheel-inside-car-rOLKpojjbGM"
  },

  {
    name: "Home Ownership",
    link: "https://unsplash.com/photos/gray-padded-chaise-couch-beside-window-rEJxpBskj3Q"
  },

  {
    name: "Dream Career",
    link: "https://unsplash.com/photos/woman-in-black-top-using-surface-laptop-glRqyWJgUeY"
  },
];

const editProfileButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const profileModal = document.querySelector("#edit-modal");
const profileForm = profileModal.querySelector(".modal__form");
const profileModalName = profileModal.querySelector("#modal-name");
const profileModalDescription = profileModal.querySelector("#modal-description");

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