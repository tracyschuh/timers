// WINDOW.ONLOAD FUNCTIONS
window.onload = function() {
    document.getElementById("stopwatch").onclick = function(evt) {
        displayStopwatch();
    } //displayStopwatch onclick event

    document.getElementById("countdown").onclick = function(evt) {
        displayTimeInput();
    } //displayTimeInput onclick event

    document.getElementById("submitButton").onclick = function(evt) {
        validate();
    } //validate onclick event

    document.getElementById("startWatch").onclick = function(evt) {
        startStopwatch();
    } //startStopwatch onclick event

    document.getElementById("startCount").onclick = function(evt) {
        startCountdown();
    } //startCountdown onclick event

    document.getElementById("stopWatch").onclick = function(evt) {
        stopStopwatch();
    } //stopStopwatch onclick event

    document.getElementById("on_offCount").onclick = function(evt) {
        pause_resumeCountdown();
    } //pause_resumeCountdown timer onclick event

    document.getElementById("resetButton").onclick = function(evt) {
        resetWatch();
    } //resetWatch onclick event
    document.getElementById("stopMusic").onclick = function(evt) {
        pauseMusic();
    }

} //end window.onload

//GLOBAL VARIABLES AND CONSTANTS
var min = 0; //stopwatch var
var sec = 0; //stopwatch var
var mil = 0; //stopwatch var
var mm; //countdown var
var ss; //countdown var
var ms; //countdown var
var timer_on = 0; //false; timer not on to start
var watch; //stopwatch var to use in SetTimeout and ClearTimeout
var count; //countdown var to use in setInterval and clearInterval 
const music = new Audio('chime.wav'); //to play at end of countdown timer

// STOPWATCH TIMER FUNCTIONS
function displayStopwatch() { // if user selects stopwatch option, display appropriate info and buttons
    //if either timer currently running, stop it
    stopStopwatch(); 
    clearInterval(count);
    //if countdown used before stopwatch, clear countdown display
    document.getElementById("userMin").value = ""; 
    document.getElementById("userSec").value = "";
    document.getElementById("userMilSec").value = "";
    document.getElementById("validateMessage").innerHTML = "";
    document.getElementById("timerTitle").innerHTML = ""; 
    document.getElementById("timerInfo").innerHTML = "";
    document.getElementById("timerDisplay").innerHTML = "00:00:00"; 
    document.getElementById("startCount").style.display = 'none';
    document.getElementById("on_offCount").style.display = 'none';
    document.getElementById("timeInput").style.display = 'none';
    document.getElementById("small_row").style.display = 'none';
    document.getElementById("submitButton").style.display = 'none';
    document.getElementById("doneMessage").style.display = 'none';
    timer_on = 0;
    
    //display stopwatch title, info and buttons
    document.getElementById("timerTitle").innerHTML = "Stopwatch"; 
    document.getElementById("timerInfo").innerHTML = "Press start button to begin timer. You can stop or reset the timer if needed.";
    document.getElementById("startWatch").style.display = 'inline';
    document.getElementById("stopWatch").style.display = 'inline';
    document.getElementById("resetButton").style.display = 'inline';
    
} //end displayStopwatch()

function startStopwatch() { //starts stopwatch
    if (timer_on == 0) {
        timer_on = 1;
        stopwatch(); //calls another function to run stopwatch
    }
} // end startStopwatch()

function stopwatch() { //runs stopwatch
    if (timer_on == 1) {
        min = parseInt(min);
        sec = parseInt(sec);
        mil = parseInt(mil);
            
        mil = mil + 1;
        if (mil == 60) {
            sec = sec + 1;
            mil = 0;
        }
        if (sec == 60) {
            min = min + 1;
            sec = 0;
        }
        if (mil < 10 || mil == 0) {
            mil = "0" + mil;
        }
        if (sec < 10 || sec == 0) {
            sec = "0" + sec;
        }
        if (min < 10 || min == 0) {
            min = "0" + min;
        }
        document.getElementById('timerDisplay').innerHTML= min + ":" + sec + ":" + mil;
        watch = setTimeout(stopwatch, 15);
    }
} // end stopwatch()

// Stop and Reset Buttons
function stopStopwatch() { //stops stopwatch
    clearInterval(watch);
    timer_on = 0;
} // end stopStopwatch()

function resetWatch() { //reset stopwatch; note: if still running, resets to zero but keeps running. if stop pressed first, resets to zero and stays stopped
    mil = 0;
    sec = 0;
    min = 0;
    document.getElementById('timerDisplay').innerHTML= "00:00:00";
} // end resetWatch()
    
// COUNTDOWN TIMER FUNCTIONS
function displayTimeInput() { //if user selects countdown timer option, show user input area and submit button
    //if countdown used already, clear it
    clearInterval(count); 
    document.getElementById("validateMessage").innerHTML = "";
    document.getElementById("doneMessage").style.display = 'none';
    //if either timer currently running, stop it
    timer_on = 0; 
    //if stopwatch used before countdown button hit, clear stopwatch display
    document.getElementById("timerTitle").innerHTML = ""; 
    document.getElementById("timerInfo").innerHTML = "";
    document.getElementById("timerDisplay").innerHTML = "00:00:00"; 
    document.getElementById("startWatch").style.display = 'none';
    document.getElementById("stopWatch").style.display = 'none';
    document.getElementById("resetButton").style.display = 'none';
            
    // display user input and submit button
    document.getElementById("timeInput").style.display = 'table-row';
    document.getElementById("small_row").style.display = 'table-row';
    document.getElementById("submitButton").style.display = 'table-cell';
} // end displayTimeInput()

