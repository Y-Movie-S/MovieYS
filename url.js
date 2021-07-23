const serverUrl = "https://shell-booming-guanaco.glitch.me/movies";

// fetch(serverUrl)
// .then(res => res.json())
// .then(data => console.log(data))

const objectToSend = {
    user: "Youssef/Seth",
    message: "Enjoyed the movie project"
};

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(objectToSend),
};
fetch(serverUrl, options)
    .then( response => console.log(response) ) /* review was created successfully */
    .catch( error => console.error(error) ); /* handle errors */

function Ajax(url,method = "GET", data) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    return fetch(url)
        .then(res => res.json())
        .then(responseData => responseData)
        .catch(err => err)
}
//     Ajax(serverUrl, method = "POST", {title: " we built an ajax function"})
// .then(function(data){
//     console.log(data)
// })
//this is to fetch a single movie
// Ajax(serverUrl + "/3" )
// .then(data => console.log(data))

Ajax(serverUrl + "/9", method ="PUT", {
    name: "Polaris",
        message: "weekend"
})
.then(data => console.log(data))