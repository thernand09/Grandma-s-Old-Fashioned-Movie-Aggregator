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
//IMDB
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
  