function validate() { // onclick of submit button, validate user input
    //if countdown used already, clear interval
    clearInterval(count);
    timer_on = 0; 
    //hide submit button after submit button clicked
    document.getElementById("submitButton").style.display = 'none';
    document.getElementById("small_row").style.display = 'none';
    // grab user input
    var minute = document.getElementById("userMin").value; 
    var second = document.getElementById("userSec").value;
    var milli = document.getElementById("userMilSec").value;

    // regex per user input field
    var regexMin = /^[0-5][0-9]|(60)$/;
    var regexSec = /^[0-5][0-9]$/;
    var regexMil = /^[0-5][0-9]$/; 

    if (!regexMin.test(minute) || !regexSec.test(second) || !regexMil.test(milli)) { //regex doesn't match = invalid input
        document.getElementById("validateMessage").innerHTML = "<img src=\"./images/redx.png\">&nbsp;Timer number must be in xx:xx:xx format and is limited to a 60:00:00 min max";
        //call function to enable submit button for next attempt and clear invalid input values
        clearCountdownInput();
    } else if ((parseInt(minute) == 60) && ((parseInt(second) > 0) || (parseInt(milli) > 0))) { //test to check for 60:00:00 min max
        document.getElementById("validateMessage").innerHTML = "<img src=\"./images/redx.png\">&nbsp;Timer is limited to a 60:00:00 max";
       //call function to enable submit button for next attempt and clear invalid input values
        clearCountdownInput();
    } else  { //input validates so display user time on timer, show buttons and info
        document.getElementById("validateMessage").innerHTML = "<img src=\"./images/greencheck.png\">&nbsp;Your timer is ready!";
        document.getElementById("timerTitle").innerHTML = "Countdown Timer"; 
        document.getElementById("timerInfo").innerHTML = "Press start button to begin timer. You can pause/resume the timer if needed.";
        document.getElementById("timerDisplay").innerHTML = minute + ":" + second + ":" + milli; 
        document.getElementById("startCount").style.display = 'inline'; //start button
        document.getElementById("on_offCount").style.display = 'inline'; //pause/resume button
    } 
} //end function validate()

function clearCountdownInput() { //when user input is invalid, enable submit button for next attempt and clear invalid input values
    document.getElementById("submitButton").style.display = 'inline'; 
    document.getElementById("userMin").value = ""; 
    document.getElementById("userSec").value = "";
    document.getElementById("userMilSec").value = "";
} //end function clearCountdownInput()

function startCountdown() {
    //if countdown used already, clear interval
    clearInterval(count); 
    //hide time input field while timer is running
    document.getElementById("timeInput").style.display = 'none';
    if (!timer_on) {
        timer_on = 1;
        document.getElementById("startCount").style.display = 'none'; //hide start button once pressed
        document.getElementById("validateMessage").innerHTML = ""; //hide validation message
        countdown(); //call another function to run the countdown timer
    }
} // end startCountdown()

function countdown() { //runs countdown timer
    if (timer_on = 1) {
        mm = document.getElementById("userMin").value; 
        ss = document.getElementById("userSec").value;
        ms = document.getElementById("userMilSec").value;
       
        count = setInterval(function() {
            if (ms > 0 && ms < 60) {
                ms--;
                if (ms < 10) 
                ms = "0" + ms;
                } else if (ss > 0 && ss < 60) {
                    ss = ss - 1;
                    ms = 59;
                    ms--;
                    if (ss < 10)
                        ss = "0" + ss;
                } else if (mm > 0) {
                    mm = mm - 1;
                    ms = 59;
                    ss = 60;
                    ss--;
                    if (mm < 10)
                        mm = "0" + mm;
            } else {
                clearInterval(count);
                music.play();
                music.loop = true;
                document.getElementById("stopMusic").style.display = 'inline';
                timer_on = 0;
                document.getElementById("doneMessage").style.display = 'inline';
                document.getElementById("on_offCount").style.display = 'none'; //pause/resume button
            } 
        document.getElementById("timerDisplay").innerHTML = mm + ":" + ss + ":" + ms;
        }, 15);
    } 
} // end countdown()

function pause_resumeCountdown() { //one button that toggles back and forth between on/off
    if (timer_on) {
        if (count) { //pause
            clearInterval(count);
            count = null;
        } else if (!count) { //resume; get current time and assign values to mm, ss, ms so timer restarts at same place
            document.getElementById("userMin").value = mm; 
            document.getElementById("userSec").value = ss;
            document.getElementById("userMilSec").value = ms;
            countdown();
        }
    } else {
        clearInterval(count); //if timer is off, clear so it doesn't interfere with another timer
    }
} // end pause_resumeCountdown()

function pauseMusic () {
    music.pause();
    document.getElementById("stopMusic").style.display = 'none';
    document.getElementById("doneMessage").style.display = 'none';
}
