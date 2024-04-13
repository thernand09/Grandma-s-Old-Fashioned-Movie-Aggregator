const OMDB_API_KEY = 'a8e2098d'

var omdbDataHistory = JSON.parse(localStorage.getItem('omdbDataHistory')) || [];

const modalButtonSubmit = document.getElementById('modal-submit');

modalButtonSubmit.addEventListener('click', function() {
  console.log('Modal submit button pressed')

  const movieTitleInput = document.getElementById('movie-title').value.trim();
  const movieYearInput = document.getElementById('movie-year').value.trim();

  fetchOmdb(movieTitleInput, movieYearInput);
  //window.location.href = '/results.html';
});

// - Modal form script
document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }
  
  function closeModal($el) {
    $el.classList.remove('is-active');
  }
  
  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }
  
  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);
  
    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });
  
  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close') || []).forEach(($close) => {
    const $target = $close.closest('.modal');
  
    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });
  
  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    if(event.key === "Escape") {
      closeAllModals();
    }
  });
});

// --------------------------- API Fetch Functions ---------------------------------

// - OMDB-API
// We'll want to get title (omdbData.title), year (omdbData.title), ratings (IDMB: (omdbData.ratings[0]),
// RT: (omdbData.ratings[1]), Metacritic: (omdbData.ratings[2])), and maybe runtime? (omdbData.runtime)
function fetchOmdb (movieTitleInput, movieYearInput) {
  let omdbUrl
  if (movieYearInput) {
    omdbUrl = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${movieTitleInput}&y=${movieYearInput}`
  } else {
    omdbUrl = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${movieTitleInput}`
  }

  fetch(omdbUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('OMDB - Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('OMDB data:', data);
      // Process the retrieved data
      if (data.length === 0) {
        const sectionOne = document.getElementById('section1');
        const errorMessage = document.createElement('p');
        errorMessage.textContent = "No media found. Please try a new search.";
        sectionOne.appendChild(errorMessage);

        return
      } else {
        omdbDataHistory.unshift(data)

        if (omdbDataHistory.length > 4) {
          omdbDataHistory = searchHistory.slice(0, 4);
        }
        var omdbData = JSON.stringify(data)
        localStorage.setItem('omdbData', omdbData)

        localStorage.setItem('omdbDataHistory', JSON.stringify(omdbDataHistory))
      }
    })
    .catch(error => {
      console.error('There was a problem with the OMDB fetch operation:', error);
    });
}

// - WatchOne -------------- Wanted to stop making requests in case we use our limit - Aidan
//fetch('https://api.watchmode.com/v1/title/345534/sources/?apiKey=Slfk8QtE1xiIN5s4RlZbV6RhrQNnJRjCt1W5sdqe')
//  .then(response => {
//    if (!response.ok) {
//////throw new Error('WatchOne - Network response was not ok');
////}
////return response.json();
//})
//.then(data => {
////console.log('WatchOne data:', data);
////// Process the retrieved data
//})
//.catch(error => {
////console.error('There was a problem with the WatchOne fetch operation:', error);
//});

// ------------------------- Displaying Past Search Data for Flavor -------------------------------------
function displayPreviousSearches() {
  var previousSearchesContainer = document.getElementById('previous-results');

  previousSearchesContainer.innerHTML = '';

  omdbDataHistory.forEach(function(omdbData, index) {
    var poster = omdbData.Poster;
    var title = omdbData.Title;

    var searchResultContainer = document.createElement('div')
    var searchResultId = 'searchResult_' + index;
    searchResultContainer.id = searchResultId
    searchResultContainer.classList.add('searchResult')
    searchResultContainer.classList.add('column')

    var posterContainer = document.createElement('div')
    posterContainer.classList.add('posterContainer')
    var posterImg = document.createElement('img');
    posterImg.src = poster;
    posterImg.alt = `${title} poster`;
    posterImg.classList.add('poster');
    var titleHTML = document.createElement('p');
    titleHTML.textContent = title;
    titleHTML.classList.add('searchTitle');

    posterContainer.appendChild(posterImg);
    searchResultContainer.appendChild(titleHTML);
    searchResultContainer.appendChild(posterContainer);
    previousSearchesContainer.appendChild(searchResultContainer);
  });
};

window.onload = function() {
  displayPreviousSearches();
}
