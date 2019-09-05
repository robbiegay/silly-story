
let customName = document.getElementById('customname');
let randomize = document.querySelector('.randomize');
let story = document.querySelector('.story');

// Creates a random value for use in selecting an X, Y, Z array string

function randomValueFromArray(array){
  return array[Math.floor(Math.random()*array.length)];
}

// Story text and Arrays

let storyText = 'It was 94° fahrenheit outside, so :insertx: went for a walk. \
When they got to :inserty:, they stared in horror for a few moments, then \
:insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs \
300 pounds, and it was a hot day.';

let insertX = ['Willy the Goblin', 'Big Daddy', 'Father Christmas'];
let insertY = ['the soup kitchen', 'Disneyland', 'the White House'];
let insertZ = ['spontaneously combusted', 'melted into a puddle on the sidewalk', 
    'turned into a slug and crawled away'];

// Links the clicking of button to the result() function

randomize.addEventListener('click', result);

// Places the storyText into newStory so that we can edit it

let newStory = storyText;

// Call the result() function when button is pressed

function result() {

  // Allows you to insert a custom name
  if(customName.value !== '') {
    let name = customName.value;
    // Make name Title Case
    let firstLetter = name[0];
    firstLetter = firstLetter.toUpperCase();
    let restOfName = name.slice(1);
    name = firstLetter + restOfName;
    // Insert name into story
    newStory = newStory.replace('Bob', name);

  }

  // Convert to different units of measurement

  if(document.getElementById("uk").checked) {
    let weight = Math.round(300/14) + ' stone';
    let temperature =  Math.round((94 - 32) * (5 / 9)) + '° centigrade';
    newStory = newStory.replace('300 pounds', weight);
    newStory = newStory.replace('94° fahrenheit', temperature);
    }

  if(document.getElementById("am").checked) {
    let weight = Math.round((300*453.592) / 8.4); // Convert pounds to grams = lbs * 453.592 --> g to shekel = g / 8.4
    // if (weight.length >= 4) { // If shekel is longer than 3 digits, I want to add a comma
    // For some reason my code doesn't work with the 'for loop'
        let myString = weight.toString(); // In order to slice my number, it has to be turned into a string
        let hundreds = myString.slice(myString.length-3,myString.length); // Slices the hundreds (last 3 numbers)
        let thous = myString.slice(0, myString.length-3); // Slices the Thousands and up (4th digit and higher)
        weight = thous + ',' + hundreds + ' shekel'; // Concatenates the two, placing a comma inbetween and adding shekel to the end
    //}
    newStory = newStory.replace('300 pounds', weight);
    newStory = newStory.replace('94° fahrenheit', 'really hot');
    }
  
  // Inserts a random string from each array into the :text: sections
 
  let xItem = randomValueFromArray(insertX);
  let yItem = randomValueFromArray(insertY);
  let zItem = randomValueFromArray(insertZ);
  
  newStory = newStory.replace(':insertx:', xItem);
  newStory = newStory.replace(':insertx:', xItem);
  newStory = newStory.replace(':inserty:', yItem);
  newStory = newStory.replace(':insertz:', zItem);

  // Typewriter Effect

  typeWriterTarget.textContent = ""; // Empties the Typewriter Effect text everytime button is pressed

  if(document.getElementById("typewriter-on").checked) {
    story.textContent = ""; // Make story empty
    story.style.visibility = 'hidden'; // Hides story
    // Disables the "generate" button while running typewritereffect, otherwise pressing
    // button while effect is still running causes unpleasent results
    document.querySelector(".randomize").disabled = true;
    let i = 0;
    let speed = 5; // Speed of typewriter effect
    
    function typeWriter () {
      //if(typeWriterTarget.textContent !== "") { // Empty the 
      //  typeWriterTarget.textContent = "";
      //}
      typeWriterTarget.style.visibility = 'visible'; // Make the typerwriter <p> visible
      if (i < newStory.length) {
        document.getElementById("typeWriterTarget").innerHTML += newStory.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
        }
      if (i === newStory.length) { // Turns the "generate" button back on when typewriter effect === done
        document.querySelector(".randomize").disabled = false;
      }
    }  
    typeWriter();
  } else {
    typeWriterTarget.textContent = ""; // Makes typeWriterTarget empty
    typeWriterTarget.style.visibility = 'hidden'; // Hides typeWriterTarget
    story.textContent = newStory; // Places our updated story into the <p> with the .story class
    story.style.visibility = 'visible'; // Makes the story visible
  }



  
  newStory = storyText; // Resets the story after button has been pressed.
}