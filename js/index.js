"use strict";
$(document).ready(function() {
    const serverUrl = "https://shell-booming-guanaco.glitch.me/movies";
    const glitch = fetch(serverUrl).then(movies => movies.json())

    fetch(serverUrl).then(response => {
        response.json().then(movies => {
            console.log(movies)
            movies.map(function (movie, i){
                $('#card-1').append(
                `<div className="card" style="width: 18rem;" id="data-${movie.id}">
                    <img className="card-img-top" src="${movie.poster}" alt="Card image cap" style="height: 250px; width: auto">
                        <div className="card-body">
                            <h5 className="card-title">${movie.title}</h5>
                            <p className="card-text" font-family="cursive">${movie.plot}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">${movie.year}</li>
                            <li className="list-group-item">${movie.score} / 10</li>
                        </ul>
                        <button type="button" class="edit-b" data-value="${movie.id}">edit</button>
                </div>`)
            })
            addEventListeners()
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
    //
    // Ajax(serverUrl, "POST", {director: "HI"})
    //     .then(function (data) {
    //         console.log(data)
    //     })
    // turns the input into url compatible terms
    function querySpaces(term){
        return term.split(" ").join("%20")
    }
// function that searches and logs the results of the search
    function search(url, query) {
        fetch(url + query, {
            "method": "GET"

        })
            .then(res => res.json())
            .then(function(response){
                console.log(response)
                let newYear = response.results[0].release_date;
                let newPlot = response.results[0].overview;
                let newTitle = response.results[0].title;
                let posterPath = response.results[0].poster_path;
                let rating = response.results[0].vote_average;
                Ajax(serverUrl, "POST", {
                    year: newYear,
                    plot: newPlot,
                    title: newTitle,
                    poster: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${posterPath}`,
                    score: rating

                }).then(function (data) {
                    // comment this out if you want to see the object
                    window.location.reload();
                })
                }
            )
            .catch(err => {
                console.error(err);
            });
    }
    let searchTerm = document.getElementById('search')
    let url = `https://api.themoviedb.org/3/search/multi?api_key=73b5e9519e62e792b9bae13f682f8a54`
// loading
// links js to css so we can add functionality to our functions through bootstrap
    var link = document.createElement('link');

    link.rel = 'stylesheet';
    link.type = 'css';
    link.href = './css/style.css';
    document.getElementsByTagName('HEAD')[0].appendChild(link);
// searches when the button is clicked
    $('#button').click(function() {
        let term = querySpaces(searchTerm.value)
        let keyWord = `&language=en-US&query=${term}&page=1&include_adult=false`
        search(url, keyWord)
        // window.location.reload();

    });

function addEventListeners() {
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
    $('.edit-b').click(function () {
        let movieId = $(this).attr("data-value");
        $(`#data-${movieId}`).html("")
            fetch("https://shell-booming-guanaco.glitch.me/movies" + `/${movieId}`).then(response => {
            response.json().then(movie => {
                    $(`#data-${movieId}`).append(
                        `<div className="card" style="width: 18rem;" id="data-${movie.id}">
                    <img className="card-img-top" src="${movie.poster}" alt="Card image cap" style="height: 250px; width: auto">
                        <div className="card-body">
                            <h5 className="card-title"><textarea id="title-edit">${movie.title}</textarea></h5>
                            <p className="card-text"><textarea rows="5" cols="30" id="plot-edit">${movie.plot}</textarea></p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><textarea id="year-edit">${movie.year}</textarea></li>
                            <li className="list-group-item"><textarea id="score-edit">${movie.score}</textarea></li>
                            
                        </ul>
                        <button type="button" class="submit-b" data-value="${movie.id}">submit</button>
                        <button type="button" class="delete-b" data-value="${movieId}">delete</button>
                </div>`)
                $('.submit-b').click(function (){
                    let newYear = $('#year-edit').val()
                    let newPlot = $('#plot-edit').val()
                    let newDirector = $('#director-edit').val()
                    let newScore = $('#score-edit').val()
                    let newGenre = $('#genre-edit').val()
                    let newTitle = $('#title-edit').val()
                    Ajax("https://shell-booming-guanaco.glitch.me/movies" + `/${movieId}`, "PATCH", {
                        year: newYear,
                        plot: newPlot,
                        director: newDirector,
                        score: newScore,
                        title: newTitle
                    }).then(function(){
                        window.location.reload();
                    })

                })
                $('.delete-b').click(function (){
                    Ajax("https://shell-booming-guanaco.glitch.me/movies/" + movieId, "DELETE", {director: "HI"})
                        .then(function (data) {
                            window.location.reload();

                        })
                })
            });
        });
    });

}

//  update / delete / post single movie request
//loading message
//form inputs - name rating description
//event listener for form
// create movie function- add/edit *use prevent default* to avoid page reload


})