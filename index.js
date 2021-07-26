"use strict";
$(document).ready(function() {
    const serverUrl = "https://shell-booming-guanaco.glitch.me/movies";
    const glitch = fetch(serverUrl).then(movies => movies.json())

    fetch(serverUrl).then(response => {
        response.json().then(movies => {
            console.log(movies)
            movies.map(function (movie, i){
                $('#card-1').append(
                `<div className="card" style="width: 18rem;">
                    <img className="card-img-top" src="${movie.poster}" alt="Card image cap" style="height: 250px; width: auto">
                        <div className="card-body">
                            <h5 className="card-title" data-value="${movie.id}" data-input-type="title">${movie.title}</h5>
                            <p className="card-text" data-value="${movie.id}" data-input-type="plot">${movie.plot}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item" data-value="${movie.id}" data-input-type="year">${movie.year}</li>
                            <li className="list-group-item" data-value="${movie.id}" data-input-type="genre">${movie.genre}</li>
                            <li className="list-group-item" data-value="${movie.id}" data-input-type="actors">${movie.actors}</li>
                            <li className="list-group-item" data-value="${movie.id}" data-input-type="director">${movie.director}</li>

                        </ul>
                        
                </div>`)
            })
        });
    });

    function Ajax(url, method = "GET", data) {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        return fetch(url, options)
            .then(res => res.json())
            .then(responseData => responseData)
            .catch(err => err)
    }

    Ajax(serverUrl + "/id", "PATCH", {director: "HI"})
        .then(function (data) {
            console.log(data)
        })
    // turns the input into url compatible terms
    function querySpaces(term){
        return term.split(" ").join("%20")
    }
// function that searches and logs the results of the search
    function search(url, query) {
        fetch(url + query, {
            "method": "GET",

        })
            .then(res => res.json())
            .then(responseData => console.log(responseData))
            .catch(err => {
                console.error(err);
            });
    }
    let searchTerm = document.getElementById('search')
    let url = `https://api.themoviedb.org/3/search/multi?api_key=73b5e9519e62e792b9bae13f682f8a54`


// searches when the button is clicked
    $('#button').click(function() {
        let term = querySpaces(searchTerm.value)
        let keyWord = `&language=en-US&query=${term}&page=1&include_adult=false`
        search(url, keyWord)
        // window.location.reload();

    });

})

