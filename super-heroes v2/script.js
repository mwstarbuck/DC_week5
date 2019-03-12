let getMovieBtn = document.getElementById('getMovieBtn')
let moviesUL = document.getElementById('moviesUL')
let movieInput = document.getElementById('movieInput')
let detailsDiv = document.getElementById('detailsDiv')
const placeHolderImage = `<img class="smallPoster" src="images/film-strip.jpg">`
let request = new XMLHttpRequest()

// Event listener takes text input and sends a get request to OMDb API
getMovieBtn.addEventListener('click', function () {
    let movieInput = document.getElementById('movieInput').value
    let series = document.getElementById('series')
    series.innerHTML = movieInput

    let moviesURL = "http://www.omdbapi.com/?s=" + movieInput + "&apikey=1f0fd775"
    detailsDiv.style.visibility = 'hidden'
    request.open("GET", moviesURL)
    request.send()
    let movies = []
    console.log("Request Received")
    console.log(request.responseText)
    request.onload = function () {
        if (request.status != 200) {
            console.log("Server not found.")
        } else {
            console.table(JSON.parse(request.responseText))
            movies = JSON.parse(request.responseText)
            let moviesDisplay = movies.Search.map((movie) => {
                let imageToUse = movie.Poster == "N/A" ? placeHolderImage : `<img class="smallPoster" src="${movie.Poster}">`
                return `<li class="movieLI">
                        <div class="liItemBox">
                            <div class="smlPosterBox">
                                ${imageToUse}
                                <p id="${movie.imdbID}">${movie.Title}</p>
                            </div>
                            
                        </div>
                    </li>`
            })
            moviesUL.innerHTML = moviesDisplay.join('')
        }
    }
})
let movieBox = document.getElementById('movieBox')
let dTitle = document.getElementById('dTitle')
let dPoster = document.getElementById('dPoster')
let dYear = document.getElementById('dYear')
let dRating = document.getElementById('dRating')
let dRelease = document.getElementById('dRelease')
let dDirector = document.getElementById('dDirector')

moviesUL.addEventListener('click', getMovieDetails)
function getMovieDetails(e) {
    let movieID;
    if (e.target.className == "smallPoster") {
        movieID = e.target.nextElementSibling.id
    } else if (e.target.className == "smlPosterBox") {
        movieID = e.target.lastElementChild.id
    } else if (e.target.className == "movieLI") {
        movieID = e.target.lastElementChild.firstElementChild.lastElementChild.id
    }
    else {
        movieID = e.target.id
    }
    makeDetails(movieID)
}




function makeDetails(movieID) {
    let detailURL = "http://www.omdbapi.com/?i=" + movieID + "&apikey=1f0fd775"
    let detailsRequest = new XMLHttpRequest()
    detailsRequest.open("GET", detailURL)
    detailsRequest.send()
    detailsRequest.onload = function () {
        if (request.status != 200) {
            console.log("Server not found.")
        } else {
            console.log("request sent")
            let detailObj = JSON.parse(detailsRequest.responseText)
            dTitle.innerHTML = `${detailObj.Title}`
            dPoster.src = `${detailObj.Poster}`
            dYear.innerHTML = `Year: ${detailObj.Year}`
            dRating.innerHTML = `Rated: ${detailObj.Rated}`
            dRelease.innerHTML = `Released: ${detailObj.Released}`
            dDirector.innerHTML = `Director: ${detailObj.Director}`
            detailsDiv.style.visibility = 'visible'

        }
    }
}