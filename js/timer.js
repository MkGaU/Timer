/**
 * [...]  
 * @author  Viet Pham
 * @version 1.0, 17/10/27
 * @since   
 */
var timer = {
    _noActionTime: 0, // The time have not action from mouse and keyboard

    _isDetected: false, //Detect any action from mouse and keyboard

    _isWaringSoundAllow : true, //Allow warning sound play

    _isClickCircleDetected: true, //Detect action click on circle

    _currentTime: "",

    _startWorkingTime: new Date(),

    _startBreakingTime: "12:00", //Default start breaking time

    _endBreakingTime: "13:00", //Default end breaking time    

    // _isBreakingTimeRange : false,

    startTimeChangeCircleColor: function() {
        setInterval(function() {
            timer.changeCircleColor()
        }, 1000);
    },
    changeCircleColor: function() {
        this._noActionTime++;
        timer.eventDetected();        
        var c = document.getElementById("main_circle");
        if (this._noActionTime >= 5) {
            c.setAttribute("fill", "red");
            timer._isClickCircleDetected = false;
            if (!this.checkBreakingTime()) {
                timer.warningSound();
            }
            // files.warningStartLog(this._currentTime);
        } else if (timer._isDetected && !timer._isClickCircleDetected) {
            c.setAttribute("fill", "yellow");
        }
        c.addEventListener("click", function() {
            c.setAttribute("fill", "orange");
            timer._isClickCircleDetected = true;
        });
    },
    eventDetected: function() {
        var h = document.getElementsByTagName("html");
        h[0].addEventListener("click", this.resetTimeChangeCirleColor);
        h[0].addEventListener("mousemove", this.resetTimeChangeCirleColor);
        h[0].addEventListener("keydown", this.resetTimeChangeCirleColor);
    },
    resetTimeChangeCirleColor: function() {
        if (timer._noActionTime) {
            timer._noActionTime = 0;
        }
        timer._isDetected = true;
        timer._isWaringSoundAllow = true;
    },
    warningSound: function() {
        var sound = new Audio("media/BEEP1.wav");
        if(timer._isWaringSoundAllow){
        	sound.play();
        	timer._isWaringSoundAllow = false;
        }
    },
    /*
     * Get current time
     */
    currentTime: function() {
        this._currentTime = new Date();
        var t = this._currentTime.toLocaleTimeString('en-GB');
        document.getElementById("current_time").innerHTML = t;
        timer.elapsedTime();
    },
    getCurrentTime: function() {
        setInterval(function() {
            timer.currentTime()
        }, 1000);
    },

    /*
     * Breaking time
     */
    setBreakTime: function() {
        var sbStartHour = document.getElementById("h_start");
        var sbEndHour = document.getElementById("h_end");
        var sbStartMinute = document.getElementById("m_start");
        var sbEndMinute = document.getElementById("m_end");

        var startHour = sbStartHour.options[sbStartHour.selectedIndex].value;
        var endHour = sbEndHour.options[sbEndHour.selectedIndex].value;
        var startMinute = sbStartMinute.options[sbStartMinute.selectedIndex].value;
        var endMinute = sbEndMinute.options[sbEndMinute.selectedIndex].value;
        if (this._startBreakingTime > this._endBreakingTime) {
            alert("error");
        } else {
            this._startBreakingTime = startHour + ":" + startMinute;
            this._endBreakingTime = endHour + ":" + endMinute;
        }
    },
    /*
     * check current time in breaking time range
     * return true is in above range, false is not in above range
     */
    checkBreakingTime: function() {
        var boolean = false;
        var realTime = this._currentTime.toLocaleTimeString("en-GB");
        boolean = realTime < this._endBreakingTime && realTime > this._startBreakingTime ?
            boolean = true : boolean = false;
        return boolean;
    },
    /*
     * Working time Calculator
     */
    elapsedTime: function() {
        var elapsedTime = timer._currentTime - timer._startWorkingTime;
        // document.getElementById("working_time").innerHTML = this.msToTime(elapsedTime);
        document.getElementById("working_time").innerHTML = (new Date(elapsedTime)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
    },
    /*
     * count numbers of click on app
     */
    clickCounter: function() {
        var countNumber = 0;
        var eventClick = document.getElementById("click_counter");
        var clickArea = document.getElementById("container");
        clickArea.addEventListener("click", function() {
            countNumber++;
            eventClick.innerHTML = ("000" + countNumber).slice(-4);
        });
    },    

    addOptions: function(id, num) {
        for (var i = 0; i <= num; i++) {
            var selectBox = document.getElementById(id);
            var option = document.createElement("option");
            option.text = ("0" + i).slice(-2);
            option.value = ("0" + i).slice(-2);
            if (num === 23) {
                if (id === "h_start" && i === 12) {
                    option.selected = "selected";
                }
                if (id === "h_end" && i === 13) {
                    option.selected = "selected";
                }
            }
            selectBox.add(option);
        }
    },
    msToTime: function(milliSecond) {
        var seconds = parseInt((milliSecond / 1000) % 60),
            minutes = parseInt((milliSecond / (1000 * 60)) % 60),
            hours = parseInt((milliSecond / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds;
    },    
    run: function() {
        timer.addOptions("h_start", 23);
        timer.addOptions("h_end", 23);
        timer.addOptions("m_start", 59);
        timer.addOptions("m_end", 59);
        timer.startTimeChangeCircleColor();
        timer.getCurrentTime();
        timer.clickCounter();        
    }
};
