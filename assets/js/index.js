const OMDB_API_KEY = 'a8e2098d'
const modalButtonSubmit = document.getElementById('modal-submit');

modalButtonSubmit.addEventListener('click', function() {
  console.log('Modal submit button pressed')

  const movieTitleInput = document.getElementById('movie-title').value.trim();
  const movieImdbIdInput = document.getElementById('imdb-id').value.trim();

  fetchOmdb(movieTitleInput, movieImdbIdInput);
  window.location.href = '/results.html';
});

//OMDB-API
function fetchOmdb (movieTitleInput, movieImdbIdInput) {
  let omdbUrl
  let omdbPosterUrl
  if (movieImdbIdInput) {
    const omdbUrl = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movieImdbIdInput}`
    const omdbPosterUrl = `http://img.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movieImdbIdInput}`
  } else {
    const omdbUrl = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${movieTitleInput}`
    const omdbPosterUrl = `http://img.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${movieTitleInput}`
  }

  fetch(omdbUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data:', data);
      // Process the retrieved data
      if (data.length === 0) {
        const sectionOne = document.getElementById('section1');
        const errorMessage = document.createElement('p');
        errorMessage.textContent = "No media found. Please try a new search.";
        sectionOne.appendChild(errorMessage);

        return
      } else {
        var omdbData = JSON.stringify()
      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

//IMDB-OT
fetch('https://search.imdbot.workers.dev/?tt=tt13667402')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Data:', data);
    // Process the retrieved data
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

//WatchOne
fetch('https://api.watchmode.com/v1/title/345534/sources/?apiKey=Slfk8QtE1xiIN5s4RlZbV6RhrQNnJRjCt1W5sdqe')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Data:', data);
    // Process the retrieved data
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

// Modal form script
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
