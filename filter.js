const closeButton = document.querySelector('.alternative__close');
const filterMenu = document.querySelector('.filter__alternative');
let starFromValue = 0;
let starToValue = 0; 
const filteredByAll = [];
import {
  challengesList,
  createRooms,  
} from './challenges.js';

const noMatchesText = document.querySelector('.book__filtered');
noMatchesText.style.display = 'none';

closeButton.addEventListener('click', () => {
  filterMenu.setAttribute('class', 'close');
  openButton.setAttribute('class', 'filter__button');
});

const openButton = document.querySelector('.filter__button');

openButton.addEventListener('click', () => {
  filterMenu.setAttribute('class', 'filter__alternative--open');
  openButton.setAttribute('class', 'close');
});

const starFrom = document.querySelectorAll('.star__from');

starFrom.forEach((star, index) => {
  star.addEventListener('click', () => {    
    starFrom.forEach((star, secondIndex) => {      
      if (index == 0) {
        const log = star.getAttribute('class');
        if (
          log == 'rating__star star__from fa-solid fa-star rating__star--filled'
        ) {
          star.classList.remove('rating__star--filled');
        } else if (index >= secondIndex) {
          star.classList.add('rating__star--filled');          
        }
      } else if (index >= secondIndex) {
        star.classList.add('rating__star--filled');        
      } else {
        star.classList.remove('rating__star--filled');
      }
    });
    updateStarValues();    
    createByRatingArray();
  });


});

const starTo = document.querySelectorAll('.star__to');

starTo.forEach((stars, place) => {
  stars.addEventListener('click', () => {           
    starTo.forEach((stars, secondPlace) => {       
      if (place == 0) {
        const check = stars.getAttribute('class');
        if (
          check == 'rating__star star__to fa-solid fa-star rating__star--filled'
        ) {
          stars.classList.remove('rating__star--filled');
        } else if (place >= secondPlace) {
          stars.classList.add('rating__star--filled');
        }
      } else if (place >= secondPlace) {
        stars.classList.add('rating__star--filled');
      } else {
        stars.classList.remove('rating__star--filled');
      }
    });
    updateStarValues();    
    createByRatingArray();

  });
});

const onSiteCheckbox = document.querySelector('.type__onsite');
const taged = document.querySelectorAll('.tags__label');

const filterTaged = [];
let tagedFilterd = [];
taged.forEach((tag) => {
  tag.addEventListener('click', async () => {
    const checkLabel = tag.getAttribute('class');
    const controllLabel = 'tags__label';
    const newLabel = 'tags__label--clicked';
    const innerTage = tag.textContent.toLowerCase();
    if (checkLabel === controllLabel) {
      tag.classList.add(newLabel);
      filterTaged.push(innerTage);
    } else {
      tag.classList.remove(newLabel);
      const index = filterTaged.indexOf(innerTage);
      filterTaged.splice(index, 1);
    }

    tagedFilterd = challengesList.filter((challenge) =>
      challenge.labels.some((label) => filterTaged.includes(label))
    );
    filterChallenges();
  });
});

document.querySelector('.keyword__input').addEventListener('keyup', () => {
  filterText();
});
const filteredByText = [];

async function filterText() {
  const input = document.querySelector('.keyword__input');
  const text = input.value;
  filteredByText.length = 0;
  challengesList.forEach((challenge) => {
    if (
      challenge.title.toLowerCase().includes(text.toLowerCase()) ||
      challenge.description.toLowerCase().includes(text.toLowerCase())
    ) {
      filteredByText.push(challenge);
    }
  });
  if (filteredByText.length == 0) {
    filteredByText.push('1');
  }
  filterChallenges();
}
const filterByRating = [];
window.filterByRating = filterByRating;
function createByRatingArray() {
  filterByRating.length = 0;
  challengesList.forEach((challenge) => {
    if (challenge.rating >= starFromValue && challenge.rating <= starToValue) {
      filterByRating.push(challenge);
    }
  });
  window.filterByRating = filterByRating;
  if (starFromValue == 0 && starToValue == 0) {
    filterByRating.length = 0;
  }
  if (starFromValue > starToValue) {
    filterByRating.length = 0;
    createRooms(filterByRating);
    noMatchesText.innerHTML = "No matching challenges. Second rating must be higher or equal than first"
    noMatchesText.style.display = 'grid';
    return;
  }
  if (filterByRating.length == 0 && starToValue == 5 && starFromValue == 5) {
    createRooms(filterByRating);
    noMatchesText.style.display = 'grid';
  } else {
    noMatchesText.innerHTML = "No matching challenges."
    filterChallenges();
  }
}
function updateStarValues() {     
    const ratingFromElement = document.querySelectorAll('.rating__to > *');
    const ratingToElement = document.querySelectorAll('.rating__from > *');
    starFromValue = 0;
    starToValue = 0;     
    ratingFromElement.forEach((element) => {
      if (element.classList.length === 4) {
        starFromValue++;      
      }
    });
    ratingToElement.forEach((element) => {
      if (element.classList.length === 4) {
        starToValue++;      
      }
    });
    starFromValue = 5 - starFromValue;
    starToValue = 5 - starToValue;
    console.log("starFromValue" + starFromValue);
    console.log("starToValue" + starToValue);    
};

const bytypeArray = [];

document.querySelector('.type__online').addEventListener('click', () => {
  bytypeFilter();
});
document.querySelector('.type__onSite').addEventListener('click', () => {
  bytypeFilter();
});

async function bytypeFilter() {
  bytypeArray.length = 0;
  const onlineChecked = document.querySelector('.type__online').checked;
  const onsiteChecked = document.querySelector('.type__onSite').checked;

  challengesList.forEach((challenge) => {
    if (
      (onlineChecked && challenge.type === 'online') ||
      (onsiteChecked && challenge.type === 'onsite')
    ) {
      bytypeArray.push(challenge);
    }
  });
  filterChallenges();
}
async function filterChallenges() {
  noMatchesText.style.display = 'none';
  filteredByAll.length = 0;
  challengesList.forEach((challenge) => {
    if (filteredByText[0] == '1') {
      filteredByAll.push(challenge);
    } else if (
      !filteredByText.includes(challenge) &&
      filteredByText.length != 0 &&
      !filteredByAll.includes(challenge)
    ) {
      filteredByAll.push(challenge);
    }
    if (
      !filterByRating.includes(challenge) &&
      filterByRating.length != 0 &&
      !filteredByAll.includes(challenge)
    ) {
      filteredByAll.push(challenge);
    }
    if (
      !tagedFilterd.includes(challenge) &&
      filterTaged.length != 0 &&
      !filteredByAll.includes(challenge)
    ) {
      filteredByAll.push(challenge);
    }
    if (
      !bytypeArray.includes(challenge) &&
      bytypeArray.length != 0 &&
      !filteredByAll.includes(challenge)
    ) {
      filteredByAll.push(challenge);
    }
  });
  const shownChallenges = [];
  challengesList.forEach((challenge) => {
    shownChallenges.push(challenge);
  });
  filteredByAll.forEach((challenge) => {
    const x = shownChallenges.indexOf(challenge);
    shownChallenges.splice(x, 1);
  });
  if (shownChallenges.length == 0) {
    noMatchesText.style.display = 'grid';
  }
  createRooms(shownChallenges);
}
