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
});
