// Declaring our back button and making it return to our search page when pressed
const backButton = document.getElementById('back-button');
backButton.addEventListener('click', function() {
  window.location.href = './index.html';
});
// Accessing the search result in local storage and displaying it to the DOM
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
  var streamingServiceNullPrice = watchModeData.filter(item => item.price === null);
  if (streamingServiceNullPrice.length === 0) {
    streamingInfo = `<p class="streamingInfo">No streaming services found</p>`;
  } else {
    streamingServiceNullPrice.forEach(function(item) {
      streamingInfo += `<p class="streamingInfo">${item.name} in ${item.region}</p>`;
    });
  }

  // Fill the card with our data
  card.innerHTML = `
      <div class="poster-container column is-4">
        <img class="poster" src="${omdbStoredObject.Poster}">
      </div>
      <div class="card-info column is-4">
        <h2 class="card-title">${omdbStoredObject.Title}</h2>
        <p class="year">${omdbStoredObject.Year}</p>
        <p class="runtime">Runtime: ${omdbStoredObject.Runtime}</p>
        <div class="ratings">
          <p class="imdbRating">IMDB rating: ${omdbStoredObject.Ratings[0] ? omdbStoredObject.Ratings[0].Value : 'N/A'}</p>
          <p class="rtRating">Rotten Tomatoes: ${omdbStoredObject.Ratings[1] ? omdbStoredObject.Ratings[1].Value : 'N/A'}</p>
          <p class="metacriticRating">Metacritic: ${omdbStoredObject.Ratings[2] ? omdbStoredObject.Ratings[2].Value : 'N/A'}</p>
        </div>
      </div>
      <div class="card-plot column is-4">
        ${streamingInfo}
        <p class="plot">${omdbStoredObject.Plot}</p>
      </div>
  `;

  // Get the searchResults section and append the card to it
  var searchResults = document.getElementById('searchResults');
  searchResults.appendChild(card);
}
// Displaying our local storage on page load
window.onload = function() {
  displayLocalStorage();
};