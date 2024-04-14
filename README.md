# Grandma's Old-Fashioned Movie Aggregator

## Using Server-side and Third Party API's to Search and Display Movie and Television Information

Created by: [thernand09](https://github.com/thernand09), [ambergandar](https://github.com/ambergandar), and [aaguimond](https://github.com/aaguimond)

### Table of Contents

[Project Status](#project-status)

[Screenshots of the completed application](#screenshots-of-completed-site-build)

[Purpose](#purpose)

[Technologies Used](#technologies-used)

[HTML Elements](#html-elements)

[CSS Elements](#css-elements)

[Javascript](#javascript)

[License](#license)

[Acknowledgements](#acknowledgements)

## Project Status

**Complete**

[Git Hub Repository](https://github.com/thernand09/Project-1)

[Live Task Board Page](https://thernand09.github.io/Project-1/)

## Screenshot of Completed Site Build

A screenshot of the search/landing page with no prior searches made
![a screenshot of the search/landing page with no prior searches made](./assets/screenshots/GOFMASearchPageEmpty.png?raw=true)

A screenshot of the search/landing page with no prior searches made in smaller window sizes
![a screenshot of the search/landing page with no prior searches made in smaller window sizes](./assets/screenshots/GOFMASearchPageEmptySmall.png?raw=true)

A screenshot of the search page with the modal search form present
![a screenshot of the search page with the modal search form present](./assets/screenshots/GOFMAModal.png?raw=true)

A screenshot of the results page
![a screenshot of the results page](./assets/screenshots/GOFMAResults.png?raw=true)

A screenshot of the results page at smaller window sizes
![a screenshot of the results page at smaller window sizes](./assets/screenshots/GOFMAResultsMedium.png?raw=true)

A screenshot of the results page at much smaller window sizes
![a screenshot of the results page at much smaller window sizes](./assets/screenshots/GOFMAResultsSmall.png?raw=true)

A screenshot of the search/landing page with one prior search made
![a screenshot of the search/landing page with one prior search made](./assets/screenshots/GOFMASearchPageHistoryOne.png?raw=true)

A screenshot of the search/landing page with four prior searches made
![a screenshot of the search/landing page with four prior searches made](./assets/screenshots/GOFMASearchPageHistoryFull.png?raw=true)

A screenshot of the search/landing page with four prior searches made but only displaying the most recent three due to page window size
![a screenshot of the search/landing page with four prior searches made in smaller window sizes](./assets/screenshots/GOFMASearchPageHistoryMedium.png?raw=true)

A screenshot of the search/landing page with four prior searches made but only displaying the most recent one due to page window size
![a screenshot of the search/landing page with four prior searches made in much smaller window sizes](./assets/screenshots/GOFMASearchPageHistorySmall.png?raw=true)

## Purpose

This project's purpose was for us to create a self-guided project that integrated server-side API's, third party APIs, CSS framework, and Javascript into a functional web application that would be viable as a business product.

## Technologies Used

This project was completed using [Git Bash](https://git-scm.com/about), [Visual Studio Code](https://code.visualstudio.com/) (with the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)), [Google Chrome](https://www.google.com/chrome/), [Git Hub](https://github.com/), [OMDB API](https://www.omdbapi.com/), [WatchMode API](https://api.watchmode.com/), [Bulma CSS](https://bulma.io/), and [jQuery](https://jquery.com/).

## HTML Elements



## CSS Elements

The application utilizes the Bulma CSS framework to aid in page formatting. It also uses custom CSS to match Grandma's taste of colors. There are also custom illustrations used in the page header for flavor.

There are multiple media queries that dynamically rearrange the site's elements to make the most efficient use of the available window space. Examples can be found in [the screenshots section above](#screenshot-of-completed-site-build)

## Javascript

The page uses quite a bit of Javascript logic. Among the functions are:

* Fetching data from the OMDB and WatchMode API's for the titles that the user searches
* Saving search data to local storage
* Accessing the search data in local storage, displaying the most recent result to the results page, and displaying a selection of the most recent results (depending on the user's window size) to the search page for flavor
    * Displaying a message directing the user to make a search when no local storage data is sensed
* A back button on the results page that directs to the search page in case a user would like to make another search

Extensive and detailed comments are present in each Javascript file for further clarification

## License

[MIT](https://opensource.org/license/mit)

## Acknowledgements

* Thank you to our teachers and my classmates for guiding us on our educational journeys
* Thank you to [incredimike](https://gist.github.com/incredimike/1469814) for their country code list