// API keys
const OMDB_API_KEY = 'a8e2098d'
const WATCHMODE_API_KEY = 'caEFcIyKcBFdoNxQ4vxGkJvUThmebfFdWVrFZqhF'

// Accessing the local storage and creating an empty array if none is found
var omdbDataHistory = JSON.parse(localStorage.getItem('omdbDataHistory')) || [];

// - Modal form script from jQuery
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

// - OMDB-API -------------------------------------------------------------
// Passing the input data to the function
function fetchOmdb (movieTitleInput, movieYearInput, callbackWatchMode) {
  // Declaring our API URL with title and year or just title
  let omdbUrl
  if (movieYearInput) {
    omdbUrl = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${movieTitleInput}&y=${movieYearInput}`
  } else {
    omdbUrl = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${movieTitleInput}`
  }
  // Fetching the data from the API
  fetch(omdbUrl)
    // Then if we don't receive a response, we create an error message
    .then(response => {
      if (!response.ok) {
        throw new Error('OMDB - Network response was not ok');
      }
      // If we do receive a response, we turn it into a JS object
      return response.json();
    })
    // Then we take the data
    .then(data => {
      // And if it doesn't have data
      if (data.Response === "True") {
        // If we get valid poster data
        if (data.Poster !== "N/A") {
          // We place the new search data at the front of our history array
          omdbDataHistory.unshift(data)
          // If our data array is now longer than four entries, we only keep the most recent four
          if (omdbDataHistory.length > 4) {
            omdbDataHistory = omdbDataHistory.slice(0, 4);
          }
          // We store the single most recent data to local storage for our results page
          var omdbData = JSON.stringify(data)
          localStorage.setItem('omdbData', omdbData)
          // And also set our four most recent data to our local storage for our search page
          localStorage.setItem('omdbDataHistory', JSON.stringify(omdbDataHistory))
        }
        // pass the data to our WatchMode API
        callbackWatchMode(data);
      } else {
        // We display an error message to the console
        console.log("No media found. Please try a new search.")
        window.alert("No media found. Please try a new search.")
      }
    })
    // Return error message to the console from the throw function above
    .catch(error => {
      console.error('There was a problem with the OMDB fetch operation:', error);
    });
}

// Adding an event listener to our modal button and fetching API data using the inputs from the
// modal form
const modalButtonSubmit = document.getElementById('modal-submit');

modalButtonSubmit.addEventListener('click', function() {
  const movieTitleInput = document.getElementById('movie-title').value.trim();
  const movieYearInput = document.getElementById('movie-year').value.trim();
  // Passing the input data to the OMDB function and the IMDB ID from the OMDB fetch to the WatchMode
  // fetch function
  fetchOmdb(movieTitleInput, movieYearInput, function(omdbData) {
    const imdbID = omdbData.imdbID;
    fetchWatchMode(imdbID);
  });
});

// - WatchMode API Fetch Function ---------------------------------------------
function fetchWatchMode(imdbID) {
  // Using the IMDB ID from our OMDB result so that it will always fetch for the same title
  const watchModeUrl = `https://api.watchmode.com/v1/title/${imdbID}/sources/?apiKey=${WATCHMODE_API_KEY}`;
  // Fetching data and either saving to local storage and relocating to the results page or returning an error
  fetch(watchModeUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('WatchMode - Network response was not OK');
      }
      return response.json();
    })
    .then(data => {
      localStorage.removeItem('watchModeData');
      localStorage.setItem('watchModeData', JSON.stringify(data));
      window.location.href = '/results.html'; 
    })
    .catch(error => {
      console.error('There was a problem with the WatchMode fetch operation:', error);
      window.alert('There was a problem with the WatchMode fetch operation. Please try another search or ensure that you are within the search quota.');
    });
}

// ------------------------- Displaying Past Search Data for Flavor -------------------------------------
function displayPreviousSearches() {
  // Declaring where to append our results in the HTML
  var previousSearchesContainer = document.getElementById('previous-results');
  // Clearing the previous results section
  previousSearchesContainer.innerHTML = '';
  // For each entry within our four most recent search results,
  omdbDataHistory.forEach(function(omdbData, index) {
    // Declaring the poster and title variables
    var poster = omdbData.Poster;
    var title = omdbData.Title;
    // Declaring our HTML elements
    var searchResultContainer = document.createElement('div')
    var searchResultId = 'searchResult_' + index;
    // Giving each search result entry its own ID to display fewer entries on smaller windows while
    // favoring the most recent search results
    searchResultContainer.id = searchResultId
    searchResultContainer.classList.add('searchResult')
    searchResultContainer.classList.add('column')
    // Setting up our poster and title elements to display in our HTML
    var posterContainer = document.createElement('div')
    posterContainer.classList.add('posterContainer')
    var posterImg = document.createElement('img');
    posterImg.src = poster;
    posterImg.alt = `${title} poster`;
    posterImg.classList.add('poster');
    var titleHTML = document.createElement('p');
    titleHTML.textContent = title;
    titleHTML.classList.add('searchTitle');
    // Appending the data to the DOM
    posterContainer.appendChild(posterImg);
    searchResultContainer.appendChild(titleHTML);
    searchResultContainer.appendChild(posterContainer);
    previousSearchesContainer.appendChild(searchResultContainer);
  });
};
// Function that displays a message asking the user to make a search when we detect that there
// is no local storage data (no previous searches have been made)
function displaySearchMessage() {
  // We check if there is no local storage data
  if (omdbDataHistory.length === 0) {
    // Then create the message elements and append it to the page
    var messageHTML = document.createElement('div');
    messageHTML.textContent = 'Please make a search using the search button';
    messageHTML.classList.add('search-message');
    const previousResults = document.getElementById('previous-results');
    previousResults.appendChild(messageHTML);
  }
}

// On load we call our function to display our previous searches or our message if no searches are found
window.onload = function() {
  displayPreviousSearches();
  displaySearchMessage();
}
