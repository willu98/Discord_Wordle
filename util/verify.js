const chars_regular = 'ａ ｂ ｃ ｄ ｅ ｆ ｇ ｈ ｉ ｊ ｋ ｌ ｍ ｎ ｏ ｐ ｑ ｒ ｓ ｔ ｕ ｖ ｗ ｘ ｙ ｚ'.split(' ');
const chars_wrong = '【a】 【b】 【c】 【d】 【e】 【f】 【g】 【h】 【i】 【j】 【k】 【l】 【m】 【n】 【o】 【p】 【q】 【r】 【s】 【t】 【u】 【v】 【w】 【x】 【y】 【z】'.split(' ');
const chars_right = '『a』 『b』 『c』 『d』 『e』 『f』 『g』 『h』 『i』 『j』 『k』 『l』 『m』 『n』 『o』 『p』 『q』 『r』 『s』 『t』 『u』 『v』 『w』 『x』 『y』 『z』'.split(' ');

/**
 * @param {String, users guess} guess 
 * @param {The correct word} word 
 * @param {shallow copy of the word map} wordMap 
 * @param {array of the keys below the board to show users which characters they've used} characters 
 * @returns object holding the resulting string, and the amount of correct characters(in the correct position).
 */
 const verification = (guess, word, wordMap, characters) => {
    guess = guess.toLowerCase();
    const guessChars = [...guess];
    const wordChars = [...word];
    let result = Array(5).fill('');
    let counter = 0;

    //character comparison between word and guess
    //takes care of the situation where the user enters 
    for(let i = 0; i < guessChars.length; i++) {
        if(wordChars[i] === guessChars[i]){
            //accounting for character found
            wordMap.set(guessChars[i], wordMap.get(guessChars[i]) - 1);

            //
            result[i] = chars_right[guessChars[i].charCodeAt(0) - 97];

            //setting all keys on keyboard to '' by default
            characters[guessChars[i].charCodeAt(0) - 97] = result[i];

            counter++;
        }
    }

    for(let i = 0; i < guessChars.length; i++) {

        let char = (result[i] == '') ? chars_regular[guessChars[i].charCodeAt(0) - 97]:result[i];
        
        //setting all keys on keyboard to '' by default
        characters[guessChars[i].charCodeAt(0) - 97] = characters[guessChars[i].charCodeAt(0) - 97]?characters[guessChars[i].charCodeAt(0) - 97]:'';
        
        //If the word matches a character from the guess
        if(wordMap.has(guessChars[i]) && result[i] === ''){

            //accounting for character found
            wordMap.set(guessChars[i], wordMap.get(guessChars[i]) - 1);

            //ensures that character in guess exists in word
            //if the amount of a particular character is below that of the word
            //eg: if guessChars[i] === 'a' checks to see if the number of a's in the guess is less than in the word
            if(wordMap.get(guessChars[i]) >= 0){
                //if the character is in the correct position
                if(guessChars[i] === wordChars[i]){
                    char = chars_right[guessChars[i].charCodeAt(0) - 97];
                    counter++;
                }
                else{
                    char = chars_wrong[guessChars[i].charCodeAt(0) - 97];          
                }
                if(characters[guessChars[i].charCodeAt(0) - 97] !== chars_right[guessChars[i].charCodeAt(0) - 97])
                    characters[guessChars[i].charCodeAt(0) - 97] = char;
            }
        }
        result[i] = char;
    }
    const resultStr = result.join('');
    return {
        resultStr,
        counter
    };
}

module.exports = verification;