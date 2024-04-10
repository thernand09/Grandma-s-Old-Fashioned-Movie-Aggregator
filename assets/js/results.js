const backButton = document.getElementById('back-button');

backButton.addEventListener('click', function() {
  window.location.href = '/index.html';
});

function displayLocalStorage () {
    var omdbStoredData = localStorage.getItem('omdbData')
    var omdbStoredObject = JSON.parse(omdbStoredData)

    
}

// For OMDB, we'll want to get title (omdbData.title), year (omdbData.title), ratings (IDMB: (omdbData.ratings[0]),
// RT: (omdbData.ratings[1]), Metacritic: (omdbData.ratings[2])), and maybe runtime? (omdbData.runtime)