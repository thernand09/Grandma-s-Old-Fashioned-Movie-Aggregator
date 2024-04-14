// Declaring our back button and making it return to our search page when pressed
const backButton = document.getElementById('back-button');
backButton.addEventListener('click', function() {
  window.location.href = '/index.html';
});

function displayLocalStorage() {
  var omdbStoredData = localStorage.getItem('omdbData');
  var omdbStoredObject = JSON.parse(omdbStoredData);

  var watchModeStoredData = localStorage.getItem('watchModeData');
  var watchModeData = JSON.parse(watchModeStoredData);

  // Create the cards to display our search result
  var card = document.createElement('div');
  card.classList.add('columns');
  card.classList.add('card');

  var streamingInfo = '';
  watchModeData.forEach(function(item, index) {
    if (item.price === null) {
      if (index !== 0 && streamingInfo !== '') {
        streamingInfo += ', ';
      }
      streamingInfo += `<p class="streamingInfo">${item.name} in ${item.region}</p>`;
    }
  });


  // Fill the card with data
  card.innerHTML = `
      <img class="poster column is-3" src="${omdbStoredObject.Poster}">
      <div class="card-info column is-3">
        <h2 class="card-title">${omdbStoredObject.Title}</h2>
        <p class="year">${omdbStoredObject.Year}</p>
        <p class="runtime">Runtime: ${omdbStoredObject.Runtime}</p>
        <div class="ratings">
          <p class="imdbRating">IMDB rating: ${omdbStoredObject.Ratings[0] ? omdbStoredObject.Ratings[0].Value : 'N/A'}</p>
          <p class="rtRating">Rotten Tomatoes: ${omdbStoredObject.Ratings[1] ? omdbStoredObject.Ratings[1].Value : 'N/A'}</p>
          <p class="metacriticRating">Metacritic: ${omdbStoredObject.Ratings[2] ? omdbStoredObject.Ratings[2].Value : 'N/A'}</p>
        </div>
      </div>
      <div class="streaming column is-2">
        ${streamingInfo}
      </div>
      <div class="card-plot column is-4">
        <p class="plot">${omdbStoredObject.Plot}</p>
      </div>
  `;

  // Get the searchResults section and append the card to it
  var searchResults = document.getElementById('searchResults');
  searchResults.appendChild(card);
}

window.onload = function() {
  displayLocalStorage();
};

// For OMDB, we'll want to get title (omdbData.title), year (omdbData.title), ratings (IDMB: (omdbData.ratings[0]),
// RT: (omdbData.ratings[1]), Metacritic: (omdbData.ratings[2])), and maybe runtime? (omdbData.runtime)