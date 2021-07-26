"use strict";
const serverUrl = "https://shell-booming-guanaco.glitch.me/movies";

fetch('https://shell-booming-guanaco.glitch.me/movies').then(response =>{
    response.json().then(movies =>{
        console.log(movies)
    });
});

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

    Ajax(serverUrl, method = "POST", {title: " we built an ajax function"})
.then(function(data){
    console.log(data)
})

