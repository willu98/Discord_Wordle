const fs = require('fs');
//NOTE COME BACK AND CHANGE THE NAMES, TOO CONFUSING

//loading all valid words that the user can type
let allowedText = fs.readFileSync(__dirname + "/allowed_words.txt", 'utf-8').replace(/(\r\n|\n|\r)/gm, " ");
let allowedWords = allowedText.split(' ');

//loading all correct possible words
let possibleText = fs.readFileSync(__dirname + '/possible_words.txt', 'utf-8').replace(/(\r\n|\n|\r)/gm, " ");
let possibleWords = possibleText.split(' ');

//console.log('test');
module.exports = {
    //possible words that can be correctly guessed
    possibleWords:new Set(possibleWords),

    //valid words that the user can guess, superset of possibleWords
    allowedWords:new Set(allowedWords),

    getRandomWord:set => [...set][Math.floor(Math.random()*set.size)]
};