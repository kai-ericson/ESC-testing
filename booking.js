const openModalBtn = document.querySelector(".bookingModal__open");
const datesContainer = document.querySelector(".bookingModal_noTime");
const bookModal = document.querySelector(".bookRoom");

let dateValue = ""
let bookingId = ""
let test = ""
let minPart = 0;
let maxPart = 0;

const bookDate = document.querySelector(".bookingModal__input");
const timesToBook = [];

bookDate.addEventListener("change", () => {
  const dateToBook = bookDate.value;
  dateValue = dateToBook;
});

openModalBtn.addEventListener('click', async () => {

  try {
    const url = "https://lernia-sjj-assignments.vercel.app/api/booking/available-times?";
    const urlWithParam = url + "date=" + dateValue + "&challenge=" + bookingId;
    test = urlWithParam;
    const response = await fetch(urlWithParam);
    const data = await response.json();
    const date = data.slots;
    timesToBook.length = 0;
    data.slots.forEach(time => {
      timesToBook.push(time);
    });
    const interval = 1;
    const length = (maxPart - minPart) / interval + 1;
    const participants = Array.from({ length }, (_, i) => minPart + i * interval);
    creatPartList(participants);
    creatTimeList(timesToBook);

    if (date.length > 0) {
      bookModal.style.display = 'flex';
    } else {
      datesContainer.textContent = 'No available dates found.';
    }
  } catch (error) {
    datesContainer.textContent = 'Failed to load available dates.';
  }
});

const bookingModal = document.querySelector(".bookingModal");
const closeModalBtn = document.querySelector(".bookingModal__close");

closeModalBtn.addEventListener('click', () => {
  bookingModal.style.display = 'none';
});

const closeBookRoom = document.querySelector(".bookRoom__close");

closeBookRoom.addEventListener("click", () => {
  bookModal.style.display = "none";
  participants.lenght = 0;
});

closeBookRoom.addEventListener("click", () => {
  bookModal.style.display = "none";
});

const bookTime = document.querySelector(".bookRoom__input__time");
const selTime = document.getElementById("selTime");

function creatTimeList(time) {
  selTime.innerHTML = "";
  time.forEach(t => {
    const times = document.createElement("option");
    times.innerHTML = t;
    selTime.appendChild(times);
  });
}

bookTime.addEventListener("input", () => {
  const timeToBook = bookTime.value;
});

const inputParticipants = document.getElementById("participants");
const partList = document.getElementById("selPart");

function creatPartList(part) {
  partList.innerHTML = "";
  part.forEach(delt => {
    const option = document.createElement("option");
    option.innerHTML = delt;
    partList.appendChild(option);
  });
}

const inputName = document.querySelector(".bookRoom__input__name");
inputName.addEventListener("input", checkName);

function checkName() {
  const nameToBook = inputName.value;
  return nameToBook;
};

const inputEmail = document.querySelector(".bookRoom__input__email");
inputEmail.addEventListener("input", checkEmail);

function checkEmail() {
  const emailToBook = inputEmail.value;
  return emailToBook;
};

const inputPhone = document.querySelector(".bookRoom__input__phone");
inputPhone.addEventListener("input", checkPhone);

function checkPhone() {
  const phoneToBook = inputPhone.value;
  const check = /^[0-9]{10}$/
  if (check.test(phoneToBook)) {
    return phoneToBook;
  } else {
    return false;
  }
}

const thankYou = document.querySelector(".submitBooking");
const submitBooking = document.querySelector(".bookRoom__submit");

submitBooking.addEventListener("click", checkinput);

function checkinput() {
  const name = checkName();
  const email = checkEmail();
  const phone = checkPhone();

  if (name.trim().length > 0 && email.trim().length > 0 && phone !== false) {
    thankYou.style.display = 'flex';
  } else {
    if (name.trim().length == 0) {
      alert("Enter correct name!");
    }
    if (email.trim().length == 0)
      alert("Enter correct email!");
  }
  if (phone == false) {
    alert("Enter correct mobilenumber");
  }
}


