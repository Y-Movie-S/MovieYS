function querySpaces(term){
    return term.split(" ").join("%20")
}
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



$('#button').click(function() {
    let term = querySpaces(searchTerm.value)
    let keyWord = `&language=en-US&query=${term}&page=1&include_adult=false`
    search(url, keyWord)
});
