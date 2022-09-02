const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector(`[name="text"]`).value;
console.log(msg);

function populateVoices() {
    // To get all the voices that are available in the browser 
    voices = this.getVoices();

    // Taking the Voices and Mapping over each and every voice and putting them to Voice Dropdown Bar
    voicesDropdown.innerHTML = voices
        .map(voice => `<option value="${voice.name}">${voice.name} ${voice.lang}</option>`) 
        .join("");
    }

function setVoice() {
    // Passing the voice we select to speechSynthesisUtterance  
    msg.voice = voices.find(voice => voice.name === this.value);
}

function toggle(startOver = true) {
    speechSynthesis.cancel();
    // If you want to stop the voice, just make startOver == false and this will just cancel every Speech
    if(startOver) {
        speechSynthesis.speak(msg);
    }
}

// function to listening for any change in 3 inputs - Rate , Pitch and textArea
function setoption() {
    // this.name will give us name of what is changing like rate , pitch and textArea
    // this.value will get us value of what is changed
    // we are updating the value in the msg ( speechSynthesisUtterance )
    msg[this.name] = this.value;
}

// 
speechSynthesis.addEventListener("voiceschanged", populateVoices);

// listening for the change event in Voice DropDown Bar
voicesDropdown.addEventListener("change", setVoice);

// changing the pitch, rate ( speed of speech ) and textArea
options.forEach(option => option.addEventListener("change",setoption));

// When speakButton is clicked, speech starts
speakButton.addEventListener("click",toggle);

/* when stopButton is clicked, Speech Stop */

// using bind()
stopButton.addEventListener("click", toggle.bind(null, false));

// using arrow Function
// stopButton.addEventListener("click", () => toggle(false));