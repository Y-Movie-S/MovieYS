"use strict";

fetch('https://shell-booming-guanaco.glitch.me/movies').then(response =>{
    response.json().then(movies =>{
        console.log(movies)
    });
});