//OMDB-API
fetch('http://www.omdbapi.com/?i=tt3896198&apikey=a8e2098d')
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